const {
  READ_DETAIL,
  READ_EACH_CATEGORY_HISTORIES,
} = require("../constant/queries");
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

  async getEachCategoryExpenditure(data) {
    // [ 유저 id, 년도, 달 ]
    const { userId, year, month } = data;
    const { ok, result, error } = await readDB(READ_EACH_CATEGORY_HISTORIES, [
      userId,
      year,
      month,
    ]);
    return { ok, error, eachCategoryExpenditure: result };
  }
}

const analyticsService = new AnalyticsService();

module.exports = analyticsService;
