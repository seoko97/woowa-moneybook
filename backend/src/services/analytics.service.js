const { READ_DETAIL } = require("../constant/queries");
const { readDB } = require("../utils/dbHandler");

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
    const { ok, result, error } = await readDB(READ_DETAIL, [
      userId,
      year,
      category,
    ]);
    return { ok, error, totalExpenditureList: result };
  }
}

const analyticsService = new AnalyticsService();

module.exports = analyticsService;
