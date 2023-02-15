const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

const generateHash = (payload) => {
    return bcrypt.hashSync(payload, 8)
}

const verifyHash = (payload, hash) => {
    return bcrypt.compareSync(payload, hash)
}

module.exports = {
    generateToken,
    verifyToken,
    generateHash,
    verifyHash
}