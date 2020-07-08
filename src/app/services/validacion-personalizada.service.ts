import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidacionPersonalizadaService {
  constructor() {}

  /* Las Validaciones asincronas resuelven una promesa o un observable */
  /* Validacion Asincrona(Simulación) */
  existeUsuario(
    control: FormControl
  ): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null); /* No Resuelve Nada */
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null); /* No Resuelve Nada */
        }
      }, 3500);
    });
  }

  /* LOS VALIDADORES SON FUNCIONES QUE RETORNAN UN ARREGLO */
  /* Esta es una validación Sincrona(Simulacion) */
  noYepez(control: FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === 'yepez') {
      return {
        noYepez: true,
      };
    }

    return null;
  }

  /* Entrega Una Funcion Que me Ayude A Validar El Formulario */
  passwordsIguales(pass1Name: string, pass2Name: string) {
    /* Recibo Un Formulario Como Parametro Por que la validación es a nivel formulario */
    return (formulario: FormGroup) => {
      const pass1Control = formulario.controls[pass1Name];
      const pass2Control = formulario.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
