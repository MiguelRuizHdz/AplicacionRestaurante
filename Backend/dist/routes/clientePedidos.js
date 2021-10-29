"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const clientePedidos_1 = require("../controllers/clientePedidos");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', clientePedidos_1.obtenerClientePedidos);
router.post('/', [
    express_validator_1.check('tipoPedido', 'El tipo de pedido es obligatorio').not().isEmpty(),
    express_validator_1.check('productos', 'Los productos son obligatorios').not().isEmpty(),
    validar_campos_1.validarCampos
], clientePedidos_1.crearClientePedido);
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], clientePedidos_1.clientePedidoPut);
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], clientePedidos_1.clientePedidoDelete);
exports.default = router;
//# sourceMappingURL=clientePedidos.js.map