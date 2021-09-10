"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../models/usuario");
const usuariosGet = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
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
const usuariosPost = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new usuario_1.Usuario({ nombre, correo, password, rol });
    // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo });
    // if ( existeEmail ) {
    //     return res.status(400).json({
    //         msg: 'El correo ya está registrado'
    //     });
    // }
    // Encriptar la contraseña
    const salt = bcrypt_1.default.genSaltSync();
    usuario.password = bcrypt_1.default.hashSync(password, salt);
    // Guardar en BD
    yield usuario.save();
    res.status(201).json({
        usuario
    });
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, correo } = _a, resto = __rest(_a, ["_id", "password", "correo"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcrypt_1.default.genSaltSync();
        resto.password = bcrypt_1.default.hashSync(password, salt);
    }
    const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, resto);
    res.status(400).json(usuario);
});
exports.usuariosPut = usuariosPut;
const usuariosDelete = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        usuario
    });
});
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.js.map