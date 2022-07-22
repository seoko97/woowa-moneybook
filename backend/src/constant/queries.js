const QUERIES = {
  // [ 유저 id, 일자, 수입/지출, 카테고리, 설명, 결제수단 id, 수량 ]
  CREATE_HISTORY:
    "INSERT INTO TRANSACTION_TB(userId, trxDate, direction, category, description, paymentId, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",
  // [ 유저 id, 년도, 달, 수입/지출, 카테고리]
  READ_HISTORIES: `SELECT DATE_FORMAT(trxDate, '%Y-%m-%d') as date, direction, category, description, paymentId, amount  
    FROM TRANSACTION_TB 
    WHERE userId=? AND YEAR(trxDate)=? AND MONTH(trxDate)=? AND direction LIKE ? AND category LIKE ? ORDER BY trxDate`,
  // [ 유저 id ]
  READ_PAYMENTS:
    "SELECT PAY.title, PAY.id FROM PAYMENT_TB AS PAY JOIN USER_PAYMENT_TB AS USER_PAY ON PAY.id = USER_PAY.paymentId WHERE USER_PAY.userId = ?",
  // [ 결제수단 이름 ]
  READ_PAYMENT_BY_TITLE: "SELECT id, title FROM PAYMENT_TB WHERE title=?",
  // [ 결제수단 이름 ]
  CREATE_PAYMENT: "INSERT INTO PAYMENT_TB (title) VALUES (?)",
  // [ 유저 id, 결제수단 id]
  CREATE_USER_PAYMENT:
    "INSERT IGNORE INTO USER_PAYMENT_TB (userId, paymentId) VALUES (?, ?)",
  // [ 유저 id, 결제수단 id ]
  DELETE_PAYMENT: "DELETE FROM USER_PAYMENT_TB WHERE userId=? AND paymentId=?",
  // [ 유저 id, 년도, 카테고리 ]
  READ_DETAIL: `SELECT MONTH (trxDate) AS 'month', SUM (amount) AS 'sum'
         FROM TRANSACTION_TB
         WHERE userId=? AND YEAR (trxDate)=? AND category=? AND direction='out'
         GROUP BY MONTH (trxDate)
         ORDER BY MONTH (trxDate)`,
};

module.exports = QUERIES;
