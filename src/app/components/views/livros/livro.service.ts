import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Livro } from "./livro.model";

@Injectable({
  providedIn: "root",
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient, 
    private snack: MatSnackBar
  ) {}

  findAll(): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros/findAll`
    return this.http.get<Livro[]>(url);
  }

  findById(codL: number): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${codL}`
    return this.http.get<Livro>(url);
  }

  create(livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/livros/create`
    return this.http.post<Livro>(url, livro);
  }

  update(codL: number, livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/livro/update/${codL}`
    return this.http.put<Livro>(url, livro);
  }

  delete(codL: number): Observable<void> {
    const url = `${this.baseUrl}/livro/${codL}`;
    return this.http.delete<void>(url);
  }

  apresentarMensagem(msg: string) {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
