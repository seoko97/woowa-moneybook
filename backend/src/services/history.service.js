const { CREATE_HISTORY, READ_HISTORIES } = require("../constant/queries");
const { readDB, writeDB } = require("../utils/dbHandler");

class HistoryService {
  constructor() {}

  async getHistoryList({
    userId,
    year,
    month,
    direction = "%",
    category = "%",
  }) {
    const { ok, result, error } = await readDB(READ_HISTORIES, [
      userId,
      year,
      month,
      direction,
      category,
    ]);
    return { ok, trxList: result, error };
  }

  async createHistory({
    userId,
    date,
    direction,
    category,
    description,
    paymentId,
    amount,
  }) {
    const { ok, error } = await writeDB(CREATE_HISTORY, [
      userId,
      date,
      direction,
      category,
      description,
      paymentId,
      amount,
    ]);
    return { ok, error };
  }
}

const historyService = new HistoryService();

module.exports = historyService;
