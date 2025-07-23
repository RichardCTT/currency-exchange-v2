import express from 'express';
import indexRouter from './routes/index.js';

const app = express();


// Use Router
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
