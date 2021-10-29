"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const RolSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
    }
});
RolSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = tslib_1.__rest(_a, ["__v"]);
    return data;
};
exports.Rol = mongoose_1.model('Role', RolSchema);
//# sourceMappingURL=rol.js.map