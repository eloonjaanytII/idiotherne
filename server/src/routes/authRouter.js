const Router = require('express');
const router = new Router();
const {createUser, getUser, getUserId} = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { loginSchema, registerSchema } = require('../schemas/authSchema');
const ha = require('express-async-handler')
const {loginLimiter} = require('../utils/rateLimit')

router.post('/registration/sign-up', validate(registerSchema), ha(createUser));
router.post('/registration/sign-in', loginLimiter, validate(loginSchema), ha(getUser))
router.get('/me', authMiddleware, ha(getUserId))



module.exports = router;