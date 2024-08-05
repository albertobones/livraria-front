import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Autor } from "../autor.model";
import { AutorService } from "../autor.service";

@Component({
  selector: "app-autor-read",
  templateUrl: "./autor-read.component.html",
  styleUrls: ["./autor-read.component.css"],
})
export class AutorReadComponent implements OnInit {

  displayedColumns: string[] = ["codAu", "nome", "acoes"];
  autores: Autor[] = [];

  constructor(
    private autorService: AutorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.autorService.findAll().subscribe((resp) => {
      //console.log(resp);
      this.autores = resp;
    });
  }

  navegarParaAutorCreate() {
    this.router.navigate(["autores/create"]);
  }
}
