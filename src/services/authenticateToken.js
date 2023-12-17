import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')

    if (token == null) { return res.sendStatus(401) }

    jwt.verify(token[1], process.env.SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Error' })

        req.user = user
        next()
    })
}

export default authenticateToken