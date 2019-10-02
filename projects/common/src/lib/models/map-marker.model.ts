import { IconImageObject } from './icon-image-object.model';

export class MapMarker {

    /**
     * The unique id of the individual map marker
     */
    public ID: any;

    public LayerID: string;

    /**
     * The title of the marker which will show upon mouseover
     */
    public Title: string;

    /**
     * The icon name that should match the IconLookup in the MarkerInfo model
     */
    public Icon: string;

    /**
     * The latitude of the map marker
     */
    public Latitude: number | string;

    /**
     * The longitude of the map marker
     */
    public Longitude: number | string;

    /**
     * Optional phone number for a place
     */
    public Telephone?: string;

    /**
     * Optional link to instagram account
     */
    public Instagram?: string;

    /**
     * Optional town associated with with location
     */
    public Town?: string;

    /**
     * Optional state associated with location
     */
    public State?: string;

    /**
     * Optional country associated with location
     */
    public Country?: string;

    /**
     * Optional link to website
     */
    public Website?: string;

    /**
     * The url to the icon
     */
    public IconUrl?: string;

    /**
     * The order in which the locations are saved
     */
    public OrderIndex?: number;

    /**
     * The street address for the location
     */
    public Address?: string;

    /**
     * the link to book reservations for that location
     */
    public Reservations?: string;

    /**
     * The link to the menu for the location
     */
    public Menu?: string;

    /**
     * The awards for that location
     */
    public Awards?: string;

    /**
     * A link to media pertaining to the location
     */
    public Media?: string;

    /**
     * A link to photos pertaining to the location
     */
    public Photos?: Array<string>;

    /**
     * General info on the location
     */
    public GeneralInfo?: string;

    /**
     * notes on the location
     */
    public Notes?: string;

    /**
     * the type of the location
     */
    public Type?: Array<string>;

    /**
     * The object representing all the necessary data to display an icon on the map
     *
     * It is not passed in with the markers, but will be populated by the map service
     */
    public IconImageObject?: IconImageObject;

    public GoogleLocationName?: string;

    /**
     * A boolean for toggling a location checkmark in the legend
     */
    public Checked?: boolean;


    public Hidden?: boolean;

    /**
     *
     * @param icon The object containing data for a single point (a map marker) on a map (<agm-map>)
     */
    constructor(icon: MapMarker) {
        this.Title = icon.Title;
        this.Icon = icon.Icon;
        this.Latitude = icon.Latitude;
        this.Longitude = icon.Longitude;
        this.Telephone = icon.Telephone;
        this.Instagram = icon.Instagram;
        this.Town = icon.Town;
        this.State = icon.State;
        this.Country = icon.Country;
        this.Website = icon.Website;
        this.IconUrl = icon.IconUrl;
        this.OrderIndex = icon.OrderIndex;
        this.Address = icon.Address;
        this.Reservations = icon.Reservations;
        this.Menu = icon.Menu;
        this.Awards = icon.Awards;
        this.Media = icon.Media;
        this.GeneralInfo = icon.GeneralInfo;
        this.Photos = icon.Photos;
        this.Notes = icon.Notes;
        this.Type = icon.Type;
        this.GoogleLocationName = icon.GoogleLocationName;
        this.Checked = icon.Checked;
        this.Hidden = icon.Hidden;
    }
}
