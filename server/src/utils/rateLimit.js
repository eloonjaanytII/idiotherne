const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 2000, 
  max: 5,
  message: {
    status: 429,
    message: "Слишком много попыток. Попробуйте позже.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter };