import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' //configuracion de variables de entorno
dotenv.config()
import { Usuarios } from '../models/users.model.js'

const checkAuth = async (req, res, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token = req.headers.authorization.split(' ')[1]
            const {id} = jwt.verify(token, process.env.SECRET_KEY)
            console.log(id)
            const usuario = await Usuarios.findOne({_id: {
                $eq: id
            }}).select('-password -createdAt -updatedAt -email -fullName') 
            console.log(usuario)
            req.datos = usuario
            next()
        } catch (error) {
            return res.status(401).json({status: 'Token vencido'})
        }
    }else {
        return res.status(401).json({status: 'Token no valido'})
    }
}

export { checkAuth }

//By @TauroDev
