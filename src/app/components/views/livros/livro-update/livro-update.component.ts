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
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  titulo = new FormControl('', [Validators.minLength(3)]);
  editora = new FormControl('', [Validators.minLength(3)]);
  edicao = new FormControl('', [Validators.required]);
  anoPublicacao = new FormControl('', [Validators.minLength(4)]);
  valor = new FormControl('', [Validators.required]);

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
  autores: Autor[] = [];
  assuntos: Assunto[] = [];
  selectedAutor: Autor | null = null;
  selectedAssunto: Assunto | null = null;
  filteredAutores: Autor[] = [];
  filteredAssuntos: Assunto[] = [];
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

  carregarListaAutores(): void {
    this.autorService.findAll().subscribe(data => {
      this.autores = data;
      this.filterAutores();
    });
  }

  carregarListaAssuntos(): void {
    this.assuntoService.findAll().subscribe(data => {
      this.assuntos = data;
      this.filterAssuntos();
    });
  }

  findById(): void {
    this.livroService.findById(this.livro.codL!).subscribe((resposta) => {
      this.livro = resposta;
      this.assuntosDataSource.data = this.livro.assuntos!;
      this.autoresDataSource.data = this.livro.autores!;
      this.carregarListaAutores();
      this.carregarListaAssuntos();
    })
  }

  filterAutores(): void {
    const selectedAutorIds = this.livro.autores?.map(autor => autor.codAu) || [];
    this.filteredAutores = this.autores.filter(autor => !selectedAutorIds.includes(autor.codAu));
  }

  filterAssuntos(): void {
    const selectedAssuntoIds = this.livro.assuntos?.map(assunto => assunto.codAs) || [];
    this.filteredAssuntos = this.assuntos.filter(assunto => !selectedAssuntoIds.includes(assunto.codAs));
  }

  addAutor(): void {
    if (this.selectedAutor && !(this.livro.autores || []).find(a => a.codAu === this.selectedAutor!.codAu)) {
      this.livro.autores = [...(this.livro.autores || []), this.selectedAutor];
      this.autoresDataSource.data = this.livro.autores;
      this.filterAutores();
    }
    this.selectedAutor = null;
  }
  
  addAssunto(): void {
    if (this.selectedAssunto && !(this.livro.assuntos || []).find(a => a.codAs === this.selectedAssunto!.codAs)) {
      this.livro.assuntos = [...(this.livro.assuntos || []), this.selectedAssunto]
      this.assuntosDataSource.data = this.livro.assuntos;
      this.filterAssuntos();
    }
    this.selectedAssunto = null;
  }

  removeAutor(autor: Autor): void {
    this.livro.autores = (this.livro.autores || []).filter(a => a.codAu !== autor.codAu);
    this.autoresDataSource.data = this.livro.autores;
    this.filterAutores();
  }

  removeAssunto(assunto: Assunto): void {
    this.livro.assuntos = (this.livro.assuntos || []).filter(a => a.codAs !== assunto.codAs);
    this.assuntosDataSource.data = this.livro.assuntos;
    this.filterAssuntos();
  }

  cancelar() {
    this.router.navigate(['livros']);
  }

  update(): void {
    this.livroService.update(this.livro.codL!, this.livro).subscribe((resposta) => {
      this.livro = resposta;
      this.cancelar();
      this.livroService.apresentarMensagem("Livro atualizado com sucesso!");
    }, (exception) => {
      if(exception.error.fieldErrors){
        for (let i = 0; i < exception.error.fieldErrors.length; i++) {
          this.livroService.apresentarMensagem(exception.error.fieldErrors[i].message);
        }
      } else {        
          this.livroService.apresentarMensagem(exception.error.error);
      }
    })
  }

  onInput(event: any) {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    event.target.value = numericValue;
    this.anoPublicacao.setValue(numericValue, { emitEvent: false });
  }
  
}
