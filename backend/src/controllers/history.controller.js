const historyService = require("../services/history.service");

class HistoryController {
  #historyService;
  constructor(historyService) {
    this.#historyService = historyService;
  }

  createHistory = async (req, res) => {
    const data = req.body;
    const result = await this.#historyService.createHistory(data);
    res.status(201).json({
      ...result,
    });
  };
}
const historyController = new HistoryController(historyService);

module.exports = { HistoryController, historyController };
