import express from 'express';
import indexRouter from './routes/index.js';
import currencyRouter from './routes/currency.js';
import userRouter from './routes/user.js';
import pool from './config/db.js';
import cors from 'cors';

const app = express();

async function start() {
  try {
    // 测试数据库连接
    const [rows] = await pool.query('SELECT 1');
    console.log('✅ MySQL 连接成功:', rows);


    app.use(express.json());
    app.use(cors());
    // Use Router
    app.use('/', indexRouter);
    app.use('/currency', currencyRouter);
    app.use('/user', userRouter);


    app.listen(3000, () => {
      console.log('🚀 服务器启动：http://localhost:3000');
    });
  } catch (err) {
    console.error('❌ 数据库连接失败:', err);
    process.exit(1);
  }
}

start();
