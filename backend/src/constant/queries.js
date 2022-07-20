const QUERIES = {
	CREATE_HISTORY:
		'INSERT INTO TRANSACTION_TB(userId, date, direction, category, description, paymentId, amount) VALUE (?, ?, ?, ?, ?, ?, ?)',
};

module.exports = QUERIES;
