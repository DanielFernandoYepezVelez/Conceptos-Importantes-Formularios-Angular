import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidacionPersonalizadaService {
  constructor() {}

  /* LOS VALIDADORES SON FUNCIONES QUE RETORNAN UN ARREGLO */
  noYepez(control: FormControl): { [s: string]: boolean } {
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
