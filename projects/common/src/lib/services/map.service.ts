import { Injectable } from '@angular/core';
import { MarkerInfo } from '../models/marker-info.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // FIELDS

  // PROPERTIES

  // CONSTRUCTORS

  constructor() { }

  // LIFE CYCLE

  // API METHODS

  /**
   * 
   * @param icon The icon to be converted to a path
   * 
   * Converts an icon lookup to the object necessary to display custom icons as map location markers
   */
  public ConvertIconObject(iconUrl: string, markerSet: MarkerInfo[]): {} {
    let markerObject = { url: '', scaledSize: { width: 40, height: 60 } };
    markerSet.forEach(marker => {
      if (marker.iconLookup === iconUrl) {
        markerObject.url = marker.iconUrl;
      }
    });
    return markerObject;
  }

  // HELPERS

}
