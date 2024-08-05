import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assunto } from '../assunto.model';
import { AssuntoService } from '../assunto.service';
import { ValorUtil } from '../../Util/valor-util';

@Component({
  selector: 'app-assunto-delete',
  templateUrl: './assunto-delete.component.html',
  styleUrls: ['./assunto-delete.component.css']
})
export class AssuntoDeleteComponent implements OnInit {

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

  delete(): void {
    this.assuntoService.delete(this.assunto.codAs!).subscribe(resposta => {
      this.router.navigate(['assuntos']);
      this.assuntoService.apresentarMensagem('Assunto deletado com sucesso!');
    }, exception => {
      console.log(exception);
      this.assuntoService.apresentarMensagem(exception.error.error);
    })
  }

  cancelar(): void {
    this.router.navigate(['assuntos']);
  }
}
