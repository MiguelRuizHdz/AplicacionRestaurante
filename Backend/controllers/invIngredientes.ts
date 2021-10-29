import { response, request } from 'express';
import { InvIngrediente } from '../models/invIngrediente';


export const obtenerInventarioIngredientes = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ inventarioIngredientes ] = await Promise.all([
        InvIngrediente.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        inventarioIngredientes
    });
}


export const crearInventarioIngredientes = async(req = request, res = response ) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { nombre, imagen, stock, medida, precio, proveedor, descripcion } = req.body;

    const inventarioIngredientesDB = await InvIngrediente.findOne({ nombre });

    if ( inventarioIngredientesDB ) {
        return res.status(400).json({
            msg: `La inventarioIngredientes ${ inventarioIngredientesDB.nombre }, ya existe`
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

    const inventarioIngredientes = new InvIngrediente( data );

    // Guardar DB
    await inventarioIngredientes.save();

    res.status(201).json(inventarioIngredientes);
}


export const inventarioIngredientesPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;


    const inventarioIngredientes = await InvIngrediente.findByIdAndUpdate( id, resto );

    res.status(400).json(inventarioIngredientes);
};

export const inventarioIngredientesDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const inventarioIngredientes = await InvIngrediente.findByIdAndDelete( id );

    const inventarioIngredientes = await InvIngrediente.findByIdAndUpdate( id, { estado: false } );

    res.status(200).json({
        inventarioIngredientes
    });
};
