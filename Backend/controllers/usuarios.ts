import { response, request } from 'express';
import bcrypt from 'bcrypt';

import { Usuario } from '../models/usuario';

export const usuariosGet = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true};

    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

export const usuariosPost = async(req = request, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.status(201).json({
        usuario
    });
};

export const usuariosPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(400).json(usuario);
};

export const usuariosDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.status(200).json({
        usuario
    });
};

