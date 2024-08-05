import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

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
    private livroService: LivroService
  ) { }

  ngOnInit(): void {
    // this.idAssunto = this.route.snapshot.paramMap.get("idAssunto")!;
    // this.livro.assunto!.id = this.idAssunto;
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

  create(): void {
    this.livroService.create(this.livro).subscribe((resposta) => {
      this.cancelar();
      this.livroService.apresentarMensagem("Livro criado com sucesso!");
    }, (exception) => {
      for (let i = 0; i < exception.error.fieldErrors.length; i++) {
        this.livroService.apresentarMensagem(exception.error.fieldErrors[i].message);
      }
    })
  }

}
