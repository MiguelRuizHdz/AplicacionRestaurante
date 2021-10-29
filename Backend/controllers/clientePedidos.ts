import { response, request } from 'express';
import { ClientePedido } from '../models/clientePedido';


export const obtenerClientePedidos = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ clientePedido ] = await Promise.all([
        ClientePedido.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        clientePedido
    });
}


export const crearClientePedido = async(req = request, res = response ) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { tipoPedido, mesa, numeroComensales, direccion, notas, productos, fecha, total, creadoPor } = req.body;

    // const clientePedidoDB = await ClientePedido.findOne({ nombre });

    // if ( clientePedidoDB ) {
    //     return res.status(400).json({
    //         msg: `El clientePedido ${ clientePedidoDB.nombre }, ya existe`
    //     });
    // }

    // Generar la data a guardar
    const data = {
        tipoPedido,
        mesa,
        numeroComensales,
        direccion,
        notas,
        productos,
        fecha,
        total,
        creadoPor
    }

    const clientePedido = new ClientePedido( data );

    // Guardar DB
    await clientePedido.save();

    res.status(201).json(clientePedido);
}


export const clientePedidoPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;


    const clientePedido = await ClientePedido.findByIdAndUpdate( id, resto );

    res.status(400).json(clientePedido);
};

export const clientePedidoDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const clientePedido = await ClientePedido.findByIdAndDelete( id );

    // Cancelado
    const clientePedido = await ClientePedido.findByIdAndUpdate( id, { estado: 11 } );

    res.status(200).json({
        clientePedido
    });
};
