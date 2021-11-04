import { NgModule } from '@angular/core';
import { CapitalizadoPipe } from './capitalizado.pipe';
// import { CommonModule } from '@angular/common';
import { EstadoPipe } from './estado.pipe';



@NgModule({
  declarations: [
    EstadoPipe,
    CapitalizadoPipe
  ],
  exports: [
    EstadoPipe,
    CapitalizadoPipe
  ]
})
export class PipesModule { }
