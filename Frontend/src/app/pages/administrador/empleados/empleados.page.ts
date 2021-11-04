/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Empleado } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  // Se va a estar emitiendo valores de componente como un arreglo
  empleados = [];
  roles = [];
  agregar = false;
  editando = false;

  registroEmpleado: FormGroup = this.fb.group({
    nombre  :  ['', [ Validators.required, Validators.minLength(2) ]],
    correo  :  ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
    password:  ['', [ Validators.required, Validators.minLength(6) ]],
    rol     :  ['', [ Validators.required, Validators.minLength(1) ]],
  });

  edicionEmpleado: FormGroup = this.fb.group({
    id     :  ['', [ Validators.required, Validators.minLength(2) ]],
    nombre :  ['', [ Validators.required, Validators.minLength(2) ]],
    correo :  ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
    rol    :  ['', [ Validators.required, Validators.minLength(1) ]],
  });

  constructor( private dataService: DataService,
               private fb: FormBuilder,
               private uiService: UiServiceService ) {}

  ngOnInit() {
    this.traerEmpleados();
    this.traerRoles();
    console.log(this.empleados);
    console.log(this.roles);
    this.agregar = false;
    this.crearForm();
  }

  traerEmpleados(){
    this.dataService.getEmpleados()
      .subscribe( resp => {
        this.empleados.push( ...resp.usuarios );
      });
  }

  traerRoles(){
    this.dataService.getRoles()
      .subscribe( resp => {
        this.roles.push( ...resp.roles );
      });
  }

  get nombreNoValido() {
    return this.registroEmpleado.get('nombre')?.invalid && this.registroEmpleado.get('nombre')?.touched;
  }
  get correoNoValido() {
    return this.registroEmpleado.get('correo')?.invalid && this.registroEmpleado.get('coreo')?.touched;
  }
  get passwordNoValida() {
    return this.registroEmpleado.get('password')?.invalid && this.registroEmpleado.get('password')?.touched;
  }
  get rolNoValido() {
    return this.registroEmpleado.get('rol')?.invalid && this.registroEmpleado.get('rol')?.touched;
  }

  crearForm() {
    this.registroEmpleado = this.fb.group({
      nombre    :  ['', [ Validators.required, Validators.minLength(2) ]],
      correo    :  ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      password  :  ['', [ Validators.required, Validators.minLength(6) ]],
      rol       :  ['', [ Validators.required, Validators.minLength(1) ]],
    });
  }

  btnAgregarEmpleado() {
    console.log('agregarEmpleado');
    this.agregar = true;
  }

  btnEliminarEmpleado( empleado ) {
    console.log('eliminarEmpleado', empleado._id);
    this.dataService.eliminarEmpleado(empleado).subscribe( (resp) => {

      console.log('eliminado', resp);
      this.empleados = this.empleados.filter( empl => empl._id !== empleado._id );
      this.uiService.alertaInformativa('Se ha eliminado correctamente');
    });
  }

  btnEditarEmpleado( empleado: Empleado ) {
    this.edicionEmpleado.patchValue({
      // eslint-disable-next-line no-underscore-dangle
      _id: empleado._id,
      nombre: empleado.nombre,
      correo: empleado.correo,
      password: empleado.estado,
      rol: empleado.rol,
    });
    this.editando = true;

  }

  async editarEmpleado() {
    const editado = await this.dataService.modificarEmpleado(this.edicionEmpleado.value);
    if (editado ) {
      console.log('editado');
    } else {
      console.log('falló');
    }
    this.uiService.alertaInformativa('Se ha editado correctamente');

  }

  regresar() {
    this.agregar = false;
    this.editando = false;
  }

  async registrarEmpleado() {
    console.log( this.registroEmpleado.value );
    if ( this.registroEmpleado.invalid ) {
      return Object.values( this.registroEmpleado.controls ).forEach( control => {
        control.markAsTouched();
      });
    }

    const registrado = await this.dataService.crearEmpleado( this.registroEmpleado.getRawValue() );
    if ( registrado ) {
      this.empleados = [];
      this.traerEmpleados();
    }

    this.registroEmpleado.reset();

    this.uiService.alertaInformativa('Se ha registrado correctamente');

    this.regresar();
  }



}
