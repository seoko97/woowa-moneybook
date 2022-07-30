const QUERIES = {
  // [ 유저 id, 일자, 수입/지출, 카테고리, 설명, 결제수단 id, 수량 ]
  CREATE_HISTORY:
    "INSERT INTO TRANSACTION_TB(userId, trxDate, direction, category, description, paymentId, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",
  // [ 내역 id ]
  READ_HISTORY_BY_ID: `SELECT TRAN_TB.id AS id, DATE_FORMAT(trxDate, '%Y-%m-%d') as trxDate, direction, category, description, P_TB.title AS payment, amount
    FROM TRANSACTION_TB AS TRAN_TB
    JOIN PAYMENT_TB AS P_TB ON P_TB.id=paymentId
    WHERE TRAN_TB.id=?`,
  // [ 유저 id, 년도, 달, 수입/지출, 카테고리]
  READ_HISTORIES: `SELECT TRAN_TB.id AS id, DATE_FORMAT(trxDate, '%Y-%m-%d') as trxDate, direction, category, description, P_TB.title AS payment, amount  
    FROM TRANSACTION_TB AS TRAN_TB
    JOIN PAYMENT_TB AS P_TB ON P_TB.id=paymentId
    WHERE userId=? AND YEAR(trxDate)=? AND MONTH(trxDate)=? AND direction LIKE ? AND category LIKE ? 
    ORDER BY trxDate DESC, TRAN_TB.updatedAt DESC`,
  // [ 유저 id, 카테고리, 시작 날짜, 포함되지 않는 마지막 날짜 ]
  READ_YEAR_HISTORIES_ABOUT_CATEGORY: `SELECT TRAN_TB.id AS id, DATE_FORMAT(trxDate, '%Y-%m-%d') as trxDate, direction, category, description, P_TB.title AS payment, amount  
    FROM TRANSACTION_TB AS TRAN_TB
    JOIN PAYMENT_TB AS P_TB ON P_TB.id=paymentId
    WHERE userId=? AND \`category\`=? AND ? <= trxDate AND trxDate < ?
    ORDER BY trxDate DESC, TRAN_TB.updatedAt`,
  // [ 유저 id, 년도, 달 ]
  READ_EACH_CATEGORY_HISTORIES: `SELECT category, CAST(SUM(amount) AS UNSIGNED) AS 'total'
    FROM TRANSACTION_TB WHERE userId=? AND YEAR(trxDate)=? AND MONTH(trxDate)=?
    AND direction='out' GROUP BY category ORDER BY SUM(amount) DESC`,
  // [ 일자, 수입/지출, 카테고리, 설명, 결제수단 id, 수량, 내역 id ]
  UPDATE_HISTORY: `UPDATE TRANSACTION_TB SET trxDate=?, direction=?, category=?,
                description=?, paymentId=?, amount=? WHERE id=?`,
  // [ 트랜잭션 id ]
  DELETE_HISTORY: "DELETE FROM TRANSACTION_TB WHERE id=?",
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
  READ_DETAIL: `SELECT MONTH (trxDate) AS 'month', CAST(SUM (amount) AS UNSIGNED) AS 'total'
         FROM TRANSACTION_TB
         WHERE userId=? AND YEAR (trxDate)=? AND category=? AND direction='out'
         GROUP BY MONTH (trxDate)
         ORDER BY MONTH (trxDate)`,
};

module.exports = QUERIES;
