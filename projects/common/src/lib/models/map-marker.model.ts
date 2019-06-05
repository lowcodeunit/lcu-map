export class MapMarker {

    /**
     * The map id which associates an individual marker with a single map
     */
    map_id: string;

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
     * Optional phone number for a place
     */
    phoneNumber?: string;
    
    /**
     * Optional link to instagram account
     */
    instagram?: string;

    /**
     * Optional town associated with with location
     */
    town?: string;

    /**
     * Optional country associated with location
     */
    country?: string;
    /**
     * Optional link to website
     */
    website?: string;
    /**
     * The url to the icon
     */
    iconUrl?: string;

    /**
     * The order in which the locations are saved
     */
    orderIndex?: number;

    /**
     * The street address for the location
     */
    address?: string;

    /**
     * the link to book reservations for that location
     */
    reservations?: string;

    /**
     * The link to the menu for the location
     */
    menu?: string;

    /**
     * The star rating for that location
     */
    starRating?: number;

    /**
     * The awards for that location
     */
    awards?: string;

    /**
     * A link to media pertaining to the location
     */
    media?: string;

    /**
     * General info in the location
     */
    generalInfo?: string;


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
        this.phoneNumber = icon.phoneNumber;
        this.instagram = icon.instagram;
        this.town = icon.town;
        this.country = icon.country;
        this.website = icon.website;
        this.iconUrl = icon.iconUrl;
        this.orderIndex = icon.orderIndex;
        this.address = icon.address;
        this.reservations = icon.reservations;
        this.menu = icon.menu;
        this.starRating = icon.starRating;
        this.awards = icon.awards;
        this.media = icon.media;
        this.generalInfo = icon.generalInfo;
    }

    
}