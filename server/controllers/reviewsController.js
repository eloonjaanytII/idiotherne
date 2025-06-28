const {Review, User} = require('../models/index');
const createError = require('http-errors');

const createReview = async (req, res, next) => {

    const {content, kinopoiskId, title } = req.body;
    const userId = req.user.id;

    const checkReview = await Review.findOne({where: {kinopoiskId, userId}})

    if (checkReview) {
        return next(createError(400, "Рецензия на фильм уже существует"))
    }
    
    await Review.create({
        content,
        kinopoiskId,
        userId,
        title
    });

    return res.status(201).json({ message: 'Рецензия опубликована'});
}

const getUserReview = async (req, res, next) => {
    
    const {userId} = req.params;

    const reviews = await Review.findAll({where: {userId}})

    if (!reviews) {
        return next(createError(400, "Рецензии юзера не найдены"))
    }

    return res.status(200).json(reviews);
}

const getMovieReviews = async (req, res, next) => {
    
    const {kinopoiskId} = req.params;

    const checkReview = await Review.findAll({
        where: { kinopoiskId },
        include: [{ model: User,
            attributes: ['avatar', 'username'],}]
    });

    if (!checkReview || checkReview.length === 0) {
        return next(createError(400, "У фильма ещё нет рецензий"))
    }

        const reviews = checkReview.map(r => ({
            kinopoiskId: r.kinopoiskId,
            userId: r.userId,
            title: r.title,
            content: r.content,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            avatar: r.User.avatar,
            username: r.User.username
        }));

    return res.status(200).json(reviews);
}

module.exports = {createReview, getUserReview, getMovieReviews};