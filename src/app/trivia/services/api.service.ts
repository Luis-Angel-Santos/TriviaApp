import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions, Trivia } from '../interfaces/questions.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'https://opentdb.com/api.php?amount=20';


  getQuestions(category: string, type: string, difficult: string):Observable<Trivia>{
    return this.http.get<Trivia>(`${this.urlBase}&category=${category}&difficult=${difficult}&type=${type}`);
  }

}
