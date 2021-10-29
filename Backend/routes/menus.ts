import { Router } from 'express';
import { check } from 'express-validator';

import { crearMenu, menuDelete, menuPut, obtenerMenus } from '../controllers/menus';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener menus
router.get('/', obtenerMenus )

// Crear menu
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripción', 'La descripción es obligatoria').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
], crearMenu );

// Modificar menu
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], menuPut);

// Eliminar menu
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validarCampos
], menuDelete);

export default router;