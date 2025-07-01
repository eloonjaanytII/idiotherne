const Router = require('express');
const router = new Router();
const {getUsersList, getUserData, patchUserStatus} = require('../controllers/usersController')
const ha = require('express-async-handler');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users-list', ha(getUsersList));
router.get('/user/:userId', ha(getUserData))
router.put('/status', authMiddleware, ha(patchUserStatus))


module.exports = router;