import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Currency Exchange API Home');
});

export default router;
