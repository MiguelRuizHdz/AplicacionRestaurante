import { response, request } from 'express';
import { Proveedor } from '../models/provedor';


export const obtenerProveedores = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ proveedor ] = await Promise.all([
        Proveedor.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        proveedor
    });
}


export const crearProveedor = async(req = request, res = response ) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { nombre, telefono, correo, direccion, rfc } = req.body;

    const proveedorDB = await Proveedor.findOne({ nombre });

    if ( proveedorDB ) {
        return res.status(400).json({
            msg: `El proveedor ${ proveedorDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        telefono,
        correo,
        direccion,
        rfc
    }

    const proveedor = new Proveedor( data );

    // Guardar DB
    await proveedor.save();

    res.status(201).json(proveedor);
}


export const proveedorPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;


    const proveedor = await Proveedor.findByIdAndUpdate( id, resto );

    res.status(400).json(proveedor);
};

export const proveedorDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const proveedor = await Proveedor.findByIdAndDelete( id );

    const proveedor = await Proveedor.findByIdAndUpdate( id, { estado: false } );

    res.status(200).json({
        proveedor
    });
};
