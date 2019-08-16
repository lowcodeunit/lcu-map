import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { IndividualMap } from '../models/individual-map.model';

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
/**
 * The current Layers that are selected to display
 */
  // protected CurrentlyActiveLayers: Array<IndividualMap>;

  // CONSTRUCTORS

  constructor(protected http: HttpClient) { }

  // LIFE CYCLE

  // API METHODS

  /**
   *
   * @param lat Latitude
   * 
   * @param lng Longitude
   *
   * Gets surrounding POIs within 5 meters of the passed latitude and longitude
   */
  public GetSurroundingLocations(lat: number, lng: number) {
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const radius = 'radius=5';
    const apiKey = `&key=${this.apiKey}`;
    const location = `&location=${lat},${lng}`;

    const fullUrl = `${this.corsProxy}${baseUrl}${radius}${location}${apiKey}`;

    return this.http.get(fullUrl);
  }

  /**
   *
   * @param pID The place ID of the requested Google Maps POI
   *
   * Returns the data for a given place ID for a Google Maps POI
   */
  public GetPlaceDetails(pID) {
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?';
    const placeId = `placeid=${pID}`;
    const apiKey = `&key=${this.apiKey}`;
    const fields = '&fields=name,formatted_phone_number,adr_address,url,website,address_component,formatted_address,geometry,photo,type';

    const fullUrl = `${this.corsProxy}${baseUrl}${placeId}${apiKey}${fields}`;

    return this.http.get(fullUrl);
  }


/**
 * 
 * @param layers Sets CurrentlyActiveLayers to the incomming array of IndividualMaps
 */
  // public SetCurrentlyActiveLayers(layers: Array<IndividualMap>): void{
  //   this.CurrentlyActiveLayers = layers;
  // }
/**
 * Allows access to the CurrentlyActiveLayers form outside of the service
 */
  // public GetCurrentlyActiveLayers(): Array<IndividualMap>{
  //   return this.CurrentlyActiveLayers;
  // }

  public GetMapApiKey(): string{
    return this.apiKey;
  }
  // HELPERS

}
