import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  malas: number = 0;
  colorBien: string = '';
  colorMal: string = '';
  tiempo: number = 60;
  all_answers: string[] = [];

  pageChangeEvent(event: number){
    if(this.p != 20){
      this.p = event;
    }else{
      this.tiempoAcabado();
    }
  }

  tiempoAcabado(){
    this._snackBar.dismiss();
      Swal.fire({
        title: 'Resultados Finales!',
        text: `Estos son tus resultados: de 20 preguntas, tú tienes ${this.buenas} aciertos y ${this.malas} incorrectas`,
        icon: 'success',
        backdrop: false,
        confirmButtonText: 'Volver a Jugar',
        confirmButtonColor: 'green'
      }).then(resp => {
        if (resp.isConfirmed ) this.router.navigate(['/trivia']);
      })
  }

  responder(pregunta: Questions, respuesta: string) {
    if (respuesta === pregunta.correct_answer) {
      this.buena();
    } else {
      this.mala();
    }
  }

  buena(){
    this.openSnackBar('Respuesta Correcta', '🥳');
    this.buenas++;
    this.pageChangeEvent(this.p + 1);
  }

  mala(){
    this.openSnackBar('Respuesta Incorrecta', '😞', );
    this.malas++;
    this.pageChangeEvent(this.p + 1);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  shuffleCorrectAnswers() {
    this.preguntas.forEach(question => {
      question.all_answers = this.shuffleAnswers([
        ...question.incorrect_answers,
        question.correct_answer
      ]);
    });
  }

  shuffleAnswers(answers: string[]): string[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private _snackBar: MatSnackBar,
              private router: Router){}

  ngOnInit(): void {
    this.categoria = this.activatedRoute.snapshot.paramMap.get('category')!;
    this.dificultad = this.activatedRoute.snapshot.paramMap.get('difficult')!;
    this.tipo = this.activatedRoute.snapshot.paramMap.get('type')!;

    this.apiService.getQuestions(this.categoria, this.tipo, this.dificultad).subscribe({
      next: (data) => {
        if(data.results.length < 1){
          Swal.fire({
            title: 'Error!',
            text: 'No hay preguntas con los filtros seleccionados, por favor intenta con otros filtros',
            icon: 'error',
            backdrop: false,
            confirmButtonText: 'Ok',
            confirmButtonColor: 'green'
          }).then(resp => this.router.navigate(['/home']));
        }else{
          this.preguntas = data.results;
          this.shuffleCorrectAnswers();

        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error, por favor intenta más tarde: '+error.message,
          icon: 'error',
          backdrop: false,
          confirmButtonText: 'Ok',
          confirmButtonColor: 'green'
      }).then(resp => this.router.navigate(['/home']));
      }
    });
    var id = setInterval(() => {
      if(this.tiempo <= 0 || this.p == 20){
        this.tiempoAcabado();
        clearInterval(id);
      }else{
        this.tiempo--;
      }
    }, 1000);
  }

}
