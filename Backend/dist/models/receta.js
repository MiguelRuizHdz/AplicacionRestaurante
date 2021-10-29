"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receta = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const RecetaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la receta es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'El imagen de la receta es obligatorio']
    },
    ingredientes: [{
            nombre: {
                type: String,
                required: [true, 'El nombre del ingrediente es obligatorio']
            },
            cantidad: {
                type: Number,
                required: [true, 'La cantidad del ingrediente es obligatorio']
            },
            medida: {
                type: String,
                required: [true, 'La medida del ingrediente es obligatorio']
            },
        }],
    descripcion: {
        type: String,
        required: [true, 'La descripción / instrucciones de la receta es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});
RecetaSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.Receta = mongoose_1.model('Receta', RecetaSchema);
//# sourceMappingURL=receta.js.map