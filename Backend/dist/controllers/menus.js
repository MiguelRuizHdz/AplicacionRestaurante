"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuDelete = exports.menuPut = exports.crearMenu = exports.obtenerMenus = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const menu_1 = require("../models/menu");
const obtenerMenus = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const [menu] = yield Promise.all([
        menu_1.Menu.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        menu
    });
});
exports.obtenerMenus = obtenerMenus;
const crearMenu = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { nombre, imagen, precio, descripción, categoria, creadoPor } = req.body;
    const menuDB = yield menu_1.Menu.findOne({ nombre });
    if (menuDB) {
        return res.status(400).json({
            msg: `La menu ${menuDB.nombre}, ya existe`
        });
    }
    const data = {
        nombre,
        imagen,
        precio,
        descripción,
        categoria,
        creadoPor
    };
    const menu = new menu_1.Menu(data);
    yield menu.save();
    res.status(201).json(menu);
});
exports.crearMenu = crearMenu;
const menuPut = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = tslib_1.__rest(_a, ["_id"]);
    const menu = yield menu_1.Menu.findByIdAndUpdate(id, resto);
    res.status(400).json(menu);
});
exports.menuPut = menuPut;
const menuDelete = (req = express_1.request, res = express_1.response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const menu = yield menu_1.Menu.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        menu
    });
});
exports.menuDelete = menuDelete;
//# sourceMappingURL=menus.js.map