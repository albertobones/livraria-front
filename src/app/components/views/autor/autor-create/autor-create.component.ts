import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-autor-create',
  templateUrl: './autor-create.component.html',
  styleUrls: ['./autor-create.component.css']
})
export class AutorCreateComponent implements OnInit {
  
  autor: Autor = {
    nome: ''
  }

  constructor(
    private autorService: AutorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.autorService.create(this.autor).subscribe(resposta => {
      this.router.navigate(['autores'])
      this.autorService.apresentarMensagem('Autor criado com sucesso!');
    }, err => {
      for (let i = 0; i < err.error.fieldErrors.length; i++) {
        this.autorService.apresentarMensagem(err.error.fieldErrors[i].message);
      }
      
    })
  }

  cancelar(): void {
    this.router.navigate(['autores']);
  }

}
