import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Assunto } from "../assunto.model";
import { AssuntoService } from "../assunto.service";

@Component({
  selector: "app-assunto-read",
  templateUrl: "./assunto-read.component.html",
  styleUrls: ["./assunto-read.component.css"],
})
export class AssuntoReadComponent implements OnInit {

  displayedColumns: string[] = ["codAs", "descricao", "acoes"];
  assuntos: Assunto[] = [];

  constructor(
    private assuntoService: AssuntoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.assuntoService.findAll().subscribe((resp) => {
      this.assuntos = resp;
    });
  }

  navegarParaAssuntoCreate() {
    this.router.navigate(["assuntos/create"]);
  }
}
