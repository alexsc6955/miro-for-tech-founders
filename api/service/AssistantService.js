const AssistantRepository = require("../data/repository/AssistantRepository");
const cleanJsonString = require("../utils/cleanJsonString");

class AssistantService {
  constructor() {
    this.repository = new AssistantRepository();
  }

  async generateBusinessModel(data = {}) {
    try {
      const assistant = await this.repository.setupAssistant("canvas")
      const thread = await this.repository.createThred()
      let message = "";
  
      Object.keys(data).forEach((key, i) => {
        const words = key.replace(/([A-Z])/g, " $1").toLowerCase();
        message += `${i+1}. ${words.charAt(0).toUpperCase() + words.slice(1)}: ${data[key] ? data[key] : "Please give me the idea for this"} \n\n`;
      });
    
      await this.repository.addMesageToThread(thread, "user", message)
      const messages = await this.repository.runCanvasAssistant(thread, assistant)
      const jsonString = cleanJsonString(messages[0].content[0].text.value);
      const json = JSON.parse(jsonString);
      return json;
    } catch (error) {
      return { error: error.message, status: error.status || 500 };
    }
  }
}

module.exports = AssistantService;