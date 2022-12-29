// import for librery
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import morgan from 'morgan'
import multer from "multer";
import path from 'path'
import {fileURLToPath} from 'url';
import cors from 'cors';
import { dbConect } from './helpers/conectDB.js';


// import routes from mvt
import { userRoute, productRoute } from './routes/routes.js';

// instancias
const app = express();


// configuracion para que __dirname funcione como modulo
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// configuracion para subir las imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

// midelwere morgan
app.use(cors())
app.use(morgan('dev'))
app.use(multer({storage}).single('image')) // Configuración y .single() recibe como parametro el nombre del input que enviara o cargara la imagen
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// db conection
dbConect()


// endpoints creados pasar usar en el front
app.use('/user', userRoute)
app.use('/producto', productRoute)


//www.ejemplo.com/user/login


export { app }