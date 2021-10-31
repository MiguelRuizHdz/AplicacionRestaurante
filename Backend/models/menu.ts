import { Schema, Document, model } from 'mongoose';

const MenuSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del platillo es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'El imagen del platillo es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del platillo es obligatorio']
    },
    descripción: {
        type: String,
        required: [true, 'La descripción del platillo es obligatorio']
    },
    categoria: {
        type: String,
        required: [true, 'La categoria del platillo es obligatorio'],
        emun: ['PLATILLO', 'POSTRE', 'BEBIDA']

    },
    estado: {
        type: Boolean,
        default: true
    },
    // creadoPor: {
    //     type: String,
    //     // required: [true, 'El nombre del Admin Creador es requerido'],
    // }
});

MenuSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface IMenu extends Document {
    nombre: string;
    imagen: string;
    precio: number;
    descripción: string;
    categoria: string;
    estado: boolean;
    // creadoPor: string;
}

export const Menu = model<IMenu>( 'Menu', MenuSchema );
