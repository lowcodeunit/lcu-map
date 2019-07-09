import { Injectable } from '@angular/core';
import { MapMarker } from '../models/map-marker.model';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class LocationInfoService {
//FIELDS
  //PROPERTIES
  protected phoneNumberUrl: string;
  //CONSTRUCTORS
  constructor(private mapService: MapService) { }
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

  public BuildInstagramUrl(marker: MapMarker): string{
    if(marker.instagram){
      let tempInsta = marker.instagram.slice(1);
      return "https://www.instagram.com/"+tempInsta+"/";
    }
  }

  public GetType(marker: MapMarker): string{
    let type: string;
    if(marker.type){
      let tempType = marker.type[0];
      if(tempType.includes("_")){
        tempType = tempType.replace("_"," ");
      }
      tempType = tempType.charAt(0).toUpperCase() + tempType.substr(1,tempType.length);
      type = tempType;
      //console.log("type =", type);
    }
    return type;
  } 

  

  //HELPERS
}
