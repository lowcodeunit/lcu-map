import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // FIELDS

  /**
   * Temporary CORS proxy to prepend to call and avoid CORS errors
   */
  protected corsProxy: string = 'https://cors-anywhere.herokuapp.com/';

  /**
   * API key for Google maps
   */
  protected apiKey: string = 'AIzaSyAsKh4_TXpYV57SBs7j3b6qFcJUG6fNHoU';

  // PROPERTIES

  // CONSTRUCTORS

  constructor(private http: HttpClient) { }

  // LIFE CYCLE

  // API METHODS

  /**
   * 
   * @param lat Latitude
   * @param lng Longitude
   * 
   * Gets surrounding POIs within 5 meters of the passed latitude and longitude
   */
  public GetSurroundingLocations(lat: number, lng: number) {
    let baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    let radius = 'radius=5';
    let apiKey = `&key=${this.apiKey}`;
    let location = `&location=${lat},${lng}`;

    let fullUrl = `${this.corsProxy}${baseUrl}${radius}${location}${apiKey}`;

    return this.http.get(fullUrl);
  }

  /**
   * 
   * @param pID The place ID of the requested Google Maps POI
   * 
   * Returns the data for a given place ID for a Google Maps POI
   */
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
