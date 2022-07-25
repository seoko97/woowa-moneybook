const {
  CREATE_HISTORY,
  READ_HISTORIES,
  UPDATE_HISTORY,
  DELETE_HISTORY,
} = require("../constant/queries");
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

  async updateHistory(data) {
    // [ 일자, 수입/지출, 카테고리, 설명, 결제수단 id, 수량, 내역 id ]
    const { trxDate, direction, category, description, paymentId, amount, id } =
      data;
    const { ok, error } = await writeDB(UPDATE_HISTORY, [
      trxDate,
      direction,
      category,
      description,
      paymentId,
      amount,
      id,
    ]);
    return { ok, error };
  }

  async deleteHistory(data) {
    const { id } = data;
    // [ 트랜잭션 id ]
    const { ok, error } = await writeDB(DELETE_HISTORY, [id]);
    return { ok, error };
  }
}

const historyService = new HistoryService();

module.exports = historyService;
