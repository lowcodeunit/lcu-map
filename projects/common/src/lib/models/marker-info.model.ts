export class MarkerInfo {

    /**
     * The lookup for the icon that will be referenced by the iconName in the MapMarker model
     */
    iconLookup: string;

    /**
     * The official name to display in any list of names
     */
    iconName: string;

    /**
     * The path that points to the image to be displayed
     */
    iconUrl: string;

    constructor(icon) {
        this.iconLookup = icon.iconLookup;
        this.iconName = icon.iconName;
        this.iconUrl = icon.iconUrl;
    }
}