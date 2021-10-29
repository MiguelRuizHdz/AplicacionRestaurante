import { Router } from 'express';
import { check } from 'express-validator';

import { crearProveedor, obtenerProveedores, proveedorPut, proveedorDelete } from '../controllers/proveedores';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener proveedores
router.get('/', obtenerProveedores )

// Crear proveedor
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    validarCampos
], crearProveedor );

// Modificar proveedor
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], proveedorPut);

// Eliminar proveedor
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validarCampos
], proveedorDelete);

export default router;