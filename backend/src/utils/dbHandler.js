const pool = require("../db");

const handleDB = async (query, queryData, isWrite) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(query, queryData);
    if (isWrite) await connection.commit();
    return { ok: true, result };
  } catch (error) {
    await connection.rollback();
    return { ok: false, error };
  } finally {
    await connection.release();
  }
};

const readDB = async (query, queryData) => handleDB(query, queryData, false);

const writeDB = async (query, queryData) => handleDB(query, queryData, true);

module.exports = { readDB, writeDB };
