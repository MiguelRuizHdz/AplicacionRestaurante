import { response, request } from 'express';
import { Rol } from '../models/rol';


export const obtenerRoles = async(req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;

    const [ roles] = await Promise.all([
        Rol.find()
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.status(200).json({
        roles
    });
}


export const crearRol = async(req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const rolDB = await Rol.findOne({ nombre });

    if ( rolDB ) {
        return res.status(400).json({
            msg: `El rol ${ rolDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre
    }

    const rol = new Rol( data );

    // Guardar DB
    await rol.save();

    res.status(201).json(rol);
}