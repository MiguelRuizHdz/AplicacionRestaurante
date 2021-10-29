"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearRol = exports.obtenerRoles = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const rol_1 = require("../models/rol");
const obtenerRoles = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [roles] = yield Promise.all([
        rol_1.Rol.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        roles
    });
});
exports.obtenerRoles = obtenerRoles;
const crearRol = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    const rolDB = yield rol_1.Rol.findOne({ nombre });
    if (rolDB) {
        return res.status(400).json({
            msg: `El rol ${rolDB.nombre}, ya existe`
        });
    }
    const data = {
        nombre
    };
    const rol = new rol_1.Rol(data);
    yield rol.save();
    res.status(201).json(rol);
});
exports.crearRol = crearRol;
//# sourceMappingURL=roles.js.map