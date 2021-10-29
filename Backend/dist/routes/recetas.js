"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const recetas_1 = require("../controllers/recetas");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', recetas_1.obtenerRecetas);
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    express_validator_1.check('ingredientes', 'Los ingredientes son obligatorios').not().isEmpty(),
    express_validator_1.check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], recetas_1.crearReceta);
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    express_validator_1.check('ingredientes', 'Los ingredientes son obligatorios').not().isEmpty(),
    express_validator_1.check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], recetas_1.recetasPut);
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], recetas_1.recetasDelete);
exports.default = router;
//# sourceMappingURL=recetas.js.map