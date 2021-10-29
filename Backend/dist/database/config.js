"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const dbConnection = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_CNN);
        console.log('Base de datos online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map