import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autor } from './autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Autor[]> {
    const url = `${this.baseUrl}/autores/findAll`
    return this.http.get<Autor[]>(url);
  }

  findById(codAu: number): Observable<Autor> {
    const url = `${this.baseUrl}/autores/${codAu}`;
    return this.http.get<Autor>(url);
  }

  create(autor: Autor): Observable<Autor> {
    const url = `${this.baseUrl}/autores/create`
    return this.http.post<Autor>(url, autor);
  }

  delete(codAu: number): Observable<void> {
    const url = `${this.baseUrl}/autores/${codAu}`;
    return this.http.delete<void>(url);
  }

  update(codAu: number, autor: Autor): Observable<Autor> {
    const url = `${this.baseUrl}/autores/update/${codAu}`
    return this.http.put<Autor>(url, autor);
  }

  apresentarMensagem(msg: string) {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}
