"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });
    socket.on('enviar-mensaje', (payload, callback) => {
        const id = 123456789;
        callback(id);
        socket.broadcast.emit('enviar-mensaje', payload);
    });
};
exports.socketController = socketController;
//# sourceMappingURL=controller.js.map