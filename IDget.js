import pool from './config/db.js';


async function getUserProfile(userId) {

  const conn = await pool.getConnection();

  try {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    const [rows] = await conn.query(query, [userId]);

    if (rows.length > 0) {
      const data = rows[0];
      console.log('User Profile:', data);
      return data;
    } else {
      console.warn('User not found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
  }
  conn.release()
}

