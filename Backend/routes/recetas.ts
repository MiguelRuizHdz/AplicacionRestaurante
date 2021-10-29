import { Router } from 'express';
import { check } from 'express-validator';

import { crearReceta, obtenerRecetas, recetasPut, recetasDelete } from '../controllers/recetas';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener recetas
router.get('/', obtenerRecetas )

// Crear receta
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('ingredientes', 'Los ingredientes son obligatorios').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], crearReceta );

// Modificar receta
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('ingredientes', 'Los ingredientes son obligatorios').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], recetasPut);

// Eliminar receta
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validarCampos
], recetasDelete);

export default router;