import express, { Application } from 'express';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';
import { Server } from 'socket.io';

import { dbConnection } from '../database/config';
import { socketController } from '../sockets/controller';

import userRoutes from '../routes/usuarios';
import rolesRoutes from '../routes/roles';

class Servidor {


    private app : Application;
    private port: string;
    private httpServer: HttpServer;
    public io: Server;
    private apiPaths = {
        usuarios: '/api/usuarios',
        roles: '/api/roles',
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