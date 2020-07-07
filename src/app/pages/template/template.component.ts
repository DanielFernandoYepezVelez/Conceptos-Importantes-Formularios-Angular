import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  paises: any[] = [];
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    pais: '',
    genero: '',
  };

  constructor(private paisService: PaisService) {}

  /* Aqui recibimos lo que el intermediario PIPE y el Reactive Extensions Retornen */
  ngOnInit(): void {
    this.paisService.getPaises().subscribe(
      (res) => {
        this.paises.unshift({
          nombre: 'Seleccionar Un Pais',
          codigo: '',
        });

        this.paises = res;
        console.log(this.paises);
      },
      (err) => console.log(err)
    );
  }

  guardar(form: NgForm) {
    /* Aqui Obtengo Todos Los Errores Del Formulario En Un Solo Click */
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });

      return;
    }

    // console.log(form);
  }
}
