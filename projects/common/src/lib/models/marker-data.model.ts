import { MapMarker } from './map-marker.model';
import { MarkerInfo } from './marker-info.model';
/**
 * This Class contains the required information to be sent to the basic info and footer components
 */
export class MarkerData{
    /**
     * The MapMarker to diplay
     */
    marker: MapMarker;
    /**
     * The Markers Icon info
     */
    mapMarkerSet: MarkerInfo[];
    /**
     * The primary map in which the MapMarker belongs to
     */
    primaryMapId: any;
    /**
     * Is the MapMarker being pulled from storage to be edited
     */
    isEdit: boolean;

    constructor(marker: MapMarker, mapMarkerSet: MarkerInfo[], primaryMapId:any, isEdit: boolean){
        this.marker = marker;
        this.mapMarkerSet = mapMarkerSet;
        this.primaryMapId = primaryMapId;
        this.isEdit = isEdit;
    }
}