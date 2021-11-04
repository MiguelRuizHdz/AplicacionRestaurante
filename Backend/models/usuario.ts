import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        ref: 'Role',
        required: [true, 'El rol es requerido'],
        emun: ['SUPERADMIN', 'ADMIN', 'CHEF', 'COCINERO', 'MESERO', 'ALMACENISTA', 'CAJERO', 'REPARTIDOR']
    },
    estado: {
        type: Boolean,
        default: true
    },
    // creadoPor: {
    //     type: String,
    //     // required: [true, 'El nombre del Admin Creador es requerido'],
    // },

});


UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

UsuarioSchema.method('compararPassword', function( this: any, password: string = '' ): boolean {

    if ( bcrypt.compareSync( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

})

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    rol: string;
    estado: boolean;
    // creadoPor: string;

    compararPassword( password: string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', UsuarioSchema );


