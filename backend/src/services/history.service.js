const {
  CREATE_HISTORY,
  READ_HISTORIES,
  UPDATE_HISTORY,
  DELETE_HISTORY,
  READ_HISTORY_BY_ID,
} = require("../constant/queries");
const { readDB, writeDB } = require("../utils/dbHandler");

class HistoryService {
  constructor() {}

  async getHistoryById(id) {
    // [ 트랜잭션 id ]
    const { error, result } = await readDB(READ_HISTORY_BY_ID, [id]);
    const retJson = { error, ok: false };
    if (result && result.length !== 0) {
      retJson.ok = true;
      retJson.result = result[0];
    }
    return retJson;
  }

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
    trxDate,
    direction,
    category,
    description,
    paymentId,
    amount,
  }) {
    let { ok, error, result } = await writeDB(CREATE_HISTORY, [
      userId,
      trxDate,
      direction,
      category,
      description,
      paymentId,
      amount,
    ]);
    return { ok, error, result };
  }

  async handleWriteHistory(data) {
    const { isCreate, ...queryData } = data;
    let result, ok, error, id;
    if (isCreate) {
      ({ result, ok, error } = await this.createHistory(queryData));
      id = result.insertId;
    } else {
      ({ result, ok, error } = await this.updateHistory(queryData));
      id = queryData.id;
    }
    if (ok) {
      ({ result, ok, error } = await this.getHistoryById(id));
    }
    return { newHistory: result, ok, error };
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
