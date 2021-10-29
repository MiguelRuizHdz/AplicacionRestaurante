import { Router } from 'express';
import { check } from 'express-validator';

import { crearInventarioProductos, inventarioProductosDelete, inventarioProductosPut, obtenerInventarioProductos } from '../controllers/invProductos';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener Inventario de productos
router.get('/', obtenerInventarioProductos )

// Crear Inventario de producto
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripción', 'La descripción es obligatoria').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
    check('medida', 'La medida es obligatoria').not().isEmpty(),
    check('proveedor', 'El proveedor es obligatorio').not().isEmpty(),
    validarCampos
], crearInventarioProductos );

// Modificar Inventario de producto
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], inventarioProductosPut);

// Eliminar Inventario de producto
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validarCampos
], inventarioProductosDelete);

export default router;