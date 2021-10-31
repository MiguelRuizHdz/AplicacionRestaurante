import { Schema, Document, model } from 'mongoose';

const ProveedorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del proveedor es obligatorio'],
        unique: true
    },
    telefono: {
        type: Number,
        required: [true, 'El teléfono del proveedor es obligatorio']
    },
    correo: {
        type: Number,
        required: [true, 'El correo del proveedor es obligatorio'],
        unique: true
    },
    direccion: {
        type: String,
        required: [true, 'La dirección del proveedor es obligatorio']
    },
    rfc: {
        type: String,
        required: [true, 'El RFC del proveedor es obligatorio'],
        unique: true
    }
});

ProveedorSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface IProveedor extends Document {
    nombre: string;
    telefono: number;
    correo: string;
    direccion: string;
    rfc: string;
}

export const Proveedor = model<IProveedor>( 'Proveedore', ProveedorSchema );
