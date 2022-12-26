import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit{

  categoria: string = '';
  tipo: string = '';
  dificultad: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService){}
 
  ngOnInit(): void {
    this.categoria = this.activatedRoute.snapshot.paramMap.get('category')!;
    this.dificultad = this.activatedRoute.snapshot.paramMap.get('difficult')!;
    this.tipo = this.activatedRoute.snapshot.paramMap.get('type')!;
    
    this.apiService.getQuestions(this.categoria, this.tipo, this.dificultad)
      .subscribe(trivia => {
        console.log(trivia.results);
      })
    
  }

}
