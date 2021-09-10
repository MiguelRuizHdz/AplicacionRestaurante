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
        required: [true, 'El rol es requerido'],
        emun: ['ADMIN', 'CHEF', 'COCINERO', 'MESERO', 'ALMACEN', 'CAJERO']
    },
    estado: {
        type: Boolean,
        default: true
    },

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

    compararPassword( password: string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', UsuarioSchema );


