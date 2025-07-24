import pool from './config/db.js';

async function getUserProfile(username) {
  const conn = await pool.getConnection();

  try {
    const query = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await conn.query(query, [username]);

    if (rows.length > 0) {
      const data = rows[0];
      console.log('User Profile:', data);
      return data;
    } else {
      console.warn('User not found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
  } finally {
    conn.release();
  }
}


