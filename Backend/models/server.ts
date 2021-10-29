import express, { Application } from 'express';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';
import { Server } from 'socket.io';

import { dbConnection } from '../database/config';
import { socketController } from '../sockets/controller';

import userRoutes from '../routes/usuarios';
import rolesRoutes from '../routes/roles';
import recetasRoutes from '../routes/recetas';
import proveedorPedidoRoutes from '../routes/proveedorPedidos';
import proveedorRoutes from '../routes/proveedores';
import mesasRoutes from '../routes/mesas';
import menusRoutes from '../routes/menus';
import clientePedidosRoutes from '../routes/clientePedidos';
import invIngredientesRoutes from '../routes/invIngredientes';
import invProductosRoutes from '../routes/invProductos';

class Servidor {


    private app : Application;
    private port: string;
    private httpServer: HttpServer;
    public io: Server;
    private apiPaths = {
        usuarios: '/api/usuarios',
        roles: '/api/roles',
        recetas: '/api/recetas',
        proveedores: '/api/proveedores',
        proveedorPedidos: '/api/proveedorpedidos',
        mesas: '/api/mesas',
        menus: '/api/menus',
        clientePedidos: '/api/clientepedidos',
        invIngredientes: '/api/invingredientes',
        invProductos: '/api/invproductos',
    }

    constructor() {
        this.app        = express();
        this.port       = process.env.PORT || '8080';
        this.httpServer = createServer( this.app );
        this.io         = new Server(this.httpServer);

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // use es la palabra clave para indicar que es un middleware
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    routes() {
        this.app.use( this.apiPaths.usuarios, userRoutes )
        this.app.use( this.apiPaths.roles, rolesRoutes )
        this.app.use( this.apiPaths.recetas, recetasRoutes )
        this.app.use( this.apiPaths.proveedorPedidos, proveedorPedidoRoutes )
        this.app.use( this.apiPaths.proveedores, proveedorRoutes )
        this.app.use( this.apiPaths.mesas, mesasRoutes )
        this.app.use( this.apiPaths.menus, menusRoutes )
        this.app.use( this.apiPaths.clientePedidos, clientePedidosRoutes )
        this.app.use( this.apiPaths.invIngredientes, invIngredientesRoutes )
        this.app.use( this.apiPaths.invProductos, invProductosRoutes )
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port )
        } );
    }
}

export default Servidor;