const { CREATE_HISTORY, READ_HISTORIES } = require("../constant/queries");
const pool = require("../db");

class HistoryService {
  constructor() {}

  // 필수: { userId, year, month }
  // 선택: { direction, category }
  async getHistoryList({
    userId,
    year,
    month,
    direction = "%",
    category = "%",
  }) {
    const connection = await pool.getConnection();
    try {
      // [ 유저 id, 년도, 달, 수입/지출, 카테고리]
      const [trxList] = await connection.query(READ_HISTORIES, [
        userId,
        year,
        month,
        direction,
        category,
      ]);
      return { ok: true, trxList };
    } catch (error) {
      await connection.rollback();
      return { ok: false, error };
    } finally {
      await connection.release();
    }
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
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(CREATE_HISTORY, [
        userId,
        date,
        direction,
        category,
        description,
        paymentId,
        amount,
      ]);
      await connection.commit();

      return { ok: true, result };
    } catch (error) {
      await connection.rollback();
      return { ok: false, error };
    } finally {
      await connection.release();
    }
  }
}

const historyService = new HistoryService();

module.exports = historyService;
