import { response, request } from 'express';
import { ProveedorPedido } from '../models/proveedorPedido';


export const obtenerPedidosAProveedor = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ pedidoAProveedor ] = await Promise.all([
        ProveedorPedido.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        pedidoAProveedor
    });
}


export const crearPedidoAProveedor = async(req = request, res = response ) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { costoTotal, proveedor, productos, fecha } = req.body;

    // const pedidoAProveedorDB = await ProveedorPedido.findOne({ nombre });

    // if ( pedidoAProveedorDB ) {
    //     return res.status(400).json({
    //         msg: `El pedido a Proveedor ${ pedidoAProveedorDB.nombre }, ya existe`
    //     });
    // }

    // Generar la data a guardar
    const data = {
        costoTotal,
        proveedor,
        productos,
        fecha,
    }

    const pedidoAProveedor = new ProveedorPedido( data );

    // Guardar DB
    await pedidoAProveedor.save();

    res.status(201).json(pedidoAProveedor);
}


export const pedidoAProveedorPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;


    const pedidoAProveedor = await ProveedorPedido.findByIdAndUpdate( id, resto );

    res.status(400).json(pedidoAProveedor);
};

export const pedidoAProveedorDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const pedidoAProveedor = await ProveedorPedido.findByIdAndDelete( id );

    const pedidoAProveedor = await ProveedorPedido.findByIdAndUpdate( id, { estado: false } );

    res.status(200).json({
        pedidoAProveedor
    });
};
