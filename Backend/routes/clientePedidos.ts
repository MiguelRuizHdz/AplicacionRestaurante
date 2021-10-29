import { Router } from 'express';
import { check } from 'express-validator';

import { clientePedidoDelete, clientePedidoPut, crearClientePedido, obtenerClientePedidos } from '../controllers/clientePedidos';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener Cliente Pedidos
router.get('/', obtenerClientePedidos )

// Crear Cliente Pedido
router.post('/', [
    check('tipoPedido', 'El tipo de pedido es obligatorio').not().isEmpty(),
    check('productos', 'Los productos son obligatorios').not().isEmpty(),
    validarCampos
], crearClientePedido );

// Modificar Cliente Pedido
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], clientePedidoPut);

// Eliminar Cliente Pedido
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validarCampos
], clientePedidoDelete);

export default router;