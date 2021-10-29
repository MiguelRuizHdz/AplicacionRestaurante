"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const ProveedorSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del proveedor es obligatorio']
    },
    telefono: {
        type: Number,
        required: [true, 'El teléfono del proveedor es obligatorio']
    },
    correo: {
        type: Number,
    },
    direccion: {
        type: String,
    },
    rfc: {
        type: String,
    }
});
ProveedorSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.Proveedor = mongoose_1.model('Proveedore', ProveedorSchema);
//# sourceMappingURL=provedor.js.map