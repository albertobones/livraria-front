import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { ValorUtil } from '../../Util/valor-util';

@Component({
  selector: 'app-autor-delete',
  templateUrl: './autor-delete.component.html',
  styleUrls: ['./autor-delete.component.css']
})
export class AutorDeleteComponent implements OnInit {

  autor: Autor = {
    codAu: 0,
    nome: ''
  }

  constructor(
    private router: Router,
    private autorService: AutorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('codAu')!;
    if(id){
      this.autor.codAu = ValorUtil.convertToNumber(id);
    }
    this.findById();
  }

  findById(): void {
    this.autorService.findById(this.autor.codAu!).subscribe(resposta => {
      this.autor.nome = resposta.nome;
    })
  }

  delete(): void {
    this.autorService.delete(this.autor.codAu!).subscribe(resposta => {
      this.router.navigate(['autores']);
      this.autorService.apresentarMensagem('Autor deletado com sucesso!');
    }, exception => {
      console.log(exception);
      this.autorService.apresentarMensagem(exception.error.error);
    })
  }

  cancelar(): void {
    this.router.navigate(['autores']);
  }
}
