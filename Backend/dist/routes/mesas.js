"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const mesas_1 = require("../controllers/mesas");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', mesas_1.obtenerMesas);
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('capacidadTotal', 'La capacidadTotal es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], mesas_1.crearMesa);
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], mesas_1.mesaPut);
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], mesas_1.mesaDelete);
exports.default = router;
//# sourceMappingURL=mesas.js.map