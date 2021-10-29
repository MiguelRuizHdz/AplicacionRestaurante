import { Router } from 'express';
import { check } from 'express-validator';

import { crearInventarioIngredientes, inventarioIngredientesDelete, inventarioIngredientesPut, obtenerInventarioIngredientes } from '../controllers/invIngredientes';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener Inventario de Ingredientes
router.get('/', obtenerInventarioIngredientes )

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
], crearInventarioIngredientes );

// Modificar Inventario de producto
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], inventarioIngredientesPut);

// Eliminar Inventario de producto
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validarCampos
], inventarioIngredientesDelete);

export default router;