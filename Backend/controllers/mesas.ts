import { response, request } from 'express';
import { Mesa } from '../models/mesa';


export const obtenerMesas = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ mesa ] = await Promise.all([
        Mesa.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        mesa
    });
}


export const crearMesa = async(req = request, res = response ) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { nombre, capacidadTotal } = req.body;

    const mesaDB = await Mesa.findOne({ nombre });

    if ( mesaDB ) {
        return res.status(400).json({
            msg: `La mesa ${ mesaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        capacidadTotal
    }

    const mesa = new Mesa( data );

    // Guardar DB
    await mesa.save();

    res.status(201).json(mesa);
}


export const mesaPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;


    const mesa = await Mesa.findByIdAndUpdate( id, resto );

    res.status(400).json(mesa);
};

export const mesaDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const mesa = await Mesa.findByIdAndDelete( id );

    const mesa = await Mesa.findByIdAndUpdate( id, { estado: false } );

    res.status(200).json({
        mesa
    });
};
