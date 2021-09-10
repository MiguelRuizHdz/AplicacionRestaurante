import { Rol } from '../models/rol';
import { Usuario } from '../models/usuario';


export const esRolValido = async(rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

export const existeEmail = async(correo = '') => {
    // Verificar si el correo existe
    const Emailexiste = await Usuario.findOne({ correo });
    if ( Emailexiste ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`)
    }
}

export const existeUsuarioPorId = async( id ) => {
    // Verificar si el usuario existe por id
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id }, no existe`)
    }
}
