const { OPENAI_API_KEY } = process.env;
const OpenAI = require("openai");

class AssistantRepository {
  constructor() {
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    this.assistants = {
      canvas: {
        name: "Canvas Assistant",
        instructions: "You are an expert in business model generation. You are talking to a client who wants to start a new business. You are going to help them generate a business model canvas."
      },
      plan: {
        name: "Plan Assistant",
        instructions: "You are an expert in business strtegies, and data analysis. You are talking to a client who wants to start a new business. He has a business model canvas but not a business plan. He's going to share a JSON string with data from his business model canvas and you are going to help them generate a business plan."
      }
    }

    this.model = "gpt-3.5-turbo-1106";
  }

  async setupAssistant(name = "canvas") {
    try {
      const assistant = await this.openai.beta.assistants.create({
        name: this.assistants[name].name,
        instructions: this.assistants[name].instructions,
        model: this.model,
      });
      return assistant;
    } catch (error) {
      throw { error: error.message, status: error.status || 500 }; 
    }
  }

  async createThred() {
    try {
      const thread = await this.openai.beta.threads.create();
      return thread;
    } catch (error) {
      throw { error: error.message, status: error.status || 500 };
    }
  }

  async addMesageToThread(thread, role, message) {
    try {
      const added = await this.openai.beta.threads.messages.create(
        thread.id,
        {
          role,
          content: message
        }
      );
      return added;
    } catch (error) {
      throw { error: error.message, status: error.status || 500 };
    }
  }

  async checkRun(thread, run) {
    try {
      const checkRun = await this.openai.beta.threads.runs.retrieve(thread.id, run.id)
      return checkRun;
    } catch (error) {
      throw { error: error.message, status: error.status || 500 };
    }
  }
  
  async getMessages(thread) {
    try {
      const messages = await this.openai.beta.threads.messages.list(thread.id)
      return messages.data;
    } catch (error) {
      throw { error: error.message, status: error.status || 500 };
    }
  }
  
  async runCanvasAssistant(thread, assistant) {
    return new Promise(async (resolve, reject) => {
      try {
        const prompt = "Respond to the user only with an improved list of items realted to a business model canvas in json string format as follows: {[camlCase canvas item]: [..list of ideas for the item.] ... The rest of the items.}"
        const run = await this.openai.beta.threads.runs.create(
          thread.id,
          {
            assistant_id: assistant.id,
            instructions: prompt,
          }
        )
        const checkedRun = await this.checkRun(thread, run)
        if (checkedRun.status === "in_progress") {
          const interval = setInterval(async () => {
            const checkedRun = await this.checkRun(thread, run)
            if (checkedRun.status === "completed") {
              clearInterval(interval)
              const messages = await this.getMessages(thread)
              resolve(messages)
            }
          }, 500)
        } else {
          const messages = await this.getMessages(thread)
          resolve(messages)
        }
      } catch (error) {
        reject({ error: error.message, status: error.status || 500 });
      }
    })
  }
}

module.exports = AssistantRepository;