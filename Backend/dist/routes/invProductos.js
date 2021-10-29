"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const invProductos_1 = require("../controllers/invProductos");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', invProductos_1.obtenerInventarioProductos);
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    express_validator_1.check('precio', 'El precio es obligatorio').not().isEmpty(),
    express_validator_1.check('descripción', 'La descripción es obligatoria').not().isEmpty(),
    express_validator_1.check('stock', 'El stock es obligatorio').not().isEmpty(),
    express_validator_1.check('medida', 'La medida es obligatoria').not().isEmpty(),
    express_validator_1.check('proveedor', 'El proveedor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], invProductos_1.crearInventarioProductos);
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], invProductos_1.inventarioProductosPut);
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], invProductos_1.inventarioProductosDelete);
exports.default = router;
//# sourceMappingURL=invProductos.js.map