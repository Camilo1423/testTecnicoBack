import mongoose, {Schema, model} from "mongoose";


const entradaSchema = new Schema(
    {
        fecha: {
            type: String,
            require: true
        },
        cantidad: {
            type: String,
            require: true
        },
        bodegaAlmacen: {
            type: String,
            require: true
        },
        valorUnidad: {
            type: String,
            require: true
        },
        valorTotal: {
            type: String,
            require: true
        },
        producto: {
            type: Schema.Types.ObjectId,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Entradas = new model('entradas', entradaSchema)
