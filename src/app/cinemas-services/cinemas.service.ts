import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {

  constructor(private http: HttpClient) { }

  baseApiURL = 'https://api.cinelist.co.uk/search/cinemas';
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

  getCinemasByPostcode(postcode: string): Observable<any> {
    const url = `${this.baseApiURL}/postcode/${postcode}`;  
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCinemasByPlace(place: string): Observable<any> {
    const url = `${this.baseApiURL}/${place}`;
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCinemasByLocation(lat, long): Observable<any> {
    const url = `${this.baseApiURL}/coordinates/${lat}/${long}`;
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}
