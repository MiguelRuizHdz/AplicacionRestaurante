import { Schema, Document, model } from 'mongoose';
// import { Producto } from './producto';

const ProveedorPedidoSchema = new Schema({
    costoTotal: {
        type: Number,
        required: [true, 'El total del pedido al cliente es obligatorio']
    },
    proveedor: {
        type: String,
        required: [true, 'El total del pedido al cliente es obligatorio']
    },
    productos: [{
        nombre: {
            type: String,
            required: [true, 'El nombre del producto del pedido al proveedor es obligatorio']
        },
        precioUnitario: {
            type: Number,
            required: [true, 'El precio unitario del producto del pedido al proveedor es obligatorio']
        },
        // stock: {
        //     type: Number,
        //     required: [true, 'La cantidad del producto en stock del restaurante - es obligatorio']
        // },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad del producto del pedido al proveedor es obligatorio']
        },
        // descripcion: {
        //     type: String,
        //     required: [true, 'La descripción del producto del pedido al proveedor es obligatorio']
        // },
    }],
    fecha: {
        type: Date,
        required: [true, 'La fecha del pedido al proveedor es obligatorio']
    },
    // fechaEntrega: {
    //     type: Date,
    //     required: [true, 'La fecha de entrega del pedido al cliente es obligatorio']
    // },
    estado: {
        type: Boolean,
        default: 0
        // 0="Pendiente"
        // 1="Entregado"
    },
});

ProveedorPedidoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface ProvProducto {
    nombre: string;
    precioUnitario: number;
    cantidad: number;
    // descripcion: string;
}

interface IProveedorPedido extends Document {
    costoTotal: number;
    proveedor: string;
    productos: ProvProducto[];
    fecha: string;
    estado: boolean;
}

export const ProveedorPedido = model<IProveedorPedido>( 'ProveedorPedido', ProveedorPedidoSchema );
