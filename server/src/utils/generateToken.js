const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET


const generateAccessToken = (userId) => {
    const payload = {id: userId}
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: "24h"})
}

module.exports = generateAccessToken;