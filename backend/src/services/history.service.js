const { CREATE_TRANSACTION } = require('../constant/queries');
const pool = require('../db');

class HistoryService {
	async craeteHistory(data) {
		const connection = await pool.getConnection();
		try {
			const [row, column] = await connection.query(CREATE_TRANSACTION, [
				1,
				new Date(),
				'in',
				'Test',
				'테스트입니다.',
				1,
				10000,
			]);

			await connection.commit();

			return { row, column };
		} catch (error) {
			await connection.rollback();
			return { ok: false, error };
		} finally {
			await connection.release();
		}
	}
}

const historyService = new HistoryService();

module.exports = historyService;
