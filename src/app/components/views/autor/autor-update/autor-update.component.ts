import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { ValorUtil } from '../../Util/valor-util';

@Component({
  selector: 'app-autorpdate',
  templateUrl: './autor-update.component.html',
  styleUrls: ['./autor-update.component.css']
})
export class AutorUpdateComponent implements OnInit {

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

  cancelar(): void {
    this.router.navigate(['autores']);
  }

  update(): void {
    this.autorService.update(this.autor.codAu!, this.autor).subscribe(resposta => {
      this.autor.nome = resposta.nome,
      this.cancelar();
      this.autorService.apresentarMensagem("Autor atualizado com sucesso!");
    }, exception => {
      console.log(exception);
      //this.autorService.apresentarMensagem(exception.error.error);
      for (var i = 0; i < exception.error.fieldErrors.length; i++) {
        this.autorService.apresentarMensagem(exception.error.fieldErrors[i].message)
      }
    }) 
  }
}
