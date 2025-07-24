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

/**
 * Author: Richard
 * Get a currency by ID
 */
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT id, iso_code, name, symbol, country, is_active
       FROM currencies
       WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No currency found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Query failed:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * Author: Richard
 * Update a currency by ID
 * 
 */
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, symbol, country, is_active } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: '无效的 ID' });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE currencies
       SET name = ?, symbol = ?, country = ?, is_active = ?
       WHERE id = ?`,
      [name, symbol, country, is_active, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '未找到该货币 ID' });
    }

    res.json({ message: '更新成功' });
  } catch (err) {
    console.error('更新失败:', err);
    res.status(500).json({ error: '服务器内部错误' });
  }
});



export default router;
