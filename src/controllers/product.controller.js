import { Producto } from "../models/product.model.js"
import fse from 'fs-extra'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


export const registerProduct = async (req, res) => {
    const {
        idProducto, 
        nombreProducto, 
        universoFilm,
        tipoProducto, 
        tipo, 
        tamano,
        color
        } = req.body
    const { path } = req.file
    try {
        const {url} = await cloudinary.uploader.upload(path, {quality: 50})
        await fse.unlink( path )
        await Producto.create({ idProducto, nombreProducto, universoFilm, tipoProducto, imagenProducto: url, tipo, tamano, color })
        return res.status(200).json({ status: 200})
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}