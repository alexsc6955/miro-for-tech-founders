const AssistantService = require("../service/AssistantService");

module.exports = {
  buildBusinessModel: async (req, res, next) => {
    try {
      const assistantService = new AssistantService();
      const { body } = req;
      const businessModel = await assistantService.generateBusinessModel(body);
      if (businessModel.error) {
        throw businessModel.error;
      }
      res.status(200).json(businessModel);
    } catch (error) {
      next(error);
    }
  }
}