const {User} = require('../models/index');
const createError = require('http-errors');


const getUsersList = async (req, res, next) => {

    const {count, rows} = await User.findAndCountAll();

     if (!rows || rows.length === 0) {
        return next(createError(500, "Ошибка с поиском списка пользователей"))
    }

    if (rows.length === 0 ) {
        return res.status(200).json({usersList: [], countUsers : 0, message: 'Список пользователей пуст'})
    }

    const usersList = rows.map(user => ({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        status: user.status
    }))


    return res.status(200).json({usersList, countUsers : count, message: 'Список пользователей успешно отправлен'})
}

const getUserData = async (req, res, next) => {

    const {userId} = req.params;

    const data = await User.findOne({where : {id : userId},
        attributes: ['id', 'username', 'avatar', 'gender', 'status']
    })

    if (!data) {
        return next(createError(500, "Какие-то ошибки с выдачей данных юзера"))
    }

    res.status(200).json(data)

}

const patchUserStatus = async (req, res, next) => {

    const userId = req.user.id;
    const {status} = req.body

    const data = await User.update({status}, {where : {id : userId}})

    if (!data) {
        return next(createError(500, "Произошли проблемы с обновлением статуса"))
    }

    res.status(200).json({message: "Статус обновился"})

}

module.exports = {getUsersList, getUserData, patchUserStatus}