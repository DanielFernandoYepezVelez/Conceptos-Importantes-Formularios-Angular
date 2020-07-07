import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  constructor(private http: HttpClient) {}

  /* Primera Forma */
  /* A la suscripción se entrega el valor que tenga o retorne el MAP*/
  /*   getPaises() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
      map((resp: any[]) => {
        return resp.map((pais) => {
          return {
            nombre: pais.name,
            codigo: pais.alpha3Code,
          };
        });
      })
    );
  } */

  /* Segunda Forma(Simplificada Con El MAP) */
  /* A la suscripción se entrega el valor que tenga o retorne el MAP(Importante)*/
  getPaises() {
    return this.http
      .get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map((resp: any[]) =>
          resp.map((pais) => ({ nombre: pais.name, codigo: pais.alpha3Code }))
        )
      );
  }
}
