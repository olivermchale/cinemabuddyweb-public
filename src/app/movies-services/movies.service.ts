import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  baseApiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=9669bc2381450a6140cdfd1f7b62737c&language=en-GB&query='
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.message;
    }
    return throwError(errorMessage);
  }

  getMovieDetails(title: string): Observable<any> {
    const url = `${this.baseApiUrl}${title}+'&page=1&include_adult=false'`;  
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

}
