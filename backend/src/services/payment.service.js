const {
  READ_PAYMENTS,
  DELETE_PAYMENT,
  CREATE_USER_PAYMENT,
} = require("../constant/queries");
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

  /**
   * @async
   * @function joinUserPayment
   * @param {number} userId
   * @param {number} paymentId
   * @return {Promise<{ok: boolean, error: Error|undefined}>}
   */
  // USER_PAYMENT_MAP_TB에서 관계를 맺어주는 레코드를 생성하는 함수
  async joinUserPayment({ userId, paymentId }) {
    const connection = await pool.getConnection();
    try {
      // [ 유저 id, 결제수단 id]
      await connection.query(CREATE_USER_PAYMENT, [userId, paymentId]);
      await connection.commit();
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
