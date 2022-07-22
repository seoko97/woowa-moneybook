const analyticsService = require("../services/analytics.service");

class AnalyticsController {
  #analyticsService;
  constructor(analyticsService) {
    this.#analyticsService = analyticsService;
  }

  /**
   * @param {number} req.body.id - userId
   * @param {number} req.body.year
   * @param {string} req.body.category
   * @return {Promise<{totalExpenditureList: TotalExpenditure[], ok: true} | {ok: false, error:Error}>}
   */
  getTotalExpenditureList = async (req, res) => {
    const data = req.body;
    const result = await this.#analyticsService.getTotalExpenditureList(data);
    res.status(200).json(result);
  };
}
const analyticsController = new AnalyticsController(analyticsService);

module.exports = { AnalyticsController, analyticsController };
