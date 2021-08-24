import { Socket } from 'socket.io';

export const socketController = (socket: Socket ) => {

    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('enviar-mensaje', ( payload: any , callback: any ) => {

        const id = 123456789;
        // Retroalimetación que se ejecuta cuando todo salió bien
        callback( id );

        // Mandale un mensaje a todos
        socket.broadcast.emit('enviar-mensaje', payload);

    });

}
