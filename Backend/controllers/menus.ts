import { response, request } from 'express';
import { Menu } from '../models/menu';


export const obtenerMenus = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ menu ] = await Promise.all([
        Menu.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        menu
    });
}


export const crearMenu = async(req = request, res = response ) => {

    // const nombre = req.body.nombre.toUpperCase();
    const { nombre, imagen, precio, descripción, categoria, creadoPor } = req.body;

    const menuDB = await Menu.findOne({ nombre });

    if ( menuDB ) {
        return res.status(400).json({
            msg: `La menu ${ menuDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        imagen,
        precio,
        descripción,
        categoria,
        creadoPor
    }

    const menu = new Menu( data );

    // Guardar DB
    await menu.save();

    res.status(201).json(menu);
}


export const menuPut = async(req = request, res = response ) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;


    const menu = await Menu.findByIdAndUpdate( id, resto );

    res.status(400).json(menu);
};

export const menuDelete = async(req = request, res = response ) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const menu = await Menu.findByIdAndDelete( id );

    const menu = await Menu.findByIdAndUpdate( id, { estado: false } );

    res.status(200).json({
        menu
    });
};
