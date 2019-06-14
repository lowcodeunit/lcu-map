import { Injectable } from '@angular/core';
import { MapMarker } from '../models/map-marker.model';

@Injectable({
  providedIn: 'root'
})
export class InfoDisplayService {
  public ShowFooter: boolean;

  public CurrentMapMarker: MapMarker;

  constructor() { }


}
