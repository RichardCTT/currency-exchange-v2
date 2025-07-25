import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// 创建用户 (Create)
router.post('/', async (req, res) => {
  const { password, email, username } = req.body;
  if (!password || !email || !username) {
    return res.status(400).json({ error: '缺少必填字段' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO user (password, email, username) VALUES (?, ?, ?)`,
      [password, email, username]
    );
    res.status(201).json({ message: '用户创建成功', user_id: result.insertId });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: '邮箱或用户名已存在' });
    }
    res.status(500).json({ error: '服务器错误' });
  }
});

// 查询所有用户 (Read all)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT user_id, email, username FROM user`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 根据 user_id 查询单个用户 (Read one)
router.get('/:user_id', async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  if (isNaN(user_id)) {
    return res.status(400).json({ error: '无效的 user_id' });
  }
  try {
    const [rows] = await pool.execute(
      `SELECT user_id, email, username FROM user WHERE user_id = ?`,
      [user_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 根据 user_id 更新用户 (Update)
router.put('/:user_id', async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const { password, email, username } = req.body;
  if (isNaN(user_id)) {
    return res.status(400).json({ error: '无效的 user_id' });
  }
  try {
    const [result] = await pool.execute(
      `UPDATE users SET password = ?, email = ?, username = ? WHERE user_id = ?`,
      [password, email, username, user_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json({ message: '用户更新成功' });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: '邮箱或用户名已存在' });
    }
    res.status(500).json({ error: '服务器错误' });
  }
});

// 根据 user_id 删除用户 (Delete)
router.delete('/:user_id', async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  if (isNaN(user_id)) {
    return res.status(400).json({ error: '无效的 user_id' });
  }
  try {
    const [result] = await pool.execute(`DELETE FROM user WHERE user_id = ?`, [user_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json({ message: '用户删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器错误' });
  }
});

export default router;
