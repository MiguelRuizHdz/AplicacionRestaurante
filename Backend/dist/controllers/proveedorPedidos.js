"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidoAProveedorDelete = exports.pedidoAProveedorPut = exports.crearPedidoAProveedor = exports.obtenerPedidosAProveedor = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const proveedorPedido_1 = require("../models/proveedorPedido");
const obtenerPedidosAProveedor = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [pedidoAProveedor] = yield Promise.all([
        proveedorPedido_1.ProveedorPedido.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        pedidoAProveedor
    });
});
exports.obtenerPedidosAProveedor = obtenerPedidosAProveedor;
const crearPedidoAProveedor = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { costoTotal, proveedor, productos, fecha } = req.body;
    const data = {
        costoTotal,
        proveedor,
        productos,
        fecha,
    };
    const pedidoAProveedor = new proveedorPedido_1.ProveedorPedido(data);
    yield pedidoAProveedor.save();
    res.status(201).json(pedidoAProveedor);
});
exports.crearPedidoAProveedor = crearPedidoAProveedor;
const pedidoAProveedorPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = tslib_1.__rest(_a, ["_id"]);
    const pedidoAProveedor = yield proveedorPedido_1.ProveedorPedido.findByIdAndUpdate(id, resto);
    res.status(400).json(pedidoAProveedor);
});
exports.pedidoAProveedorPut = pedidoAProveedorPut;
const pedidoAProveedorDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pedidoAProveedor = yield proveedorPedido_1.ProveedorPedido.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        pedidoAProveedor
    });
});
exports.pedidoAProveedorDelete = pedidoAProveedorDelete;
//# sourceMappingURL=proveedorPedidos.js.map