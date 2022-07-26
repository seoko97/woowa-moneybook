const historyService = require("../services/history.service");

class HistoryController {
  #historyService;
  constructor(historyService) {
    this.#historyService = historyService;
  }

  getHistoryList = async (req, res) => {
    // const data = req.body;
    const { userId, year, month, direction, category } = req.query;
    const { ok, error, trxList } = await this.#historyService.getHistoryList({
      userId: Number(userId),
      year: Number(year),
      month: Number(month),
      direction,
      category,
    });
    res.status(200).json({
      ok,
      totalLength: trxList && trxList.length,
      error,
      trxList,
    });
  };

  createHistory = async (req, res) => {
    const data = req.body;
    const result = await this.#historyService.createHistory(data);
    res.status(201).json(result);
  };

  updateHistory = async (req, res) => {
    const result = await this.#historyService.updateHistory(req.body);
    res.status(200).json(result);
  };

  deleteHistory = async (req, res) => {
    const result = await this.#historyService.deleteHistory(req.body);
    res.status(200).json(result);
  };
}
const historyController = new HistoryController(historyService);

module.exports = { HistoryController, historyController };
