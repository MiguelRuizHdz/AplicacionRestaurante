import { response, request } from 'express';


export const usuariosGet = (req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    res.status(200).json({
        msg: 'get API - controlador',
        limite
    })
}

export const usuariosPost = (req = request, res = response ) => {

    const { nombre, correo } = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        correo
    })
};

export const usuariosPut = (req = request, res = response ) => {

    const { id } = req.params;
    res.status(400).json({
        msg: 'put API - controlador',
        id
    })
};

export const usuariosDelete = (req = request, res = response ) => {
    res.status(200).json({
        msg: 'delete API - controlador'
    })
};

