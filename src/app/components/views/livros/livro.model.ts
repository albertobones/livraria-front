import { Assunto } from "../assunto/assunto.model";
import { Autor } from "../autor/autor.model";

export interface Livro {
    codL?: number
    titulo: string
    editora: string
    edicao: number
    anoPublicacao: String
    valor: number

    autores?: Autor[]
    assuntos?: Assunto[]
}