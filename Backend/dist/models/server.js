"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const controller_1 = require("../sockets/controller");
const usuarios_1 = __importDefault(require("../routes/usuarios"));
class Servidor {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8080';
        this.httpServer = http_1.createServer(this.app);
        this.io = new socket_io_1.Server(this.httpServer);
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
        this.app.use(cors_1.default());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
    }
    sockets() {
        this.io.on('connection', controller_1.socketController);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
exports.default = Servidor;
//# sourceMappingURL=server.js.map