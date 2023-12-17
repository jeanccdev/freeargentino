import jwt from 'jsonwebtoken'

const checkToken = (token, secret) => {
    jwt.verify(token, secret, async (err, user) => {
        if (err) return err
    })

    return true
}

export default checkToken