"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recetasDelete = exports.recetasPut = exports.crearReceta = exports.obtenerRecetas = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const receta_1 = require("../models/receta");
const obtenerRecetas = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [recetas] = yield Promise.all([
        receta_1.Receta.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        recetas
    });
});
exports.obtenerRecetas = obtenerRecetas;
const crearReceta = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    const { imagen, ingredientes, descripción } = req.body;
    const recetaDB = yield receta_1.Receta.findOne({ nombre });
    if (recetaDB) {
        return res.status(400).json({
            msg: `La receta ${recetaDB.nombre}, ya existe`
        });
    }
    const data = {
        nombre,
        imagen,
        ingredientes,
        descripción,
    };
    const receta = new receta_1.Receta(data);
    yield receta.save();
    res.status(201).json(receta);
});
exports.crearReceta = crearReceta;
const recetasPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = tslib_1.__rest(_a, ["_id"]);
    const receta = yield receta_1.Receta.findByIdAndUpdate(id, resto);
    res.status(400).json(receta);
});
exports.recetasPut = recetasPut;
const recetasDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const receta = yield receta_1.Receta.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        receta
    });
});
exports.recetasDelete = recetasDelete;
//# sourceMappingURL=recetas.js.map