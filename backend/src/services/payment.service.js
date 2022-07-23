const {
  READ_PAYMENTS,
  DELETE_PAYMENT,
  CREATE_USER_PAYMENT,
  CREATE_PAYMENT,
  READ_PAYMENT_BY_TITLE,
} = require("../constant/queries");
const { readDB, writeDB } = require("../utils/dbHandler");

/**
 * @typedef {Object} PaymentItem
 * @property {string} title
 * @property {number} id
 */

class PaymentService {
  /**
   * @async
   * @function getPaymentList
   * @param {number} userId - userId
   * @return {Promise<{paymentList: PaymentItem[], ok: true}|{ok: false, error:Error}>}
   */
  async getPaymentList({ userId }) {
    const { ok, error, result } = await readDB(READ_PAYMENTS, [userId]);
    return { ok, error, paymentList: result };
  }

  /**
   * @async
   * @function deletePayment
   * @param {number} userId
   * @param {number} paymentId
   * @return {Promise<{ok: boolean, error: Error|undefined}>}
   */
  async deletePayment({ userId, paymentId }) {
    const { ok, error } = await writeDB(DELETE_PAYMENT, [userId, paymentId]);
    return { ok, error };
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
        paymentId: paymentItem.id,
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
    return await writeDB(CREATE_USER_PAYMENT, [userId, paymentId]);
  }

  /**
   * @async
   * @function createPayment
   * @param {string} title
   * @return {Promise<{paymentItem: PaymentItem, ok: true}|{ok: false, error:Error}>}
   * @description PAYMENT_TB에 title을 가지는 새로운 레코드 생성해주는 함수
   */
  async createPayment({ title }) {
    const { ok, error, result } = await writeDB(CREATE_PAYMENT, [title]);
    const retJson = { ok, error };
    if (ok) retJson.paymentItem = { id: result.insertId, title };
    return retJson;
  }

  /**
   * @async
   * @function getPaymentByTitle
   * @param {string} title
   * @return {Promise<{paymentItem: (PaymentItem|null), ok: true}|{ok: false, error: Error}>}
   * @description title로 PAYMENT_TB에 동일한 이름을 가진 결제수단이 있는지 확인하는 함수
   */
  async getPaymentByTitle({ title }) {
    const { ok, error, result } = await readDB(READ_PAYMENT_BY_TITLE, [title]);
    const retJson = { error, ok: false };
    if (result && result.length !== 0) {
      retJson.ok = true;
      retJson.paymentItem = result[0];
    }
    return retJson;
  }
}

const paymentService = new PaymentService();

module.exports = paymentService;
