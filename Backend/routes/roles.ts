import { Router } from 'express';
import { check } from 'express-validator';

import { crearRol, obtenerRoles } from '../controllers/roles';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener roles
router.get('/', obtenerRoles )

// Crear rol
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearRol );

export default router;