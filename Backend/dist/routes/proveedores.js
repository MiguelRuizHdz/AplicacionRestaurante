"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const proveedores_1 = require("../controllers/proveedores");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', proveedores_1.obtenerProveedores);
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], proveedores_1.crearProveedor);
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], proveedores_1.proveedorPut);
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], proveedores_1.proveedorDelete);
exports.default = router;
//# sourceMappingURL=proveedores.js.map