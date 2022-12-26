import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Questions } from '../interfaces/questions.interface';
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
  preguntas!: Questions[];
  p: number = 1;
  buenas: number = 0;
  malas: number = 1;
  colorBien: string = '';
  colorMal: string = '';

  pageChangeEvent(event: number){
    this.p = event;
  }

  buena(){
    this.buenas++;
    this.pageChangeEvent(this.p + 1);
  }

  mala(){
    this.malas++;
    this.pageChangeEvent(this.p + 1);
  }


  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService){}
 
  ngOnInit(): void {
    this.categoria = this.activatedRoute.snapshot.paramMap.get('category')!;
    this.dificultad = this.activatedRoute.snapshot.paramMap.get('difficult')!;
    this.tipo = this.activatedRoute.snapshot.paramMap.get('type')!;
    
    this.apiService.getQuestions(this.categoria, this.tipo, this.dificultad)
      .subscribe(trivia => {
        this.preguntas = trivia.results;
      })
    
  }

}
