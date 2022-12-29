import { Producto } from "../models/product.model.js"
import fse from 'fs-extra'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const createAccesorios = async (
    idProducto, 
    nombreProducto, 
    universoFilm, 
    tipoProducto, 
    imagen, 
    tipo, 
    tamano,
    color) => {    
    try {
        const {url, public_id} = await cloudinary.uploader.upload(imagen, {quality: 50})
        await fse.unlink( imagen )
        const userData = { idProducto, nombreProducto, universoFilm, tipoProducto, imagenProducto: url, tipo, tamano, color }
        await Producto.create({...userData})
        return true
    } catch {
        return false
    }
}