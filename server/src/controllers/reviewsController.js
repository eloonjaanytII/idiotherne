const {Review, User} = require('../models/index');
const createError = require('http-errors');

const createReview = async (req, res, next) => {

    const {content, kinopoiskId, title } = req.body;
    const userId = req.user.id;

    const checkReview = await Review.findOne({where: {kinopoiskId, userId}})

    if (checkReview) {
        return next(createError(409, "Рецензия на фильм уже существует"))
    }
    
    await Review.create({
        content,
        kinopoiskId,
        userId,
        title
    });

    return res.status(201).json({ message: 'Рецензия опубликована'});
}

const getUserReview = async (req, res) => {
    
    const {userId} = req.params;

    const reviews = await Review.findAll({where: {userId}})

    return res.status(200).json(reviews);
}

const getMovieReviews = async (req, res) => {
    
    const {kinopoiskId} = req.params;

    const checkReview = await Review.findAll({
        where: { kinopoiskId },
        include: [{ model: User,
            attributes: ['avatar', 'username'],}]
    });

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