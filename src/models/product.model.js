import {Schema, model} from "mongoose";


const productSchema = new Schema(
    {
        idProducto: {
            type: String,
            require: true
        },
        universoFilm: {
            type: String,
            require: true
        },
        nombreProducto: {
            type: String,
            require: true
        },
        tipoProducto: {
            type: String,
            require: true
        }, 
        imagenProducto: {
            type: String,
            require: true
        },
        tamano: {
            type: String,
            require: false,
            default: '',
        },
        color: {
            type: String,
            require: false,
            default: '',
        },
        sexo: {
            type: String,
            require: false,
            default: '',
        },
        marca: {
            type: String,
            require: false,
            default: '',
        },
        cantidadPaginas: {
            type: Number,
            require: false,
            default: '',
        },
        generoComic: {
            type: String,
            require: false,
            default: '',
        },
        editorial: {
            type: String,
            require: false,
            default: '',
        },
        tipo: {
            type: String,
            require: false,
            default: '',
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Producto = new model('productos', productSchema)
