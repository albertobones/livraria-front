import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assunto } from './assunto.model';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Assunto[]> {
    const url = `${this.baseUrl}/assuntos/findAll`
    return this.http.get<Assunto[]>(url);
  }

  findById(codAs: number): Observable<Assunto> {
    const url = `${this.baseUrl}/assuntos/${codAs}`;
    return this.http.get<Assunto>(url);
  }

  create(assunto: Assunto): Observable<Assunto> {
    const url = `${this.baseUrl}/assuntos/create`
    return this.http.post<Assunto>(url, assunto);
  }

  delete(codAs: number): Observable<void> {
    const url = `${this.baseUrl}/assuntos/${codAs}`;
    return this.http.delete<void>(url);
  }

  update(codAs: number, assunto: Assunto): Observable<Assunto> {
    const url = `${this.baseUrl}/assuntos/update/${codAs}`
    return this.http.put<Assunto>(url, assunto);
  }

  apresentarMensagem(msg: string) {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}
