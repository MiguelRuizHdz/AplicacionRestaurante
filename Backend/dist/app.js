"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require('dotenv').config();
const server_1 = tslib_1.__importDefault(require("./models/server"));
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map