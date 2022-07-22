const historyService = require("../services/history.service");
const trxListConvertMap = require("../utils/trxListConvertMap");

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
    res.status(200).json({ ok, error, trxList: trxListConvertMap(trxList) });
  };

  createHistory = async (req, res) => {
    const data = req.body;
    const result = await this.#historyService.createHistory(data);
    res.status(201).json(result);
  };
}
const historyController = new HistoryController(historyService);

module.exports = { HistoryController, historyController };
