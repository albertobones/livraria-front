import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assunto } from '../assunto.model';
import { AssuntoService } from '../assunto.service';
import { ValorUtil } from '../../util/valor-util';

@Component({
  selector: 'app-assuntopdate',
  templateUrl: './assunto-update.component.html',
  styleUrls: ['./assunto-update.component.css']
})
export class AssuntoUpdateComponent implements OnInit {

  assunto: Assunto = {
    codAs: 0,
    descricao: ''
  }

  constructor(
    private router: Router,
    private assuntoService: AssuntoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('codAs')!;
    if(id){
      this.assunto.codAs = ValorUtil.convertToNumber(id);
    }
    this.findById();
  }

  findById(): void {
    this.assuntoService.findById(this.assunto.codAs!).subscribe(resposta => {
      this.assunto.descricao= resposta.descricao;
    })
  }

  cancelar(): void {
    this.router.navigate(['assuntos']);
  }

  update(): void {
    this.assuntoService.update(this.assunto.codAs!, this.assunto).subscribe(resposta => {
      this.assunto.descricao = resposta.descricao,
      this.cancelar();
      this.assuntoService.apresentarMensagem("Assunto atualizado com sucesso!");
    }, exception => {
      for (var i = 0; i < exception.error.fieldErrors.length; i++) {
        this.assuntoService.apresentarMensagem(exception.error.fieldErrors[i].message)
      }
    }) 
  }
}
