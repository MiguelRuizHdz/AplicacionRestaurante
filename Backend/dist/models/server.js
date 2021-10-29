"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_1 = require("../database/config");
const controller_1 = require("../sockets/controller");
const usuarios_1 = tslib_1.__importDefault(require("../routes/usuarios"));
const roles_1 = tslib_1.__importDefault(require("../routes/roles"));
const recetas_1 = tslib_1.__importDefault(require("../routes/recetas"));
const proveedorPedidos_1 = tslib_1.__importDefault(require("../routes/proveedorPedidos"));
const proveedores_1 = tslib_1.__importDefault(require("../routes/proveedores"));
const mesas_1 = tslib_1.__importDefault(require("../routes/mesas"));
const menus_1 = tslib_1.__importDefault(require("../routes/menus"));
const clientePedidos_1 = tslib_1.__importDefault(require("../routes/clientePedidos"));
const invIngredientes_1 = tslib_1.__importDefault(require("../routes/invIngredientes"));
const invProductos_1 = tslib_1.__importDefault(require("../routes/invProductos"));
class Servidor {
    constructor() {
        this.apiPaths = {
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
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8080';
        this.httpServer = http_1.createServer(this.app);
        this.io = new socket_io_1.Server(this.httpServer);
        this.conectarDB();
        this.middlewares();
        this.routes();
        this.sockets();
    }
    conectarDB() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield config_1.dbConnection();
        });
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
        this.app.use(this.apiPaths.roles, roles_1.default);
        this.app.use(this.apiPaths.recetas, recetas_1.default);
        this.app.use(this.apiPaths.proveedorPedidos, proveedorPedidos_1.default);
        this.app.use(this.apiPaths.proveedores, proveedores_1.default);
        this.app.use(this.apiPaths.mesas, mesas_1.default);
        this.app.use(this.apiPaths.menus, menus_1.default);
        this.app.use(this.apiPaths.clientePedidos, clientePedidos_1.default);
        this.app.use(this.apiPaths.invIngredientes, invIngredientes_1.default);
        this.app.use(this.apiPaths.invProductos, invProductos_1.default);
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