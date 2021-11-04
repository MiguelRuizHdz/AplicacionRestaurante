"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientePedido = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const ClientePedidoSchema = new mongoose_1.Schema({
    tipoPedido: {
        type: Number,
        required: [true, 'El tipo del pedido del cliente es obligatorio'],
        emun: [1, 2, 3]
    },
    mesa: {
        type: String,
    },
    numeroComensales: {
        type: Number,
    },
    direccion: {
        type: String,
    },
    notas: {
        type: String,
    },
    productos: [{
            nombre: {
                type: String,
                required: [true, 'El nombre del producto del pedido del cliente es obligatorio']
            },
            precio: {
                type: Number,
                required: [true, 'El precio del producto del pedido del cliente es obligatorio']
            },
            cantidad: {
                type: Number,
                required: [true, 'La cantidad del producto del pedido del cliente es obligatorio']
            },
        }],
    fecha: {
        type: Date,
        required: [true, 'La fecha del pedido del cliente es obligatorio']
    },
    total: {
        type: Number,
        required: [true, 'El total del pedido del cliente es obligatorio']
    },
    estado: {
        type: Number,
        default: 0
    },
    creadoPor: {
        type: String,
        required: [true, 'El nombre del Creador del pedido es requerido'],
    },
    entregadoPor: {
        type: String,
    },
});
ClientePedidoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.ClientePedido = mongoose_1.model('ClientePedido', ClientePedidoSchema);
//# sourceMappingURL=clientePedido.js.map