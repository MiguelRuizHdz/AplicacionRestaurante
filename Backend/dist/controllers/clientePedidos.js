"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientePedidoDelete = exports.clientePedidoPut = exports.crearClientePedido = exports.obtenerClientePedidos = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const clientePedido_1 = require("../models/clientePedido");
const obtenerClientePedidos = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [clientePedido] = yield Promise.all([
        clientePedido_1.ClientePedido.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        clientePedido
    });
});
exports.obtenerClientePedidos = obtenerClientePedidos;
const crearClientePedido = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { tipoPedido, mesa, numeroComensales, direccion, notas, productos, fecha, total, creadoPor } = req.body;
    const data = {
        tipoPedido,
        mesa,
        numeroComensales,
        direccion,
        notas,
        productos,
        fecha,
        total,
        creadoPor
    };
    const clientePedido = new clientePedido_1.ClientePedido(data);
    yield clientePedido.save();
    res.status(201).json(clientePedido);
});
exports.crearClientePedido = crearClientePedido;
const clientePedidoPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = tslib_1.__rest(_a, ["_id"]);
    const clientePedido = yield clientePedido_1.ClientePedido.findByIdAndUpdate(id, resto);
    res.status(400).json(clientePedido);
});
exports.clientePedidoPut = clientePedidoPut;
const clientePedidoDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const clientePedido = yield clientePedido_1.ClientePedido.findByIdAndUpdate(id, { estado: 11 });
    res.status(200).json({
        clientePedido
    });
});
exports.clientePedidoDelete = clientePedidoDelete;
//# sourceMappingURL=clientePedidos.js.map