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
    if (!markerSet || markerSet.length === 0) {
      return;
    }
    const markerObject: IconImageObject = new IconImageObject('', { width: 17, height: 17 } );
    // markerObject.url = '';
    // markerObject.scaledSize = { width: 40, height: 40 };
    markerSet.forEach(marker => {
      if (marker.IconLookup.toLowerCase() === iconUrl.toLowerCase()) {
        markerObject.url = marker.IconUrl;
      }
    });
    // console.log("marker Object = ", markerObject);
    return markerObject;
  }

}
