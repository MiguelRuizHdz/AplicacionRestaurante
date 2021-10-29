"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existeUsuarioPorId = exports.existeEmail = exports.esRolValido = void 0;
const tslib_1 = require("tslib");
const rol_1 = require("../models/rol");
const usuario_1 = require("../models/usuario");
const esRolValido = (rol = '') => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_1.Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const existeEmail = (correo = '') => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Emailexiste = yield usuario_1.Usuario.findOne({ correo });
    if (Emailexiste) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
});
exports.existeEmail = existeEmail;
const existeUsuarioPorId = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield usuario_1.Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id}, no existe`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
//# sourceMappingURL=db-validators.js.map