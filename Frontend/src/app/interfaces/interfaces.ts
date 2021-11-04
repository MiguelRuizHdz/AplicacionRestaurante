export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}

export interface RespuestaEmpleados {
    total: number;
    usuarios: Empleado[];
}

export interface RespuestaRoles {
    roles: Rol[];
}

export interface Rol {
    _id?: string;
    nombre: string;
}

export interface Empleado {
    _id?: string;
    nombre: string;
    correo: string;
    password: string;
    rol: string;
    estado: boolean;
}
