import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: boolean) {
    return value ? 'Activo' : 'Bloqueado/Eliminado';
  }

}
