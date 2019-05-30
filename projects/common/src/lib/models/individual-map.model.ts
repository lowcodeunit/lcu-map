import { MapMarker } from '../models/map-marker.model';

export class IndividualMap {

    /**
     * The id of the map
     */
    id: number;

    /**
     * The title of the map
     */
    title: string;

    /**
     * The latitude / longitude that will be the starting point of the map
     */
    origin: {
        lat: number,
        lng: number
    };

    /**
     * The starting zoom level of the map
     */
    zoom: number;

    /**
     * The array of map markers that are included in the map
     */
    locationList: MapMarker[];

    /**
     * 
     * @param mapInfo The object containing the necessary data for displaying a map (<agm-map>)
     */
    constructor(mapInfo: IndividualMap) {
        this.title = mapInfo.title;
        this.origin = mapInfo.origin;
        this.zoom = mapInfo.zoom;
        this.locationList = mapInfo.locationList;
    }
}