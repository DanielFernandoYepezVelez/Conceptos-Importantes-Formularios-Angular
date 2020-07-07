import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ValidacionPersonalizadaService } from '../../services/validacion-personalizada.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validation: ValidacionPersonalizadaService
  ) {
    this.creacionFormulario();
    this.dataBackendParaFormularioFrontend();
  }

  ngOnInit(): void {}

  get nombreNoValido() {
    return (
      this.formulario.get('nombre').invalid &&
      this.formulario.get('nombre').touched
    );
  }

  get apellidoNoValido() {
    return (
      this.formulario.get('apellido').invalid &&
      this.formulario.get('apellido').touched
    );
  }

  get emailNoValido() {
    return (
      this.formulario.get('email').invalid &&
      this.formulario.get('email').touched
    );
  }

  get pass1NoValido() {
    return (
      this.formulario.get('pass1').invalid &&
      this.formulario.get('pass1').touched
    );
  }

  get pass2NoValido() {
    const pass1 = this.formulario.get('pass1').value;
    const pass2 = this.formulario.get('pass2').value;

    return pass1 === pass2 ? false : true;
  }

  get departamentoNoValido() {
    return (
      this.formulario.get('direccion.departamento').invalid &&
      this.formulario.get('direccion.departamento').touched
    );
  }

  get ciudadNoValida() {
    return (
      this.formulario.get('direccion.ciudad').invalid &&
      this.formulario.get('direccion.ciudad').touched
    );
  }

  /* Para Poder Iterar El Array De Pasatiempos */
  get pasatiempos() {
    return this.formulario.get('pasatiempos') as FormArray;
  }

  creacionFormulario() {
    /* Aqui Definimos El Formulario Pensando En El Existente En Html */
    this.formulario = this.formBuilder.group(
      {
        /* Al Interior Del Array Van, valores por defecto, operaciones sincronas y asincronas */
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            this.validation.noYepez,
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        pass1: ['', [Validators.required, Validators.minLength(3)]],
        pass2: ['', [Validators.required, Validators.minLength(3)]],
        direccion: this.formBuilder.group({
          departamento: ['', [Validators.required]],
          ciudad: ['', Validators.required],
        }),
        /* Minimo Un Array Al Enviar */
        pasatiempos: this.formBuilder.array([]),
      },
      {
        /* Aqui Van Todas La Validaciones A Nivel De Formulario, Es Decir, Despues De Que Toda La Data Este Montada */
        /* (Esto es una validacion formulario) */
        validators: [this.validation.passwordsIguales('pass1', 'pass2')],
      }
    );
  }

  dataBackendParaFormularioFrontend() {
    /* Para Que Esto Funcione Deben Existir Todos Los Campos Establecidos Obligatoriamente,(string Vacio Es Válido También) */
    this.formulario.setValue({
      nombre: 'Daniel Fernando',
      apellido: 'Yepez Vélez',
      email: 'danipez.02@gmail.com',
      pass1: '',
      pass2: '',
      direccion: {
        departamento: 'Antioquia',
        ciudad: 'Medellin',
      },
      pasatiempos: [],
    });

    /* Aqui Obtengo Flexibilidad */
    /* Lo Importante Aqui Es Que Puedo Establecer La Data Que Necesito Y No Toda Obligatoriamente Como En El SetValue Depende De Los  */
    /* Requerimientos */
    /* this.formulario.reset({
      nombre: 'Daniel Fernando',
      apellido: 'Yepez Vélez',
      email: 'danipez.02@gmail.com',
    }); */

    /* Forma De Cargar Data A Un Un Array Dinamico */
    /* ['comer', 'dormir'].forEach((valor) =>
      this.pasatiempos.push(this.formBuilder.control(valor))
    ); */
  }

  /* Este Valor Se Asigna Donde este el iterador del formcontrolname en el HTML */
  agregarPasatiempo() {
    this.pasatiempos.push(
      // this.formBuilder.control('Nuevo Elemento', Validators.required),
      this.formBuilder.control('')
    );
  }

  borrarPasatiempo(index: number) {
    this.pasatiempos.removeAt(index);
  }

  guardarFormulario() {
    // console.log(this.formulario);

    /* Aqui Obtengo Todos Los Errores Del Formulario En Un Solo Click */
    /* Y Tambien Los Objetos Hijos Que Existan En El Mismo Formulario(PADRE) */
    if (this.formulario.invalid) {
      Object.values(this.formulario.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((newControl) => {
            newControl.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }

    /* Despues Del Post Reseteo El Form */
    this.formulario.reset({
      /* Valores Que No Quiero Resetear */
      nombre: 'Valor Por Defecto',
      apellido: 'No Se Resetea',
    });
  }
}
