const Router = require('express');
const router = new Router();
const {updateFilmFlags, getUserFilms, getFilm, getUserFilmFlag, getUserFilmWithScores, getUserFilmWithFavorite} = require('../controllers/filmController')
const ha = require('express-async-handler');
const authMiddleware = require('../middleware/authMiddleware');

router.get("/film/:kinopoiskId", ha(getFilm));
router.get("/user-films/:userId", ha(getUserFilms));   

router.get("/film-flag/:kinopoiskId", authMiddleware, ha(getUserFilmFlag));

router.get("/film-score/:userId", ha(getUserFilmWithScores));
router.get("/film-favorite/:userId", ha(getUserFilmWithFavorite));

router.put('/', authMiddleware, ha(updateFilmFlags));


module.exports = router;