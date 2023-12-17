import jwt from 'jsonwebtoken'

const generateToken = (tokenSign, secret, expires) => {
    const token = jwt.sign(tokenSign, secret, {
        expiresIn: Number(expires)
    })

    return token
}


export default generateToken