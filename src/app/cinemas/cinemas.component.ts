import { Component, OnInit } from '@angular/core';
import { CinemasService } from '../cinemas-services/cinemas.service';
import { Cinema } from '../utils/Cinema';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  cinemasList = new Array<Cinema>();
  postcode: string;
  validPostcode = true;

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
      response => {
        this.handleCinemasResponse(response);
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getCinemasByPostcode(postcode) {
    this.cinemasService.getCinemasByPostcode(postcode).subscribe(
      response => {
        this.handleCinemasResponse(response);
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  validatePostcode(postcode) {
    const postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
    const valid = postcodeRegEx.test(postcode);
    if(valid) {
      this.getCinemasByPostcode(postcode);
    }
    else {
      this.validPostcode = false;
    }
  }

  locationNotSupported() {
    console.log('location isnt supported in this browser');
  }

  handleCinemasResponse(response) {
    const cinemas = response.cinemas;
    cinemas.forEach(cinema => {
      const myCinema = new Cinema();
      myCinema.name = cinema.name;
      myCinema.distance = cinema.distance;
      myCinema.id = cinema.id;
      this.cinemasList.push(myCinema);
    });
    console.log(this.cinemasList);
    if(this.cinemasList) {
      this.getCinemaDetails();
    }
  }

  getCinemaDetails() {
    this.cinemasList.forEach(cinema => {
      this.cinemasService.getCinemaDetails(cinema.id).subscribe(
        response => {
          cinema.town = response.towncity;
          cinema.postcode = response.postcode;
          cinema.website = response.website;
          cinema.phone = response.phone;
          cinema.loaded = true;
          console.log(cinema);
        },
        error => {
          console.log('error');
        }
      )
    });
    console.log('cinemas loaded');
  }

  cinemasLoaded() {
    let cinemasLoaded = true;
    if(this.cinemasList) {
      this.cinemasList.forEach(cinema => {
        if(cinema.loaded = false) {
          cinemasLoaded = false;
        }
      });
    } else {
      cinemasLoaded = false;
    }
    return cinemasLoaded;
  }

}
