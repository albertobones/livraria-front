import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssuntoService } from '../../assunto/assunto.service';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ValorUtil } from '../../Util/valor-util';

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
  autores = new FormControl([], [Validators.required]);
  assuntos = new FormControl([], [Validators.required]);

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
  idAssunto: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private livroService: LivroService,
    private assuntoService: AssuntoService
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
      console.log("livro: "+resposta);
      console.log("livro.assuntos: "+resposta.assuntos);
      console.log("livro.autores: "+resposta.autores);
      this.livro = resposta;
      this.livro.assuntos = resposta.assuntos;
      this.livro.autores = resposta.autores;
    })
  }

  

  getMenssage() {
    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 caracteres.";
    }
    if (this.editora.invalid) {
      return "O campo AUTOR deve conter entre 3 e 100 caracteres.";
    }
    if (this.edicao.invalid) {
      return "O campo EDICAO deve ser informado.";
    }
    return false;
  }

  cancelar() {
    this.router.navigate([`assuntos/${this.idAssunto}/livros`]);
  }

  update(): void {
    this.livroService.update(this.livro.codL!, this.livro).subscribe((resposta) => {
      this.cancelar();
      this.livroService.apresentarMensagem("Livro atualizado com sucesso!");
    }, (exception) => {
      for (let i = 0; i < exception.error.fieldErrors.length; i++) {
        this.livroService.apresentarMensagem(exception.error.fieldErrors[i].message);
      }
    })
  }

}
