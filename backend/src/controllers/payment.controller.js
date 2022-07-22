const paymentService = require("../services/payment.service");

class PaymentController {
  #paymentService;
  constructor(paymentService) {
    this.#paymentService = paymentService;
  }

  /**
   * @param {number} req.body.id - userId
   * @return {Promise<{paymentList: PaymentItem[], ok: true}|{ok: false, error:Error}>}
   */
  getPaymentList = async (req, res) => {
    const data = req.body;
    const result = await this.#paymentService.getPaymentList(data);
    res.status(200).json(result);
  };

  /**
   * @param {number} req.body.userId - userId
   * @param {number} req.body.paymentId - paymentId
   */
  deletePayment = async (req, res) => {
    const data = req.body;
    const result = await this.#paymentService.deletePayment(data);
    res.status(200).json(result);
  };
}
const paymentController = new PaymentController(paymentService);

module.exports = { PaymentController, paymentController };
