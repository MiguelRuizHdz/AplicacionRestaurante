import { Router } from 'express';
import { check } from 'express-validator';

import { crearMesa, mesaDelete, mesaPut, obtenerMesas } from '../controllers/mesas';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener mesas
router.get('/', obtenerMesas )

// Crear mesa
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('capacidadTotal', 'La capacidadTotal es obligatoria').not().isEmpty(),
    validarCampos
], crearMesa );

// Modificar mesa
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], mesaPut);

// Eliminar mesa
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validarCampos
], mesaDelete);

export default router;