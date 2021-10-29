"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const recetas_1 = require("../controllers/recetas");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
// Obtener recetas
router.get('/', recetas_1.obtenerRecetas);
// Crear receta
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], recetas_1.crearReceta);
// Modificar receta
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validar_campos_1.validarCampos
], recetas_1.recetasPut);
// Eliminar receta
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validar_campos_1.validarCampos
], recetas_1.recetasDelete);
exports.default = router;
//# sourceMappingURL=recetas%20copy.js.map