const { CREATE_HISTORY } = require("../constant/queries");
const pool = require("../db");

class HistoryService {
  constructor() {}

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
