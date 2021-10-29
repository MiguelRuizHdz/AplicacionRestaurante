"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proveedorDelete = exports.proveedorPut = exports.crearProveedor = exports.obtenerProveedor = void 0;
const express_1 = require("express");
const provedor_1 = require("../models/provedor");
const obtenerProveedor = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.obtenerProveedor = obtenerProveedor;
const crearProveedor = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    // const nombre = req.body.nombre.toUpperCase();
    const { nombre, telefono } = req.body;
    const proveedorDB = yield provedor_1.Proveedor.findOne({ nombre });
    if (proveedorDB) {
        return res.status(400).json({
            msg: `El proveedor ${proveedorDB.nombre}, ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        nombre,
        telefono
    };
    const proveedor = new provedor_1.Proveedor(data);
    // Guardar DB
    yield proveedor.save();
    res.status(201).json(proveedor);
});
exports.crearProveedor = crearProveedor;
const proveedorPut = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = __rest(_a, ["_id"]);
    const proveedor = yield provedor_1.Proveedor.findByIdAndUpdate(id, resto);
    res.status(400).json(proveedor);
});
exports.proveedorPut = proveedorPut;
const proveedorDelete = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Fisicamente lo borramos
    // const receta = await Receta.findByIdAndDelete( id );
    const proveedor = yield provedor_1.Proveedor.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        proveedor
    });
});
exports.proveedorDelete = proveedorDelete;
//# sourceMappingURL=proveedor.js.map