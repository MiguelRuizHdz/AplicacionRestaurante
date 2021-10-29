"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proveedorDelete = exports.proveedorPut = exports.crearProveedor = exports.obtenerProveedores = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const provedor_1 = require("../models/provedor");
const obtenerProveedores = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [proveedor] = yield Promise.all([
        provedor_1.Proveedor.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        proveedor
    });
});
exports.obtenerProveedores = obtenerProveedores;
const crearProveedor = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { nombre, telefono, correo, direccion, rfc } = req.body;
    const proveedorDB = yield provedor_1.Proveedor.findOne({ nombre });
    if (proveedorDB) {
        return res.status(400).json({
            msg: `El proveedor ${proveedorDB.nombre}, ya existe`
        });
    }
    const data = {
        nombre,
        telefono,
        correo,
        direccion,
        rfc
    };
    const proveedor = new provedor_1.Proveedor(data);
    yield proveedor.save();
    res.status(201).json(proveedor);
});
exports.crearProveedor = crearProveedor;
const proveedorPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = tslib_1.__rest(_a, ["_id"]);
    const proveedor = yield provedor_1.Proveedor.findByIdAndUpdate(id, resto);
    res.status(400).json(proveedor);
});
exports.proveedorPut = proveedorPut;
const proveedorDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const proveedor = yield provedor_1.Proveedor.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        proveedor
    });
});
exports.proveedorDelete = proveedorDelete;
//# sourceMappingURL=proveedores.js.map