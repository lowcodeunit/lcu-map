import { Injectable } from '@angular/core';
import { MapMarker } from '../models/map-marker.model';

@Injectable({
  providedIn: 'root'
})
export class LocationInfoService {
//FIELDS
  //PROPERTIES
  protected phoneNumberUrl: string;
  //CONSTRUCTORS
  constructor() { }
  //LIFE CYCLE
  //API METHODS
  public SetPhoneNumberUrl(marker: MapMarker): void{
    if(marker.phoneNumber){
      this.phoneNumberUrl = 'tel:'+ marker.phoneNumber;
    }
  }

  public GetPhoneNumberUrl(): string{
    return this.phoneNumberUrl;
  }
  //HELPERS
}
