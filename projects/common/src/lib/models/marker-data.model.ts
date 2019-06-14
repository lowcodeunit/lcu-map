import { MapMarker } from './map-marker.model';
import { MarkerInfo } from './marker-info.model';

export class MarkerData{
    marker: MapMarker;

    mapMarkerSet: MarkerInfo[];

    primaryMapId: any;

    constructor(marker: MapMarker, mapMarkerSet: MarkerInfo[], primaryMapId:any){
        this.marker = marker;
        this.mapMarkerSet = mapMarkerSet;
        this.primaryMapId = primaryMapId;
    }
}