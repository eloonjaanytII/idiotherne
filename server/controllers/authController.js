const {User} = require('../models/index');
const bcrypt = require("bcryptjs");
const generateAccessToken = require('../utils/generateToken');
const createError = require('http-errors');

const createUser = async (req, res, next) => {

    const {email, password, username, gender, avatar} = req.validated;

    const candidateUsername = await User.findOne({where: {username}} )
    const candidateEmail = await User.findOne({where: {email}} )

    if (candidateUsername || candidateEmail) {
        return next(createError(409,  "Пользователь уже существует"));
    }

    const salt = bcrypt.genSaltSync(7);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
        email,
        password: hashPassword,
        username,
        gender,
        avatar
    });

    const token = generateAccessToken(user.id);
    return res.status(201).json({ token, userId: user.id });
}

const getUser = async (req, res, next) => {

    const {username, password} = req.validated;
    const user = await User.findOne({where: {username}});

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword || !user) {
        return next(new Error(JSON.stringify({status: 400, message: 'Вы ввели некорректный юзернейм или пароль'})))
    }

    const token = generateAccessToken(user.id)  
    return res.json({ token, userId: user.id })

}

const getUserId = async (req, res, next) => {

    const user = await User.findByPk(req.user.id);

    if (!user) {
        return next(new Error(JSON.stringify({status: 404, message: 'Пользователь не найден'})))
    }

    return res.json({userId: user.id})
}


module.exports = {createUser, getUser, getUserId};