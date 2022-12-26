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
