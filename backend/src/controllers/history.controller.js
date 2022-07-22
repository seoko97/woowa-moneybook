const historyService = require("../services/history.service");
const trxListConvertMap = require("../utils/trxListConvertMap");

class HistoryController {
  #historyService;
  constructor(historyService) {
    this.#historyService = historyService;
  }

  getHistoryList = async (req, res) => {
    const data = req.body;
    const { ok, error, trxList } = await this.#historyService.getHistoryList(
      data
    );
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
