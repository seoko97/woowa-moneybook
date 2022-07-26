const analyticsService = require("../services/analytics.service");

class AnalyticsController {
  #analyticsService;
  constructor(analyticsService) {
    this.#analyticsService = analyticsService;
  }

  /**
   * @param {number} req.query.id - userId
   * @param {number} req.query.year
   * @param {string} req.query.category
   * @return {Promise<{totalExpenditureList: TotalExpenditure[], ok: true} | {ok: false, error:Error}>}
   */
  getTotalExpenditureList = async (req, res) => {
    const { userId, year, category } = req.query;
    const result = await this.#analyticsService.getTotalExpenditureList({
      userId: Number(userId),
      year: Number(year),
      category,
    });
    res.status(200).json(result);
  };

  getEachCategoryExpenditure = async (req, res) => {
    const { userId, year, month } = req.query;
    const result = await this.#analyticsService.getEachCategoryExpenditure({
      userId: Number(userId),
      year: Number(year),
      month: Number(month),
    });
    res.status(200).json(result);
  };
}
const analyticsController = new AnalyticsController(analyticsService);

module.exports = { AnalyticsController, analyticsController };
