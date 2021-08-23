const { response, request } = require('express');


const usuariosGet = (req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    res.status(200).json({
        msg: 'get API - controlador',
        limite
    })
}

const usuariosPost = (req, res) => {

    const { nombre, correo } = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        correo
    })
};

const usuariosPut = (req, res) => {

    const { id } = req.params;
    res.status(400).json({
        msg: 'put API - controlador',
        id
    })
};

const usuariosDelete = (req, res) => {
    res.status(200).json({
        msg: 'delete API - controlador'
    })
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}