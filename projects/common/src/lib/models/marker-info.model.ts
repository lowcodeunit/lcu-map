export class MarkerInfo {

    /**
     * The lookup for the icon that will be referenced by the iconName in the MapMarker model
     */
    public IconLookup: string;

    /**
     * The official name to display in any list of names
     */
    public IconName: string;

    /**
     * The path that points to the image to be displayed
     */
    public IconUrl: string;

    /**
     * 
     * @param Icon The object containing lookup (IconLookup), display (IconName), and path (IconUrl) data for an icon
     */
    constructor(icon) {
        this.IconLookup = icon.IconLookup;
        this.IconName = icon.IconName;
        this.IconUrl = icon.IconUrl;
    }
}