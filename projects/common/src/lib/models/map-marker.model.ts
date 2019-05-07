export class MapMarker {

    /**
     * The title of the marker which will show upon mouseover
     */
    title: string;

    /**
     * The icon name to be displayed in a list of icon names
     */
    iconName: string | null | {};

    /**
     * The latitude of the map marker
     */
    lat: number;

    /**
     * The longitude of the map marker
     */
    lng: number;

    /**
     * The path to the image in the file system
     */
    iconImageUrl: string | {};

    /**
     * 
     * @param icon The object containing data for a single point (a map marker) on a map (<agm-map>)
     */
    constructor(icon: MapMarker) {
        this.title = icon.title;
        this.iconName = icon.iconName;
        this.iconImageUrl = icon.iconImageUrl;
        this.lat = icon.lat;
        this.lng = icon.lng;
    }
}