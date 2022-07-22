const { READ_PAYMENTS } = require("../constant/queries");
const pool = require("../db");

/**
 * @typedef {Object} PaymentItem
 * @property {string} title
 * @property {number} id
 */

class PaymentService {
  /**
   * @async
   * @function getPaymentList
   * @param {number} id - userId
   * @return {Promise<{ok: false, error}|{paymentList: PaymentItem[], ok: true}>}
   */
  async getPaymentList({ id }) {
    const connection = await pool.getConnection();
    try {
      const [paymentList] = await connection.query(READ_PAYMENTS, [id]);
      await connection.commit();
      return { ok: true, paymentList };
    } catch (error) {
      await connection.rollback();
      return { ok: false, error };
    } finally {
      await connection.release();
    }
  }
}

const paymentService = new PaymentService();

module.exports = paymentService;
