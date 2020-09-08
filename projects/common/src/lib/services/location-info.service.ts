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

  protected isHighlighted: boolean;

  protected selectedMarker: MapMarker;

  protected highlightedNotesLocationId: string;

  //CONSTRUCTORS
  constructor(private mapService: MapService) {
    this.isHighlighted = false;
  }
  //LIFE CYCLE
  //API METHODS
  public setHighlightedNotesLocationId(id: string) {
    this.highlightedNotesLocationId = id;
  }
  public getHighlightedNotesLocationId() {
    return this.highlightedNotesLocationId;
  }
  public SetPhoneNumberUrl(marker: MapMarker): void {
    if (marker.Telephone) {
      this.phoneNumberUrl = 'tel:' + marker.Telephone;
    }
    else {
      this.phoneNumberUrl = undefined;
    }
  }

  public GetPhoneNumberUrl(): string {
    return this.phoneNumberUrl;
  }

  public BuildInstagramUrl(marker: MapMarker): string {
    if (marker.Instagram) {
      console.log("insta ", marker.Instagram)
      let tempInsta = marker.Instagram.slice(1);
      return "https://www.instagram.com/" + tempInsta + "/";
    }
  }

  public SetHighlightIcon(highlight: boolean): void {
    this.isHighlighted = highlight;
    // console.log("setting = ", this.isHighlighted);
  }

  public GetHighlightedIcon(): boolean {
    return this.isHighlighted;
  }

  public GetType(marker: MapMarker): string {
    let type: string;
    if (marker.Type) {
      let tempType = marker.Type[0];
      if (tempType.includes("_")) {
        tempType = tempType.replace("_", " ");
      }
      tempType = tempType.charAt(0).toUpperCase() + tempType.substr(1, tempType.length);
      type = tempType;
      //console.log("type =", type);
    }
    return type;
  }

  public GetSelectedMarker(): MapMarker {
    return this.selectedMarker;
  }
  public SetSelectedMarker(marker: MapMarker): void {
    this.selectedMarker = marker;
  }


  //HELPERS
}
