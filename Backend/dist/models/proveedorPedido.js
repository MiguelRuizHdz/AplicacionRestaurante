"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorPedido = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const ProveedorPedidoSchema = new mongoose_1.Schema({
    costoTotal: {
        type: Number,
        required: [true, 'El total del pedido al cliente es obligatorio']
    },
    proveedor: {
        type: String,
        ref: 'Proveedore',
        required: [true, 'El total del pedido al cliente es obligatorio']
    },
    productos: [{
            nombre: {
                type: String,
                required: [true, 'El nombre del producto del pedido al proveedor es obligatorio']
            },
            precioUnitario: {
                type: Number,
                required: [true, 'El precio unitario del producto del pedido al proveedor es obligatorio']
            },
            cantidad: {
                type: Number,
                required: [true, 'La cantidad del producto del pedido al proveedor es obligatorio']
            },
        }],
    fecha: {
        type: Date,
        required: [true, 'La fecha del pedido al proveedor es obligatorio']
    },
    estado: {
        type: Boolean,
        default: 0
    },
});
ProveedorPedidoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.ProveedorPedido = mongoose_1.model('ProveedorPedido', ProveedorPedidoSchema);
//# sourceMappingURL=proveedorPedido.js.map