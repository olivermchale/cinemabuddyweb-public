import { Component, OnInit } from '@angular/core';
import { CinemasService } from '../cinemas-services/cinemas.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  cinemasList: any;
  constructor(private cinemasService: CinemasService) { }
  ngOnInit() {
    const locationSupported = this.getUserLocation();
    if (!locationSupported) {
      this.locationNotSupported();
    }
  }

  getUserLocation(): boolean {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        this.getCinemasByLocation(lat, long);
      });
      return true;
    } else {
      return false;
    }
  }

  getCinemasByLocation(lat, long) {
    this.cinemasService.getCinemasByLocation(lat, long).subscribe(
      cinemas => {
        this.cinemasList = cinemas;
        this.handleCinemasResponse();
        console.log(this.cinemasList);
      },
      error => {
        console.log(error);
      }
    );
  }

  locationNotSupported() {
    console.log('location isnt supported in this browser');
  }

  handleCinemasResponse() {
    
  }

}
