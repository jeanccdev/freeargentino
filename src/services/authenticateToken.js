import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken

const authenticateToken = (req, res, next) => {
    let token = req.headers.authorization
    token.includes('Bearer') ? token = token.split(' ').pop() : null

    if (token == null) { return res.status(401).send(false) }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Error: ' + err })

        req.user = user
        next()
    })
}

export default authenticateToken