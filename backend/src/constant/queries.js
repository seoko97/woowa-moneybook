const QUERIES = {
  // [ 유저 id, 일자, 수입/지출, 카테고리, 설명, 결제수단 id, 수량 ]
  CREATE_HISTORY:
    "INSERT INTO TRANSACTION_TB(userId, trxDate, direction, category, description, paymentId, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",
  // [ 유저 id ]
  READ_PAYMENTS:
    "SELECT PAY.title, PAY.id AS paymentId FROM PAYMENT_TB AS PAY JOIN USER_PAYMENT_TB AS USER_PAY ON PAY.id = USER_PAY.paymentId WHERE USER_PAY.userId = ?",
};

module.exports = QUERIES;
