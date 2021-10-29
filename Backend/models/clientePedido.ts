import { Schema, Document, model } from 'mongoose';
// import { Producto } from './producto';

const ClientePedidoSchema = new Schema({
    tipoPedido: {
        type: Number,
        required: [true, 'El tipo del pedido del cliente es obligatorio'],
        emun: [1, 2, 3]
        // 1: Mesa
        // 2: Entrega a domicilio
        // 3: Entrega en local
    },
    mesa: {
        type: String,
        // required: [true, 'La mesa del pedido del cliente es obligatorio']
    },
    numeroComensales: {
        type: Number,
        // required: [true, 'El numero de comensales del pedido del cliente es obligatorio']
    },
    direccion: {
        type: String,
        // required: [true, 'La mesa del pedido del cliente es obligatorio']
    },
    notas: {
        type: String,
    },
    // {
    //     "productos": [
    //         // receta, precio, cantidad
    //         ["enchiladas", 55.00, 2],
    //         ["tacos", 50.00, 1],
    //         ["flautas", 60.00, 2]
    //     ]
    // }
    productos: [{
        nombre: {
            type: String,
            required: [true, 'El nombre del producto del pedido del cliente es obligatorio']
        },
        precio: {
            type: Number,
            required: [true, 'El precio del producto del pedido del cliente es obligatorio']
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad del producto del pedido del cliente es obligatorio']
        },
    }],
    fecha: {
        type: Date,
        required: [true, 'La fecha del pedido del cliente es obligatorio']
    },
    total: {
        type: Number,
        required: [true, 'El total del pedido del cliente es obligatorio']
    },
    estado: {
        type: Number,
        default: 0
        // 0: creado y enviado a cocina
        // 1: recibido y preparando ingredientes en cocina
        // 2: platillo en proceso de cocinar en cocina
        // 3: platillo terminado de cocinar en cocina
        // 4: pedido a entregar por mesero
        // 5: pedido a entregar por cajero
        // 6: pedido pendiente de aceptar por repartidor
        // 7: pedido aceptado por repartidor EN-CAMINO
        // 8: pedido entregado por repartidor
        // 9: pedido entregado por mesero
        // 10: pedido entregado por cajero
        // 11: cancelado/eliminado
    },
    creadoPor: {
        type: String,
        // required: [true, 'El nombre del Creador del pedido es requerido'],
    },
    entregadoPor: {
        type: String,
        // required: [true, 'El nombre del empleado que entrego el pedido es requerido'],
    },
});

ClientePedidoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface Producto {
    nombre: string;
    precio: number;
    cantidad: number;
}

interface IClientePedido extends Document {
    tipoPedido: number;
    mesa: string;
    numeroComensales: number;
    direccion: string;
    notas: string;
    productos: Producto[];
    fecha: string;
    total: string;
    estado: number;
    creadoPor: string;
    entregadoPor: string;
}

export const ClientePedido = model<IClientePedido>( 'ClientePedido', ClientePedidoSchema );
