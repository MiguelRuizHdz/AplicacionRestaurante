"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mesa = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const MesaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la mesa es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    numeroComensales: {
        type: Number,
        default: 0
    },
    capacidadTotal: {
        type: Number,
        required: [true, 'La capacidad total de la mesa es obligatoria']
    }
});
MesaSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.Mesa = mongoose_1.model('Mesa', MesaSchema);
//# sourceMappingURL=mesa.js.map