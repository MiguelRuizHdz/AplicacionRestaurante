"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const usuario_1 = require("../models/usuario");
const usuariosGet = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        usuario_1.Usuario.countDocuments(query),
        usuario_1.Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        usuarios
    });
});
exports.usuariosGet = usuariosGet;
const usuariosPost = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new usuario_1.Usuario({ nombre, correo, password, rol });
    const existeEmail = yield usuario_1.Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }
    const salt = bcrypt_1.default.genSaltSync();
    usuario.password = bcrypt_1.default.hashSync(password, salt);
    yield usuario.save();
    res.status(201).json({
        usuario
    });
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, correo } = _a, resto = tslib_1.__rest(_a, ["_id", "password", "correo"]);
    if (password) {
        const salt = bcrypt_1.default.genSaltSync();
        resto.password = bcrypt_1.default.hashSync(password, salt);
    }
    const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, resto);
    res.status(400).json(usuario);
});
exports.usuariosPut = usuariosPut;
const usuariosDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        usuario
    });
});
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.js.map