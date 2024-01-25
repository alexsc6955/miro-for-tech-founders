const { OPENAI_API_KEY } = process.env;
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function setupAssistant(name = "canvas") {
  const assistants = {
    canvas: {
      name: "Canvas Assistant",
      instructions: "You are an expert in business model generation. You are talking to a client who wants to start a new business. You are going to help them generate a business model canvas."
    },
    plan: {
      name: "Plan Assistant",
      instructions: "You are an expert in business strtegies, and data analysis. You are talking to a client who wants to start a new business. He has a business model canvas but not a business plan. He's going to share a JSON string with data from his business model canvas and you are going to help them generate a business plan."
    }
  }
  const assistant = await openai.beta.assistants.create({
    name: assistants[name].name,
    instructions: assistants[name].instructions,
    model: "gpt-3.5-turbo-1106",
  });
  return assistant;
}

async function createThred() {
  const thread = await openai.beta.threads.create();
  return thread;
}

async function addMesageToThread(thread, role, message) {
  const added = await openai.beta.threads.messages.create(
    thread.id,
    {
      role,
      content: message
    }
  );
  return added;
}

async function checkRun(thread, run) {
  const checkRun = await openai.beta.threads.runs.retrieve(thread.id, run.id)
  return checkRun;
}

async function getMessages(thread) {
  const messages = await openai.beta.threads.messages.list(thread.id)
  return messages.data;
}

async function runCanvasAssistant(thread, assistant) {
  return new Promise(async (resolve, reject) => {
    const prompt = "Respond to the user only with an improved list of items realted to a business model canvas in json string format as follows: {[camlCase canvas item]: [..list of ideas for the item.] ... The rest of the items.}"
    const run = await openai.beta.threads.runs.create(
      thread.id,
      {
        assistant_id: assistant.id,
        instructions: prompt,
      }
    )
    const checkedRun = await checkRun(thread, run)
    if (checkedRun.status === "in_progress") {
      const interval = setInterval(async () => {
        const checkedRun = await checkRun(thread, run)
        if (checkedRun.status === "completed") {
          clearInterval(interval)
          console.log(checkedRun);
          const messages = await getMessages(thread)
          resolve(messages)
        }
      }, 500)
    } else {
      const messages = await getMessages(thread)
      resolve(messages)
    }
  })
}

function cleanJsonString(jsonString) {
  // remve everything before the first {
  const firstBracket = jsonString.indexOf("{");
  const cleaned = jsonString.slice(firstBracket);

  // remove everything after the last 
  const lastBracket = cleaned.lastIndexOf("}");
  const cleanedAgain = cleaned.slice(0, lastBracket + 1);

  // remove all new lines
  const cleanedJson = cleanedAgain.replace(/\n/g, "");
  return cleanedJson;
}

module.exports = {
  buildBusinessModel: async (req, res) => {
    const assistant = await setupAssistant()
    const thread = await createThred()
    let message = "";

    Object.keys(req.body).forEach((key, i) => {
      const words = key.replace(/([A-Z])/g, " $1").toLowerCase();
      message += `${i+1}. ${words.charAt(0).toUpperCase() + words.slice(1)}: ${req.body[key] ? req.body[key] : "Please give me the idea for this"} \n\n`;
    });
  
    await addMesageToThread(thread, "user", message)
    const messages = await runCanvasAssistant(thread, assistant)
    const jsonString = cleanJsonString(messages[0].content[0].text.value);

    res.json(JSON.parse(jsonString));
  }
}