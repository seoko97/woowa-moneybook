const QUERIES = {
  // [ 유저 id, 일자, 수입/지출, 카테고리, 설명, 결제수단 id, 수량 ]
  CREATE_HISTORY:
    "INSERT INTO TRANSACTION_TB(userId, trxDate, direction, category, description, paymentId, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",
};

module.exports = QUERIES;
