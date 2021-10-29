"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mesaDelete = exports.mesaPut = exports.crearMesa = exports.obtenerMesas = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const mesa_1 = require("../models/mesa");
const obtenerMesas = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [mesa] = yield Promise.all([
        mesa_1.Mesa.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        mesa
    });
});
exports.obtenerMesas = obtenerMesas;
const crearMesa = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { nombre, capacidadTotal } = req.body;
    const mesaDB = yield mesa_1.Mesa.findOne({ nombre });
    if (mesaDB) {
        return res.status(400).json({
            msg: `La mesa ${mesaDB.nombre}, ya existe`
        });
    }
    const data = {
        nombre,
        capacidadTotal
    };
    const mesa = new mesa_1.Mesa(data);
    yield mesa.save();
    res.status(201).json(mesa);
});
exports.crearMesa = crearMesa;
const mesaPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = tslib_1.__rest(_a, ["_id"]);
    const mesa = yield mesa_1.Mesa.findByIdAndUpdate(id, resto);
    res.status(400).json(mesa);
});
exports.mesaPut = mesaPut;
const mesaDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const mesa = yield mesa_1.Mesa.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        mesa
    });
});
exports.mesaDelete = mesaDelete;
//# sourceMappingURL=mesas.js.map