import { Router } from 'express';
import { check } from 'express-validator';

import { crearPedidoAProveedor, obtenerPedidosAProveedor, pedidoAProveedorPut, pedidoAProveedorDelete } from '../controllers/proveedorPedidos';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

// Obtener Pedidos A Proveedor
router.get('/', obtenerPedidosAProveedor )

// Crear Pedido A Proveedor
router.post('/', [
    // check('costoTotal', 'El costoTotal es obligatorio').not().isEmpty(),
    check('proveedor', 'El proveedor es obligatorio').not().isEmpty(),
    check('productos', 'Los productos son obligatorios').not().isEmpty(),
    validarCampos
], crearPedidoAProveedor );

// Modificar Pedido A Proveedor
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], pedidoAProveedorPut);

// Eliminar Pedido A Proveedor
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( existeUsuarioPorId ),
    validarCampos
], pedidoAProveedorDelete);

export default router;