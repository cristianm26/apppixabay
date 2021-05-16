import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();
  constructor(private http: HttpClient) { }

  setError(mensaje: string) {
    this.error$.next(mensaje)
  }
  getError(): Observable<string> {
    return this.error$.asObservable();
  }
  enviarTerminoBusqueda(termino: string) {
    this.terminoBusqueda$.next(termino);
  }
  getTerminoBusqueda(): Observable<string> {
    return this.terminoBusqueda$.asObservable()
  }

  getImagenes(termino: string, imagenPorPagina: number, paginaActual: number): Observable<any> {
    const apiKey = '19713860-502f04b8b6a40184220a2639d'
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${termino}&per_page=${imagenPorPagina}&page=${paginaActual}`;
    return this.http.get(url)
  }
}

