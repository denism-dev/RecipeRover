const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.userToken 
        const decodedToken = jwt.verify(token, SECRET)
        req.userId = decodedToken._id
        next()
    } catch (error) {
        res.status(401).json({ message: 'You need to be logged in to do this' })
    }
}

module.exports = authenticate


