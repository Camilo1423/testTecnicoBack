import { Usuarios } from "../models/users.model.js"
import bcrypt from 'bcryptjs'
import { generateJWT } from "../helpers/generateJWT.js"


const userPublicRegister = async (req, res) => {
    const {fullName, email, password, username} = req.body
    try {
        await Usuarios.create({fullName, role: 'user', email, password: await bcrypt.hash(password, 8), username})
        return res.json({success: true})
    } catch (error) {
        return res.json({error: error})
    }
}

const userPrivateRegister = async (req, res) => {
    const {role: roleUser} = req.datos
    if(roleUser === 'admin') {
        const {fullName, email, role, password, username} = req.body
        try {
            await Usuarios.create({fullName, role, email, password: await bcrypt.hash(password, 8), username})
            return res.json({success: true})
        } catch (error) {
            return res.json({error: error})
        }
    } else {
        return res.status(404).json({msg: 'no tienes autorizacion'})
    }
}

const userLogin = async (req, res) => {
    const usernameFront = req.body.username
    const resultUser = await Usuarios.findOne({username: usernameFront})
    if (resultUser) {
        const { _id, fullName, email, password, username, role } = resultUser
        const userData = { _id, fullName, email, username, role }
        const comparer = await bcrypt.compare(req.body.password, password)
        comparer ? res.json({response: true, ...userData, token: generateJWT(_id)}) : res.json({response: false})    
    } else {
        res.json({response: false, status: "Credential not found"})
    }
}

export {
    userLogin, userPublicRegister, userPrivateRegister
}