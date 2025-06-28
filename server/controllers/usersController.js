const {User} = require('../models/index');
const createError = require('http-errors');

const getUsersList = async (req, res, next) => {

    const {count, rows} = await User.findAndCountAll();

    const usersList = rows.map(user => ({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        gender: user.gender,
        status: user.status,
    }))

    const message = usersList.length === 0 
    ? 'Список пользователей пуст' 
    : 'Список пользователей успешно отправлен';

    return res.status(200).json({usersList, countUsers : count, message})
}

const getUserData = async (req, res, next) => {

    const {userId} = req.params;

    const data = await User.findOne({where : {id : userId},
        attributes: ['id', 'username', 'avatar', 'gender', 'status']
    })

    if (!data) {
        return next(createError(404, "Какие-то ошибки с выдачей данных юзера"))
    }

    res.status(200).json(data)

}


module.exports = {getUsersList, getUserData}