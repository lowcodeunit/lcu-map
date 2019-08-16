import { Injectable } from '@angular/core';
import { MarkerInfo } from '../models/marker-info.model';
import { IconImageObject } from '../models/icon-image-object.model';

@Injectable({
    providedIn: 'root'
})

export class MapConversions {
    
  /**
   * 
   * @param icon The icon to be converted to a path
   * 
   * Converts an icon lookup to the object necessary to display custom icons as map location markers
   */
  public ConvertIconObject(iconUrl: string, markerSet: MarkerInfo[]): IconImageObject {
    const markerObject: IconImageObject = new IconImageObject();
    markerObject.Url = '';
    markerObject.ScaledSize = { Width: 40, Height: 60 };
    markerSet.forEach(marker => {
      if (marker.IconLookup === iconUrl) {
        markerObject.Url = marker.IconUrl;
      }
    });
    return markerObject;
  }

}
