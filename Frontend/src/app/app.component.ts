import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

 // Se va a estar emitiendo valores de componente como un arreglo
 componentes: Observable<Componente[]>;

 constructor( private menuCtrl: MenuController,
              private dataService: DataService) {}

 ngOnInit() {
   this.componentes = this.dataService.getMenuOpts();
 }

}
