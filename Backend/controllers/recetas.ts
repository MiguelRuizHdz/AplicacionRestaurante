import { response, request } from 'express';
import { Receta } from '../models/receta';


export const obtenerRecetas = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ recetas ] = await Promise.all([
        Receta.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        recetas
    });
}


export const crearReceta = async(req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();
    const { imagen, ingredientes, descripción } = req.body;

    const recetaDB = await Receta.findOne({ nombre });

    if ( recetaDB ) {
        return res.status(400).json({
            msg: `La receta ${ recetaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        imagen,
        ingredientes,
        descripción,
    }

    const receta = new Receta( data );

    // Guardar DB
    await receta.save();

    res.status(201).json(receta);
}


export const recetasPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;


    const receta = await Receta.findByIdAndUpdate( id, resto );

    res.status(400).json(receta);
};

export const recetasDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const receta = await Receta.findByIdAndDelete( id );

    const receta = await Receta.findByIdAndUpdate( id, { estado: false } );

    res.status(200).json({
        receta
    });
};
