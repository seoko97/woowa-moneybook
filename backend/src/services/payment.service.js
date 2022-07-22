const {
  READ_PAYMENTS,
  DELETE_PAYMENT,
  CREATE_USER_PAYMENT,
  CREATE_PAYMENT,
  READ_PAYMENT_BY_TITLE,
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
   * @return {Promise<{paymentList: PaymentItem[], ok: true}|{ok: false, error:Error}>}
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
   * @param {number} userId
   * @param {string} title
   * @return {Promise<{paymentItem: PaymentItem, ok: true}|{ok: false, error: Error}>}
   * @description
   */
  // 유저의 결제수단을 추가하는 함수
  // title을 가지는 결제수단이 없다면 PAYMENT_TB에 추가
  // USER_PAYMENT_TB에 유저와 결제수단을 연결지어준다
  async createUserPayment({ userId, title }) {
    try {
      // PAYMENT_TB에 동일한 이름을 가진 레코드가 있는지 확인
      let { ok, paymentItem, error } = await this.getPaymentByTitle({ title });
      if (error) throw error;

      // PAYMENT_TB에 없다면 새로 생성해준다
      if (!ok) {
        ({ paymentItem, error } = await this.createPayment({ title }));
        if (error) throw error;
      }

      // USER_PAYMENT_MAP_TB에 새로운 레코드 생성
      // user와 payment를 연결지어준다.
      ({ error } = await this.joinUserPayment({
        userId,
        paymentId: paymentItem.paymentId,
      }));
      if (error) throw error;

      return { ok: true, paymentItem };
    } catch (error) {
      return { ok: false, error };
    }
  }

  /**
   * @async
   * @function joinUserPayment
   * @param {number} userId
   * @param {number} paymentId
   * @return {Promise<{ok: boolean, error: Error|undefined}>}
   * @description USER_PAYMENT_TB에서 관계를 맺어주는 레코드를 생성하는 함수
   */
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

  /**
   * @async
   * @function createPayment
   * @param {string} title
   * @return {Promise<{paymentItem: PaymentItem, ok: true}|{ok: false, error:Error}>}
   * @description PAYMENT_TB에 title을 가지는 새로운 레코드 생성해주는 함수
   */
  async createPayment({ title }) {
    const connection = await pool.getConnection();
    try {
      // PAYMENT_TB에 동일한 이름이 없다면 새로 생성
      // [ 결제수단 이름 ]
      const [row] = await connection.query(CREATE_PAYMENT, [title]);
      await connection.commit();

      const paymentItem = { id: row.insertId, title };
      return {
        ok: true,
        paymentItem,
      };
    } catch (error) {
      await connection.rollback();
      return { ok: false, error };
    } finally {
      await connection.release();
    }
  }

  /**
   * @async
   * @function getPaymentByTitle
   * @param {string} title
   * @return {Promise<{paymentItem: (PaymentItem|null), ok: true}|{ok: false, error: Error}>}
   * @description title로 PAYMENT_TB에 동일한 이름을 가진 결제수단이 있는지 확인하는 함수
   */
  async getPaymentByTitle({ title }) {
    const connection = await pool.getConnection();
    try {
      // [ 결제수단 이름 ]
      const [payment] = await connection.query(READ_PAYMENT_BY_TITLE, [title]);
      return {
        ok: payment.length !== 0,
        paymentItem: payment.length !== 0 ? payment[0] : null,
      };
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
