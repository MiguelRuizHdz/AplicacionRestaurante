"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventarioProductosDelete = exports.inventarioProductosPut = exports.crearInventarioProductos = exports.obtenerInventarioProductos = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const invProducto_1 = require("../models/invProducto");
const obtenerInventarioProductos = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [inventarioProductos] = yield Promise.all([
        invProducto_1.InvProducto.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        inventarioProductos
    });
});
exports.obtenerInventarioProductos = obtenerInventarioProductos;
const crearInventarioProductos = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { nombre, imagen, stock, medida, precio, proveedor, descripcion } = req.body;
    const inventarioProductosDB = yield invProducto_1.InvProducto.findOne({ nombre });
    if (inventarioProductosDB) {
        return res.status(400).json({
            msg: `La inventarioProductos ${inventarioProductosDB.nombre}, ya existe`
        });
    }
    const data = {
        nombre,
        imagen,
        stock,
        medida,
        precio,
        proveedor,
        descripcion
    };
    const inventarioProductos = new invProducto_1.InvProducto(data);
    yield inventarioProductos.save();
    res.status(201).json(inventarioProductos);
});
exports.crearInventarioProductos = crearInventarioProductos;
const inventarioProductosPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = tslib_1.__rest(_a, ["_id"]);
    const inventarioProductos = yield invProducto_1.InvProducto.findByIdAndUpdate(id, resto);
    res.status(400).json(inventarioProductos);
});
exports.inventarioProductosPut = inventarioProductosPut;
const inventarioProductosDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const inventarioProductos = yield invProducto_1.InvProducto.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        inventarioProductos
    });
});
exports.inventarioProductosDelete = inventarioProductosDelete;
//# sourceMappingURL=invProductos.js.map