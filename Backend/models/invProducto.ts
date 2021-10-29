import { Schema, Document, model } from 'mongoose';

const ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'El imagen del producto es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio']
    },
    descripción: {
        type: String,
        required: [true, 'La descripción del producto es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'La stock del producto es obligatorio']
    },
    medida: {
        type: String,
        required: [true, 'La medida del ingrediente es obligatorio']
    },
    proveedor: {
        type: Number,
        required: [true, 'El nombre del proveedor del producto es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

ProductoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface IProducto extends Document {
    nombre: string;
    imagen: string;
    precio: number;
    descripción: string;
    stock: number;
    medida: string;
    proveedor: string;
    estado: boolean;
}

export const InvProducto = model<IProducto>( 'InventarioProducto', ProductoSchema );
