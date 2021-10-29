"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventarioIngredientesDelete = exports.inventarioIngredientesPut = exports.crearInventarioIngredientes = exports.obtenerInventarioIngredientes = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const invIngrediente_1 = require("../models/invIngrediente");
const obtenerInventarioIngredientes = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [inventarioIngredientes] = yield Promise.all([
        invIngrediente_1.InvIngrediente.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        inventarioIngredientes
    });
});
exports.obtenerInventarioIngredientes = obtenerInventarioIngredientes;
const crearInventarioIngredientes = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { nombre, imagen, stock, medida, precio, proveedor, descripcion } = req.body;
    const inventarioIngredientesDB = yield invIngrediente_1.InvIngrediente.findOne({ nombre });
    if (inventarioIngredientesDB) {
        return res.status(400).json({
            msg: `La inventarioIngredientes ${inventarioIngredientesDB.nombre}, ya existe`
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
    const inventarioIngredientes = new invIngrediente_1.InvIngrediente(data);
    yield inventarioIngredientes.save();
    res.status(201).json(inventarioIngredientes);
});
exports.crearInventarioIngredientes = crearInventarioIngredientes;
const inventarioIngredientesPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = tslib_1.__rest(_a, ["_id"]);
    const inventarioIngredientes = yield invIngrediente_1.InvIngrediente.findByIdAndUpdate(id, resto);
    res.status(400).json(inventarioIngredientes);
});
exports.inventarioIngredientesPut = inventarioIngredientesPut;
const inventarioIngredientesDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const inventarioIngredientes = yield invIngrediente_1.InvIngrediente.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        inventarioIngredientes
    });
});
exports.inventarioIngredientesDelete = inventarioIngredientesDelete;
//# sourceMappingURL=invIngredientes.js.map