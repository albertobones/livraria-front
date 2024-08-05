import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: "app-livro-read",
  templateUrl: "./livro-read.component.html",
  styleUrls: ["./livro-read.component.css"],
})
export class LivroReadComponent implements OnInit {
  displayedColumns: string[] = ["codL", "titulo", "livros", "acoes"];
  idAssunto: string = "";
  livros: Livro[] = [];
  idLivro: number = 0;

  constructor(
    private route: ActivatedRoute,
    private livroSevice: LivroService,
    private router: Router,
    public ngxSmartModalService: NgxSmartModalService,
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.livroSevice.findAll().subscribe((resp) => {
      this.livros = resp;
    });
  }

  navegarParaNovoLivro(): void {
    this.router.navigate([`livros/create`]);
  }

  saveId(codL: number) {
    this.idLivro = codL;
  }

  delete() : void {
    this.ngxSmartModalService.close('modalExcluirLivro');
    this.livroSevice.delete(this.idLivro).subscribe((resposta) => {
      this.livroSevice.apresentarMensagem('Livro exluido com sucesso!');
    })
  }
}
