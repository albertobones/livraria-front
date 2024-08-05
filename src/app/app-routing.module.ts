import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/views/home/home.component";
import { AssuntoReadComponent } from "./components/views/assunto/assunto-read/assunto-read.component";
import { AssuntoCreateComponent } from "./components/views/assunto/assunto-create/assunto-create.component";
import { AssuntoDeleteComponent } from "./components/views/assunto/assunto-delete/assunto-delete.component";
import { AssuntoUpdateComponent } from "./components/views/assunto/assunto-update/assunto-update.component";
import { AutorReadComponent } from "./components/views/autor/autor-read/autor-read.component";
import { AutorCreateComponent } from "./components/views/autor/autor-create/autor-create.component";
import { AutorDeleteComponent } from "./components/views/autor/autor-delete/autor-delete.component";
import { AutorUpdateComponent } from "./components/views/autor/autor-update/autor-update.component";
import { LivroCreateComponent } from "./components/views/livros/livro-create/livro-create.component";
import { LivroReadComponent } from "./components/views/livros/livro-read/livro-read.component";
import { LivroUpdateComponent } from "./components/views/livros/livro-update/livro-update.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'assuntos', component: AssuntoReadComponent
  },
  {
    path: 'assuntos/create', component: AssuntoCreateComponent
  },
  {
    path: 'assuntos/delete/:codAs', component: AssuntoDeleteComponent
  },
  {
    path: 'assuntos/update/:codAs', component: AssuntoUpdateComponent
  },
  {
    path: 'livros', component: LivroReadComponent
  },
  {
    path: 'livros/create', component: LivroCreateComponent
  },
  {
    path: 'livros/delete/:codL', component: LivroUpdateComponent
  },
  {
    path: 'livros/update/:codL', component: LivroUpdateComponent
  },
  {
    path: 'autores', component: AutorReadComponent
  },
  {
    path: 'autores/create', component: AutorCreateComponent
  },
  {
    path: 'autores/delete/:codAu', component: AutorDeleteComponent
  },
  {
    path: 'autores/update/:codAu', component: AutorUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
