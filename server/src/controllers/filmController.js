const { UserFilms } = require("../models");
const { Film } = require("../models");
const { Op } = require("sequelize");
const createError = require('http-errors');

const getFilmOrFetch = require("../services/getFilmOrFetch.js");

const updateFilmFlags = async (req, res) => {

    const {kinopoiskId, isWatched, rating, favorite} = req.body;
    const userId = req.user.id;

    const [updatedCount] = await UserFilms.update({isWatched, rating, favorite}, {where : {kinopoiskId, userId}});

    if (updatedCount === 0) next(createError(404, 'Фильм или запись пользователя не найдены'));

    return res.status(201).json({ message: 'Обновлены флаги фильма'});
}

const getFilm = async (req, res, next) => {

    const {kinopoiskId} = req.params;
    const film = await getFilmOrFetch(kinopoiskId);

    if (!film) next(createError(404, "Фильм не найден"));

    return res.status(200).json(film);
}


const getUserFilmFlag = async (req, res, next) => {

    const {kinopoiskId} = req.params;
    const userId = req.user.id;

    await getFilmOrFetch(kinopoiskId);

    const [userFlags] = await UserFilms.findOrCreate({
        where: { kinopoiskId, userId },
        defaults: {
            isWatched : false,
            rating: 0,
            favorite: false
        }
        });

    const { favorite, isWatched, rating } = userFlags;
    return res.status(200).json({ favorite, isWatched, rating })
}

const getUserFilmWithScores = async (req, res, next) => {

    const {userId} = req.params;

    const data = await UserFilms.findAll({where: {userId, rating: { [Op.gt]: 0}}})

    if (data.length === 0) res.status(200).json([]);

    const kinopoiskIdList = data.filter(el => el.kinopoiskId).map(el => el.kinopoiskId);

    const filmList = await Film.findAll({where: {kinopoiskId: kinopoiskIdList}})

    if (!filmList) {
        return next(createError(400,  "Случилась какая-то ошибка с поиском фильмов по оценкам"));
    }

    const filmMap = {}
    data.forEach(element => {
        filmMap[element.kinopoiskId] = element.rating
    });

    const result = filmList.map(entry => ({
      kinopoiskId: entry.kinopoiskId,
      nameRu: entry.nameRu,
      rating: filmMap[entry.kinopoiskId],
      posterUrl: entry.posterUrl
    }));

    return res.status(200).json(result)
}

const getUserFilmWithFavorite = async (req, res, next) => {

    const {userId} = req.params;

    const data = await UserFilms.findAll({where: {userId, favorite : true}})
    if (data.length === 0) res.status(200).json([]);

    const kinopoiskIdList = data.filter(el => el.kinopoiskId).map(el => el.kinopoiskId);

    const filmList = await Film.findAll({where: {kinopoiskId: kinopoiskIdList}})
    if (filmList.length === 0) res.status(200).json([]);

    return res.status(200).json(filmList)
}



const getUserFilms = async (req, res, next) => {

    const {userId} = req.params;

    const userChainList = await UserFilms.findAll({where: {userId}})

    if (userChainList.length === 0) res.status(200).json([]);

    const kinopoiskIdList = userChainList.map(el => el.kinopoiskId).filter(Boolean)
    const userFilmList = await Film.findAll({where: {kinopoiskId: kinopoiskIdList}})
    const foundListId = userFilmList.map(film => film.kinopoiskId)
    const missingFilmsId = kinopoiskIdList.filter(id => !foundListId.includes(id))
    const missingFilmsData = await Promise.all(missingFilmsId.map(id => getFilmOrFetch(id)))
    const fullUserFilmList = [...userFilmList, ...missingFilmsData]

    return res.status(200).json(fullUserFilmList);
}

module.exports = {updateFilmFlags, getUserFilms, getFilm, getUserFilmFlag, getUserFilmWithScores, getUserFilmWithFavorite};