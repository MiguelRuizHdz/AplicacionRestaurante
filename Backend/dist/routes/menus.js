"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const menus_1 = require("../controllers/menus");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', menus_1.obtenerMenus);
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    express_validator_1.check('precio', 'El precio es obligatorio').not().isEmpty(),
    express_validator_1.check('descripción', 'La descripción es obligatoria').not().isEmpty(),
    express_validator_1.check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], menus_1.crearMenu);
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], menus_1.menuPut);
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    validar_campos_1.validarCampos
], menus_1.menuDelete);
exports.default = router;
//# sourceMappingURL=menus.js.map