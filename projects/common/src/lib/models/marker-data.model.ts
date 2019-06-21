import { MapMarker } from './map-marker.model';
import { MarkerInfo } from './marker-info.model';

export class MarkerData{
    marker: MapMarker;

    mapMarkerSet: MarkerInfo[];

    primaryMapId: any;

    isEdit: boolean;

    constructor(marker: MapMarker, mapMarkerSet: MarkerInfo[], primaryMapId:any, isEdit: boolean){
        this.marker = marker;
        this.mapMarkerSet = mapMarkerSet;
        this.primaryMapId = primaryMapId;
        this.isEdit = isEdit;
    }
}