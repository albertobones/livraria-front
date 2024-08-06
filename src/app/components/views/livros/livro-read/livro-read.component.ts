import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Assunto } from "../../assunto/assunto.model";
import { Autor } from "../../autor/autor.model";

@Component({
  selector: "app-livro-read",
  templateUrl: "./livro-read.component.html",
  styleUrls: ["./livro-read.component.css"],
})
export class LivroReadComponent implements OnInit {
  displayedColumns: string[] = ["codL", "titulo", "editora", "edicao", "anoPublicacao", "valor", "acoes"];
  livros: Livro[] = [];
  dataSource!: MatTableDataSource<Livro>;
  idLivro: number = 0;

  assuntos: Assunto[] = [];
  autores: Autor[] = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

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
    this.livroSevice.findAll().subscribe((resp: Livro[]) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.sort = this.sort;
    });
  }

  navegarParaNovoLivro(): void {
    this.router.navigate([`livros/create`]);
  }

  saveId(codL: number) {
    this.idLivro = codL;
  }

  delete() : void {
    // this.ngxSmartModalService.close('modalExcluirLivro');
    this.livroSevice.delete(this.idLivro).subscribe((resposta) => {
      this.livroSevice.apresentarMensagem('Livro exluido com sucesso!');
    })
  }

  abrirModalAssuntos(livro: any) {
    // Aqui você deve carregar os assuntos do livro
    this.assuntos = livro.assuntos; // Ajuste conforme a estrutura real dos dados
    this.ngxSmartModalService.getModal('modalAssuntos').open();
  }

  fecharModalAssuntos() {
    this.ngxSmartModalService.getModal('modalAssuntos').close();
  }
}
