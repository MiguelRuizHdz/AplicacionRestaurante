"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = express_1.Router();
router.get('/', usuarios_1.usuariosGet);
router.post('/', usuarios_1.usuariosPost);
router.put('/:id', usuarios_1.usuariosPut);
router.delete('/', usuarios_1.usuariosDelete);
exports.default = router;
//# sourceMappingURL=usuarios.js.map