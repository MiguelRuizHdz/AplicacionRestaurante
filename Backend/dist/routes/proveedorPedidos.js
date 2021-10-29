"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const proveedorPedidos_1 = require("../controllers/proveedorPedidos");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', proveedorPedidos_1.obtenerPedidosAProveedor);
router.post('/', [
    express_validator_1.check('proveedor', 'El proveedor es obligatorio').not().isEmpty(),
    express_validator_1.check('productos', 'Los productos son obligatorios').not().isEmpty(),
    validar_campos_1.validarCampos
], proveedorPedidos_1.crearPedidoAProveedor);
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], proveedorPedidos_1.pedidoAProveedorPut);
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], proveedorPedidos_1.pedidoAProveedorDelete);
exports.default = router;
//# sourceMappingURL=proveedorPedidos.js.map