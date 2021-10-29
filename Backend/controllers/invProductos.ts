import { response, request } from 'express';
import { InvProducto } from '../models/invProducto';


export const obtenerInventarioProductos = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ inventarioProductos ] = await Promise.all([
        InvProducto.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        inventarioProductos
    });
}


export const crearInventarioProductos = async(req = request, res = response ) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { nombre, imagen, stock, medida, precio, proveedor, descripcion } = req.body;

    const inventarioProductosDB = await InvProducto.findOne({ nombre });

    if ( inventarioProductosDB ) {
        return res.status(400).json({
            msg: `La inventarioProductos ${ inventarioProductosDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        imagen,
        stock,
        medida,
        precio,
        proveedor,
        descripcion
    }

    const inventarioProductos = new InvProducto( data );

    // Guardar DB
    await inventarioProductos.save();

    res.status(201).json(inventarioProductos);
}


export const inventarioProductosPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;


    const inventarioProductos = await InvProducto.findByIdAndUpdate( id, resto );

    res.status(400).json(inventarioProductos);
};

export const inventarioProductosDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const inventarioProductos = await InvProducto.findByIdAndDelete( id );

    const inventarioProductos = await InvProducto.findByIdAndUpdate( id, { estado: false } );

    res.status(200).json({
        inventarioProductos
    });
};
