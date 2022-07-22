const { READ_DETAIL } = require("../constant/queries");
const pool = require("../db");

/**
 * @typedef {Object} TotalExpenditure
 * @property {number} month
 * @property {number} total
 */

class AnalyticsService {
  /**
   * @async
   * @function getTotalExpenditures
   * @param {number} userId
   * @param {number} year
   * @param {string} category
   * @return {Promise<{totalExpenditureList: TotalExpenditure[], ok: true} | {ok: false, error:Error}>}
   */
  async getTotalExpenditureList({ userId, year, category }) {
    const connection = await pool.getConnection();
    try {
      // [ 유저 id, 년도, 카테고리 ]
      const [detail] = await connection.query(READ_DETAIL, [
        userId,
        year,
        category,
      ]);
      return { ok: true, detail };
    } catch (error) {
      await connection.rollback();
      return { ok: false, error };
    } finally {
      await connection.release();
    }
  }
}

const analyticsService = new AnalyticsService();

module.exports = analyticsService;
