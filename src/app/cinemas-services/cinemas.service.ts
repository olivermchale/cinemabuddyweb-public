import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {

  constructor(private http: HttpClient) { }

  baseSearchApiURL = 'https://api.cinelist.co.uk/search/cinemas';
  baseDetailsApiUrl = 'https://api.cinelist.co.uk/get/';
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
    const url = `${this.baseSearchApiURL}/postcode/${postcode}`;  
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCinemasByPlace(place: string): Observable<any> {
    const url = `${this.baseSearchApiURL}/${place}`;
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCinemasByLocation(lat, long): Observable<any> {
    const url = `${this.baseSearchApiURL}/coordinates/${lat}/${long}`;
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCinemaDetails(id): Observable<any> {
    const url = `${this.baseDetailsApiUrl}/cinema/${id}`;
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getShowtimes(id): Observable<any> {
    const url = `${this.baseDetailsApiUrl}times/cinema/${id}`;
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}
