const { UserFilms } = require("../models");
const { Film } = require("../models");
const { Op } = require("sequelize");

const getFilmOrFetch = require("../services/getFilmorFetch");


const updateFilmFlags = async (req, res) => {

    const {kinopoiskId, isWatched, rating, favorite} = req.body;
    const userId = req.user.id;

    await UserFilms.update({isWatched, rating, favorite}, {where : {kinopoiskId, userId}});

    return res.status(201).json({ message: 'Фильм сохранён в список'});
}

const getFilm = async (req, res, next) => {

    const {kinopoiskId} = req.params;
    const film = await getFilmOrFetch(kinopoiskId);

    if (!film) {
        return next(new Error("Фильм не найден"))
    }

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
    if (!userFlags) {
        next(new Error("Какие-то проблемы с получением или инициализацией флажков юзера"))
    }

    return res.status(200).json(userFlags)
}

const getUserFilmWithScores = async (req, res, next) => {

    const {userId} = req.params;

    const data = await UserFilms.findAll({where: {userId, rating: { [Op.gt]: 0}}})

    if (!data) {
        return res.status(200).json({message: "У пользователя нет оценённых фильмов"})
    }

    const kinopoiskIdList = data.filter(el => el.kinopoiskId).map(el => el.kinopoiskId);

    const filmList = await Film.findAll({where: {kinopoiskId: kinopoiskIdList}})

    if (!filmList) {
        return next(new Error("Случилась какая-то ошибка с поиском фильмов по оценкам"))
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

    if (!data || data.length === 0) {
        return res.status(200).json({message: "У пользователя нет избранных фильмов"})
    }

    const kinopoiskIdList = data.filter(el => el.kinopoiskId).map(el => el.kinopoiskId);

    const filmList = await Film.findAll({where: {kinopoiskId: kinopoiskIdList}})

    if (!filmList) {
        return next(new Error("Случилась какая-то ошибка с поиском избранных фильмов"))
    }

    return res.status(200).json(filmList)
}



const getUserFilms = async (req, res, next) => {

    const {userId} = req.params;

    const userChainList = await UserFilms.findAll({where: {userId}})

    if (userChainList.length === 0) {
        return res.status(200).json({message: "У пользователя нет добавленных фильмов"})
    }

    const kinopoiskIdList = userChainList.map(el => el.kinopoiskId).filter(Boolean)
    const userFilmList = await Film.findAll({where: {kinopoiskId: kinopoiskIdList}})
    const foundListId = userFilmList.map(film => film.kinopoiskId)
    const missingFilmsId = kinopoiskIdList.filter(id => !foundListId.includes(id))
    const missingFilmsData = await Promise.all(missingFilmsId.map(id => getFilmOrFetch(id)))
    const fullUserFilmList = [...userFilmList, ...missingFilmsData]

    return res.status(200).json(fullUserFilmList);
}

module.exports = {updateFilmFlags, getUserFilms, getFilm, getUserFilmFlag, getUserFilmWithScores, getUserFilmWithFavorite};