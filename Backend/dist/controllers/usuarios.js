"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const express_1 = require("express");
const usuariosGet = (req = express_1.request, res = express_1.response) => {
    const { limite = 10, desde = 0 } = req.query;
    res.status(200).json({
        msg: 'get API - controlador',
        limite
    });
};
exports.usuariosGet = usuariosGet;
const usuariosPost = (req = express_1.request, res = express_1.response) => {
    const { nombre, correo } = req.body;
    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        correo
    });
};
exports.usuariosPost = usuariosPost;
const usuariosPut = (req = express_1.request, res = express_1.response) => {
    const { id } = req.params;
    res.status(400).json({
        msg: 'put API - controlador',
        id
    });
};
exports.usuariosPut = usuariosPut;
const usuariosDelete = (req = express_1.request, res = express_1.response) => {
    res.status(200).json({
        msg: 'delete API - controlador'
    });
};
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.js.map