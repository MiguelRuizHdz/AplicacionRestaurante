import { Schema, Document, model } from 'mongoose';

const RecetaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la receta es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'El imagen de la receta es obligatorio']
    },
    ingredientes: [{
        nombre: {
            type: String,
            required: [true, 'El nombre del ingrediente es obligatorio']
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad del ingrediente es obligatorio']
        },
        medida: {
            type: String,
            required: [true, 'La medida del ingrediente es obligatorio']
        },
    }],
    // instrucciones: {
    //     type: String,
    //     required: [true, 'Las instrucciones de la receta es obligatorio']
    // },
    descripcion: {
        type: String,
        required: [true, 'La descripción / instrucciones de la receta es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

RecetaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface Ingrediente {
    nombre: string;
    cantidad: number;
    medida: string;
}

interface IReceta extends Document {
    nombre: number;
    imagen: string;
    ingredientes: Ingrediente[];
    // instrucciones: string;
    descripcion: string;
    estado: boolean;
}

export const Receta = model<IReceta>( 'Receta', RecetaSchema );
