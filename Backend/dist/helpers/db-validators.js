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
Object.defineProperty(exports, "__esModule", { value: true });
exports.existeUsuarioPorId = exports.existeEmail = exports.esRolValido = void 0;
const rol_1 = require("../models/rol");
const usuario_1 = require("../models/usuario");
const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_1.Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const existeEmail = (correo = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const Emailexiste = yield usuario_1.Usuario.findOne({ correo });
    if (Emailexiste) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
});
exports.existeEmail = existeEmail;
const existeUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el usuario existe por id
    const existeUsuario = yield usuario_1.Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id}, no existe`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
//# sourceMappingURL=db-validators.js.map