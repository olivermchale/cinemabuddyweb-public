import { Component, OnInit } from '@angular/core';
import { CinemasService } from '../cinemas-services/cinemas.service';
import { Cinema } from '../utils/Cinema';
import { Listing } from '../utils/Listing';
import { MoviesService } from '../movies-services/movies.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  cinemasList = new Array<Cinema>();
  postcode: string;
  validPostcode = true;
  listings = new Array<Listing>();
  BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w185';

  constructor(
    private cinemasService: CinemasService,
    private moviesService: MoviesService) { }
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
      this.cinemasList = [];
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

  getShowings(i) {
    this.listings = [];
    const cinema = this.cinemasList[i];
    this.cinemasService.getShowtimes(cinema.id).subscribe(
      response => {
        this.handleShowingsResponse(response);
        console.log(response);
      },
      error => {
        console.log('error'+ error);
      }
    )
  }

  handleShowingsResponse(response : any) {
    if(response.listings) {
      const cinemaListings = response.listings;
      cinemaListings.forEach(listing => {
        const myListing = new Listing();
        myListing.title = listing.title;
        myListing.times = listing.times;
        this.listings.push(myListing);
      });
      this.getMovieDetails()
    }
    else {
      console.log('no listings');
    }
  }

  getMovieDetails() {
    this.listings.forEach(listing => {
      this.moviesService.getMovieDetails(listing.title).subscribe(
        response => {
          const movieDetails = response.results[0];
          listing.backdropPath = this.BASE_IMAGE_URL + movieDetails.backdrop_path;
          listing.posterPath = this.BASE_IMAGE_URL + movieDetails.poster_path;
          listing.rating = movieDetails.vote_average;
          listing.releaseDate = movieDetails.release_date;
          listing.overview = movieDetails.overview;
          listing.loaded = true;
          console.log(listing);
        },
        error => {
          console.log('error'+ error);
        }
      )
    });
  }

  listingsLoaded() {
    let listingsLoaded = true;
    if(this.listings.length > 0) {
      this.listings.forEach(listing => {
        if(listing.loaded = false) {
          listingsLoaded = false;
        }
      });
    } else {
      listingsLoaded = false;
    }
    return listingsLoaded;
  }


}
