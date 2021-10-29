import { Schema, Document, model } from 'mongoose';

const MesaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la mesa es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
        // 0="Ocupada"
        // 1="Disponible"
    },
    numeroComensales: {
        type: Number,
        // required: [true, 'El numero de comensales del pedido del cliente es obligatorio']
        default: 0
    },
    capacidadTotal: {
        type: Number,
        required: [true, 'La capacidad total de la mesa es obligatoria']
    }
});

MesaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface IMesa extends Document {
    nombre: string;
    estado: boolean;
    numeroComensales: number;
    capacidadTotal: number;
}

export const Mesa = model<IMesa>( 'Mesa', MesaSchema );
