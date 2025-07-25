import express from 'express';
import indexRouter from './routes/index.js';
import userRouter from './routes/user_post.js'
import pool from './config/db.js';

const app = express();

async function start() {
  try {
    // 测试数据库连接
    const [rows] = await pool.query('SELECT 1');
    console.log('✅ MySQL 连接成功:', rows);

    // Use Router
    // app.use('/', indexRouter);
    app.use('/users',userRouter);

    app.listen(3000, () => {
      console.log('🚀 服务器启动：http://localhost:3000');
    });
  } catch (err) {
    console.error('❌ 数据库连接失败:', err);
    process.exit(1);
  }
}

start();
