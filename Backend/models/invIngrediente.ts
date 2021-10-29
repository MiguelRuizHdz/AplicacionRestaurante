import { Schema, Document, model } from 'mongoose';

const IngredienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del ingrediente es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'El imagen del ingrediente es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'La cantidad de stock del ingrediente es obligatorio']
    },
    medida: {
        type: String,
        required: [true, 'La medida del ingrediente es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'Precio del ingrediente es obligatorio']
    },
    proveedor: {
        type: String,
        required: [true, 'Nombre del proveedor ingrediente es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del ingrediente es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

IngredienteSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface IIngrediente extends Document {
    nombre: string;
    imagen: string;
    stock: number;
    medida: string;
    precio: number;
    proveedor: string;
    descripcion: string;
    estado: boolean;
}

export const InvIngrediente = model<IIngrediente>( 'InventarioIngrediente', IngredienteSchema );
