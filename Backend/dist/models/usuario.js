"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        default: '1234'
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
        emun: ['SUPERADMIN', 'ADMIN', 'CHEF', 'COCINERO', 'MESERO', 'ALMACENISTA', 'CAJERO', 'REPARTIDOR']
    },
    estado: {
        type: Boolean,
        default: true
    },
});
UsuarioSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password } = _a, usuario = tslib_1.__rest(_a, ["__v", "password"]);
    return usuario;
};
UsuarioSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('Usuario', UsuarioSchema);
//# sourceMappingURL=usuario.js.map