"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const MenuSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del platillo es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'El imagen del platillo es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del platillo es obligatorio']
    },
    descripción: {
        type: String,
        required: [true, 'La descripción del platillo es obligatorio']
    },
    categoria: {
        type: String,
        required: [true, 'La categoria del platillo es obligatorio'],
        emun: ['PLATILLO', 'POSTRE', 'BEBIDA']
    },
    estado: {
        type: Boolean,
        default: true
    },
    creadoPor: {
        type: String,
    }
});
MenuSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.Menu = mongoose_1.model('Menu', MenuSchema);
//# sourceMappingURL=menu.js.map