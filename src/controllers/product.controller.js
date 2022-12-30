import { Producto, Entradas, Salidas } from "../models/index.js"
import fse from 'fs-extra'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


export const registerProduct = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        const {
            idProducto, 
            nombreProducto, 
            universoFilm,
            tipoProducto, 
            tipo, 
            tamano,
            color,
            sexo,
            marca,
            cantidadPaginas,
            generoComic,
            editorial,
            } = req.body
        const { path } = req.file
        try {
            const {url} = await cloudinary.uploader.upload(path, {quality: 50})
            await fse.unlink( path )
            await Producto.create({ 
                idProducto, 
                nombreProducto, 
                universoFilm, 
                tipoProducto, 
                imagenProducto: url, 
                tipo, 
                tamano, 
                color, 
                sexo,
                marca,
                cantidadPaginas,
                generoComic,
                editorial, })
            return res.status(200).json({ status: 200})
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    } else {
        return res.status(401).json({ status: 401 })
    }
}

export const getProducto = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        try {
            const resp = await Producto.find()
            return res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    } else {
        return res.status(401).json({ status: 401 })
    }
}

export const deleteProducto = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        try {
            await Entradas.deleteMany({producto: {$eq: req.params.id}})
            await Salidas.deleteMany({producto: {$eq: req.params.id}})
            await Producto.remove({_id: {$eq: req.params.id}})
            return res.status(200).json({ status: 200})
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    }else {
        return res.status(401).json({ status: 401 })
    }
}

export const getSingleProducto = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        try {
            const resp = await Producto.findOne({_id: {$eq: req.params.id}})
            return res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    } else {
        return res.status(401).json({ status: 401 })
    }
}

export const registerEntrada = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        const {fecha, cantidad, bodegaAlmacen, valorUnidad, valorTotal} = req.body
        try {
            await Entradas.create({ fecha, cantidad, bodegaAlmacen, valorUnidad, valorTotal, producto: req.params.id })
            return res.status(200).json({ status: 200})
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    } else {
        return res.status(401).json({ status: 401 })
    }
}

export const deleteEntrada = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        try {
            await Entradas.remove({_id: req.params.id })
            return res.status(200).json({ status: 200})
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    } else {
        return res.status(401).json({ status: 401 })
    }
}

export const registerSalida = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        const {fecha, cantidad, bodegaAlmacen, valorUnidad, valorTotal} = req.body
        try {
            await Salidas.create({ fecha, cantidad, bodegaAlmacen, valorUnidad, valorTotal, producto: req.params.id })
            return res.status(200).json({ status: 200})
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    } else {
        return res.status(401).json({ status: 401 })
    }
}

export const deleteSalida = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        try {
            await Salidas.remove({_id: req.params.id })
            return res.status(200).json({ status: 200})
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    } else {
        return res.status(401).json({ status: 401 })
    }
}

export const getEntradaSalida = async (req, res) => {
    const { role } = req.datos
    if(role == 'admin') {
        try {
            const entrada = await Entradas.find({producto: {$eq: req.params.id}})
            const salida = await Salidas.find({producto: {$eq: req.params.id}})
            return res.status(200).json({ status: 200, entradas: entrada, salidas: salida })
        } catch (error) {
            return res.status(500).json({ err: error })
        }
    } else {
        return res.status(401).json({ status: 401 })
    }
}