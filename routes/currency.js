import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('Currency Exchange API Home');
// });

router.post('/', async (req, res) => {
  try {
    const { iso_code, name, symbol, country, is_active } = req.body;

    const [result] = await pool.query(
      `INSERT INTO currencies (iso_code, name, symbol, country, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [iso_code, name, symbol, country, !!is_active]
    );

    const newCurrency = {
      id: result.insertId,
      iso_code,
      name,
      symbol,
      country,
      is_active: !!is_active,
    };

    res.status(201).json(newCurrency);
  } catch (err) {
    console.error('Insert currency error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM currencies');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching currencies' });
  }
});


export default router;
