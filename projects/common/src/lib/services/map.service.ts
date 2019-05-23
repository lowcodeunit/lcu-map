import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // FIELDS

  protected corsProxy: string = 'https://cors-anywhere.herokuapp.com/';

  protected apiKey: string = 'AIzaSyAsKh4_TXpYV57SBs7j3b6qFcJUG6fNHoU';

  // PROPERTIES

  // CONSTRUCTORS

  constructor(private http: HttpClient) { }

  // LIFE CYCLE

  // API METHODS

  public GetSurroundingLocations(lat: number, lng: number) {
    let baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    let radius = 'radius=5';
    let apiKey = `&key=${this.apiKey}`;
    let location = `&location=${lat},${lng}`;

    let fullUrl = `${this.corsProxy}${baseUrl}${radius}${location}${apiKey}`;

    return this.http.get(fullUrl);
  }

  public GetPlaceDetails(pID) {
    let baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?';
    let placeId = `placeid=${pID}`;
    let apiKey = `&key=${this.apiKey}`;
    let fields = '&fields=name,formatted_phone_number,adr_address,url,website,address_component,formatted_address';

    let fullUrl = `${this.corsProxy}${baseUrl}${placeId}${apiKey}${fields}`;

    return this.http.get(fullUrl);
  }

  // HELPERS

}
