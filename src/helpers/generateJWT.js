import jwt from "jsonwebtoken";
import dotenv from 'dotenv' //configuracion de variables de entorno
dotenv.config()

const generateJWT= (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: "1d"
    })
}

export { generateJWT }

//By @TauroDev