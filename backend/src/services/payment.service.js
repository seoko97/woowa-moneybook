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
   * @return {Promise<{ok: false, error:Error}|{paymentList: PaymentItem[], ok: true}>}
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

  /**
   * @async
   * @function deletePayment
   * @param {number} userId
   * @param {number} paymentId
   * @return {Promise<{ok: boolean, error: Error|undefined}>}
   */
  async deletePayment({ userId, paymentId }) {
    const connection = await pool.getConnection();
    try {
      // [ 유저 id, 결제수단 id ]
      await connection.query(DELETE_PAYMENT, [userId, paymentId]);
      return { ok: true };
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
