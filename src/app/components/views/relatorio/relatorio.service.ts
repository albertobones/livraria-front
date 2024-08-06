import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RelatorioService {
    constructor(private http: HttpClient) { }

    baseUrl: String = environment.baseUrl;

    generateReport() {
      const headers = new HttpHeaders().set('Content-Type', 'application/pdf');
      return this.http.get(this.baseUrl+`/report`, { headers, responseType: 'blob' });
    }
}
