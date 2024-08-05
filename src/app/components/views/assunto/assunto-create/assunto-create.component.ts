import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assunto } from '../assunto.model';
import { AssuntoService } from '../assunto.service';

@Component({
  selector: 'app-assunto-create',
  templateUrl: './assunto-create.component.html',
  styleUrls: ['./assunto-create.component.css']
})
export class AssuntoCreateComponent implements OnInit {
  
  assunto: Assunto = {
    descricao: '',
  }

  constructor(
    private assuntoService: AssuntoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.assuntoService.create(this.assunto).subscribe(resposta => {
      this.router.navigate(['assuntos'])
      this.assuntoService.apresentarMensagem('Assunto criado com sucesso!');
    }, err => {
      for (let i = 0; i < err.error.fieldErrors.length; i++) {
        this.assuntoService.apresentarMensagem(err.error.fieldErrors[i].message);
      }
      
    })
  }

  cancelar(): void {
    this.router.navigate(['assuntos']);
  }

}
