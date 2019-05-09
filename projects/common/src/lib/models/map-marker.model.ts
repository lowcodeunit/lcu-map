export class MapMarker {

    /**
     * The title of the marker which will show upon mouseover
     */
    title: string;

    /**
     * The icon name that should match the iconLookup in the MarkerInfo model
     */
    iconName: string;

    /**
     * The latitude of the map marker
     */
    lat: number;

    /**
     * The longitude of the map marker
     */
    lng: number;

    /**
     * The object representing all the necessary data to display an icon on the map
     * 
     * It is not passed in with the markers, but will be populated by the map service
     */
    iconImageObject?: {};

    /**
     * 
     * @param icon The object containing data for a single point (a map marker) on a map (<agm-map>)
     */
    constructor(icon: MapMarker) {
        this.title = icon.title;
        this.iconName = icon.iconName;
        this.lat = icon.lat;
        this.lng = icon.lng;
    }
}