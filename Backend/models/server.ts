import express, { Application } from 'express';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';
import { Server } from 'socket.io';

import { socketController } from '../sockets/controller';

import userRoutes from '../routes/usuarios';

class Servidor {


    private app : Application;
    private port: string;
    private httpServer: HttpServer;
    public io: Server;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app        = express();
        this.port       = process.env.PORT || '8080';
        this.httpServer = createServer( this.app );
        this.io         = new Server(this.httpServer);

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
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