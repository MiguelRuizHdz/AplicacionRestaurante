require('dotenv').config();

import Servidor from './models/server';

const server = new Servidor();

server.listen();