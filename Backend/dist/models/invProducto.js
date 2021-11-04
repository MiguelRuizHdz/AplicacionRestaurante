"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvProducto = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const ProductoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'El imagen del producto es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio']
    },
    descripción: {
        type: String,
        required: [true, 'La descripción del producto es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'La stock del producto es obligatorio']
    },
    medida: {
        type: String,
        required: [true, 'La medida del ingrediente es obligatorio']
    },
    proveedor: {
        type: Number,
        ref: 'Proveedore',
        required: [true, 'El nombre del proveedor del producto es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});
ProductoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.InvProducto = mongoose_1.model('InventarioProducto', ProductoSchema);
//# sourceMappingURL=invProducto.js.map