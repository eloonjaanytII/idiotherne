const {Review, User} = require('../models/index');

const createReview = async (req, res, next) => {

    const {content, kinopoiskId, title } = req.body;
    const userId = req.user.id;

    const checkReview = await Review.findOne({where: {kinopoiskId, userId}})

    if (checkReview) {
        return next(new Error("Рецензия на фильм уже существует"))
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

    const checkReview = await Review.findAll({where: {userId}})

    if (!checkReview || checkReview.length === 0) {
        return res.status(200).json({reviews: []});
    }

    return res.status(200).json({reviews: checkReview});
}

const getMovieReviews = async (req, res) => {
    
    const {kinopoiskId} = req.params;

    const checkReview = await Review.findAll({
        where: { kinopoiskId },
        include: [{ model: User,
            attributes: ['avatar', 'username'],}]
    });

    if (!checkReview || checkReview.length === 0) {
        return res.status(200).json({reviews: []});
    }

    

    return res.status(200).json({reviews: checkReview});
}

module.exports = {createReview, getUserReview, getMovieReviews};