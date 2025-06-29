const Router = require('express');
const router = new Router();
const {createReview, getUserReview, getMovieReviews} = require('../controllers/reviewsController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createReview);
router.get('/user-review/:userId', getUserReview)
router.get('/movie-review/:kinopoiskId', getMovieReviews)

module.exports = router;