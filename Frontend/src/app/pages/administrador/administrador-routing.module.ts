import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorPage } from './administrador.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorPage,
    children: [
      {
        path: 'empleados',
        loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule)
      },
      {
        path: '',
        redirectTo: '/administrador/empleados',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'administrador',
    redirectTo: '/empleados',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorPageRoutingModule {}
