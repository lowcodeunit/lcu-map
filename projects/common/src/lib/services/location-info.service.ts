import { Injectable } from '@angular/core';
import { MapMarker } from '@lcu-ide/dynamic-map-common/lcu.api';

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
