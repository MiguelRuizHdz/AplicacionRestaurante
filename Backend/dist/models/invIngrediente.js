"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvIngrediente = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const IngredienteSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del ingrediente es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'El imagen del ingrediente es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'La cantidad de stock del ingrediente es obligatorio']
    },
    medida: {
        type: String,
        required: [true, 'La medida del ingrediente es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'Precio del ingrediente es obligatorio']
    },
    proveedor: {
        type: String,
        required: [true, 'Nombre del proveedor ingrediente es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del ingrediente es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});
IngredienteSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.InvIngrediente = mongoose_1.model('InventarioIngrediente', IngredienteSchema);
//# sourceMappingURL=invIngrediente.js.map