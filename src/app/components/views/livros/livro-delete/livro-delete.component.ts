import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssuntoService } from '../../assunto/assunto.service';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ValorUtil } from '../../util/valor-util';
import { Autor } from '../../autor/autor.model';
import { Assunto } from '../../assunto/assunto.model';
import { AutorService } from '../../autor/autor.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  livro: Livro = {
    codL: 0,
    titulo: '',
    editora: '',
    edicao: 0,
    anoPublicacao: '',
    valor: 0,
    autores: [],
    assuntos: []
  }
  autoresDataSource = new MatTableDataSource<Autor>(this.livro.autores || []);
  assuntosDataSource = new MatTableDataSource<Assunto>(this.livro.assuntos || []);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private livroService: LivroService,
    private assuntoService: AssuntoService,
    private autorService: AutorService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("codL")!;
    if(id){
      this.livro.codL = ValorUtil.convertToNumber(id);
    }
    this.findById();
  }

  findById(): void {
    this.livroService.findById(this.livro.codL!).subscribe((resposta) => {
      this.livro = resposta;
      this.assuntosDataSource.data = this.livro.assuntos!;
      this.autoresDataSource.data = this.livro.autores!;
    })
  }

  delete(): void {
    this.livroService.delete(this.livro.codL!).subscribe(resposta => {
      this.router.navigate(['livros']);
      this.autorService.apresentarMensagem('Livro deletado com sucesso!');
    }, exception => {
      this.autorService.apresentarMensagem(exception.error.error);
    })
  }

  cancelar() {
    this.router.navigate(['livros']);
  }

}
