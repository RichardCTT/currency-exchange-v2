import pool from './config/db';
import express from 'express';

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

const router = express();
router.post('/users', async(req, res) => {
    const sql = 'INSERT INTO user (password, email, username) VALUES (?, ?, ?)';
    const values = [req.body.password, req.body.email, req.body.username];

    if (!isValidEmail(req.body.email)){
        res.status(400).json({message: "Invalid input"});
        return;
    }

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(sql, values);
        connection.release();
        console.log('Inserted user with ID:', result.user_id);
        res.status(200).json({message: 'Successful operation'});
      } catch (err) {
        console.error('Error during insertion:', err.message);
      }
});

export default router;