const { CREATE_HISTORY } = require("../constant/queries");
const pool = require("../db");

class HistoryService {
  constructor() {}

  async createHistory(data) {
    const connection = await pool.getConnection();
    try {
      const [row, column] = await connection.query(CREATE_HISTORY, [
        1,
        "2022-07-10",
        "in",
        "Test",
        "테스트입니다.",
        1,
        10000,
      ]);

      await connection.commit();

      return { row, column };
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
