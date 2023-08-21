import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categorias = [
    { value: "0", label: "Cualquiera" },
    { value: "15", label: "Videojuegos" },
    { value: "11", label: "Peliculas" },
    { value: "21", label: "Deportes" },
    { value: "27", label: "Animales" },
    { value: "29", label: "Comics" },
    { value: "14", label: "Televisión" },
    { value: "12", label: "Música" },
    { value: "32", label: "Caricaturas - Animaciones" }
  ]

  trivia = {
    categoria: '',
    dificultad: '',
    tipo: ''
  }

  iniciar(){
    console.log(this.trivia);
    this.router.navigate(['trivia', this.trivia.categoria, this.trivia.tipo, this.trivia.dificultad]);
  }

  constructor(private apiService: ApiService,
              private router: Router) {}
}
