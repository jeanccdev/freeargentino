import jwt from 'jsonwebtoken'

const generateToken = (tokenSign, secret) => {
    const token = jwt.sign(tokenSign, secret, {
        expiresIn: '24h'
    })

    return token
}


export default generateToken