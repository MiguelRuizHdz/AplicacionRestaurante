"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const roles_1 = require("../controllers/roles");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
// Obtener roles
router.get('/', roles_1.obtenerRoles);
// Crear rol
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], roles_1.crearRol);
exports.default = router;
//# sourceMappingURL=roles.js.map