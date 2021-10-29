"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const usuarios_1 = require("../controllers/usuarios");
const db_validators_1 = require("../helpers/db-validators");
const router = express_1.Router();
router.get('/', usuarios_1.usuariosGet);
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    express_validator_1.check('correo', 'El correo no es válido').isEmail(),
    express_validator_1.check('correo').custom(db_validators_1.existeEmail),
    express_validator_1.check('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], usuarios_1.usuariosPost);
router.put('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuarioPorId),
    express_validator_1.check('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], usuarios_1.usuariosPut);
router.delete('/:id', [
    express_validator_1.check('id', 'No es un ID válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuarioPorId),
    validar_campos_1.validarCampos
], usuarios_1.usuariosDelete);
exports.default = router;
//# sourceMappingURL=usuarios.js.map