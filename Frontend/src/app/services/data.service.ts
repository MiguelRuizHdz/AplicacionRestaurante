import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Componente, Empleado, RespuestaEmpleados, RespuestaRoles } from '../interfaces/interfaces';

const URL =  environment.url;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  id = '';
  nuevoEmpleado = new EventEmitter<Empleado>();

  constructor( private http: HttpClient ) { }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu-opts.json');
  };

  getEmpleados() {
    return this.http.get<RespuestaEmpleados>(`${ URL }/usuarios?limite=10&desde=0`);
  };

  crearEmpleado( empleado ) {
    return new Promise( resolve => {

      this.http.post(`${ URL}/usuarios`, empleado )
          .subscribe( resp => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            this.nuevoEmpleado.emit( resp['usuario']);
            resolve(true);
      });

    });
  };

  eliminarEmpleado( empleado ) {
    // eslint-disable-next-line no-underscore-dangle
    this.id = empleado._id;
    return this.http.delete(`${ URL }/usuarios/${ this.id }`);
  }

  modificarEmpleado( empleado: Empleado ) {

    // eslint-disable-next-line no-underscore-dangle
    console.log('Empleado', empleado);
    this.id = empleado._id;
    console.log('id a borrar',this.id);
    console.log('empleado id: ', empleado._id);
    return new Promise( resolve => {

      this.http.put(`${ URL }/usuarios/${ this.id }`, empleado )
          .subscribe( resp => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            if ( resp['ok'] ){
              resolve(true);
            } else {
              resolve(false);
            }
          });
    });
  }

  getRoles(){
    return this.http.get<RespuestaRoles>(`${ URL }/roles`);
  }

}
