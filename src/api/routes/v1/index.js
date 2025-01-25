const express = require('express');
const {
  sentry: { catchException },
} = require('../../utils/services');

const router = express.Router();

router.get('/status', async (req, res, next) => {
  try {
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    catchException(error);
    return next(error);
  }
});

module.exports = router;
