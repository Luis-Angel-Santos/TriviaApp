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
  durationInSeconds = 2;

  pageChangeEvent(event: number){
    if(this.p != 20){
      this.p = event;
    }else{
      this._snackBar.dismiss();
      Swal.fire({
        title: 'Resultados Finales!',
        text: `Estos son tus resultados: de 20 preguntas, tú tienes ${this.buenas} aciertos y ${this.malas} incorrectas`,
        icon: 'info',
        confirmButtonText: 'Volver a Jugar',
        confirmButtonColor: 'green'
      }).then(resp => {
        if (resp.isConfirmed ) this.router.navigate(['/trivia']); 
      })
    }
  }

  buena(){
    this.openSnackBar('Respuesta Correcta 🥳', 'Cerrar');
    this.buenas++;
    this.pageChangeEvent(this.p + 1);
  }

  mala(){
    this.openSnackBar('Respuesta Incorrecta 😞', 'Cerrar', );
    this.malas++;
    this.pageChangeEvent(this.p + 1);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private _snackBar: MatSnackBar,
              private router: Router){}
 
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
