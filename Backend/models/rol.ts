import { Schema, Document, model } from 'mongoose';

const RolSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
    }
});

RolSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface IRol extends Document {
    nombre: string;
}

export const Rol = model<IRol>( 'Role', RolSchema );
