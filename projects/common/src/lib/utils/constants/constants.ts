import { MarkerInfo } from '../../models/marker-info.model';
import { IndividualMap } from '../../models/individual-map.model';

export class Constants {

    // DEFAULTS

    public static readonly DEFAULT_PRIMARY_MAP_CONFIGURATION: IndividualMap = {
        id: '0',
        title: 'Default Map (Primary)',
        origin: { lat: 40.037757, lng: -105.278324 },
        zoom: 13,
        locationList: [
            { id: '1', title: 'Favorite steak house', lat: 40.017557, lng: -105.278199, iconName: 'restaurant', map_id: '0' },
            { id: '2', title: 'Favorite UNESCO', lat: 40.027657, lng: -105.288199, iconName: 'UNESCO', map_id: '0' },
            { id: '3', title: 'Nice museum', lat: 40.037757, lng: -105.298199, iconName: 'museum', map_id: '0' },
            { id: '4', title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery', map_id: '0' },
            { id: '5', title: 'Favorite ski area', lat: 40.057557, lng: -105.288199, iconName: 'ski area', map_id: '0' },
            { id: '6', title: 'Favorite vineyard', lat: 40.060657, lng: -105.298199, iconName: 'vineyard', map_id: '0' },
            { id: '7', title: 'Nice golf course', lat: 40.037757, lng: -105.258199, iconName: 'golf course', map_id: '0' },
            { id: '8', title: 'Good lodging', lat: 40.037757, lng: -105.278199, iconName: 'lodging', town:'Boulder', country:'USA', map_id: '0' },
            { id: '9', title: 'Nice national park', lat: 40.060657, lng: -105.278199, iconName: 'national park', map_id: '0' },
            { id: '10', title: 'Good bar', lat: 40.017557, lng: -105.288199, iconName: 'bar', map_id: '0' }
        ]
    };

    public static readonly DEFAULT_SECONDARY_MAP_ARRAY: Array<IndividualMap> = [
        {
            id: '1',
            title: 'Boulder Booze',
            origin: { lat: 40.037757, lng: -105.378324 },
            zoom: 13,
            locationList: [
                { id: '11', title: 'Brewsky\'s', lat: 40.012557, lng: -105.268199, iconName: 'brewery', map_id: '1' },
                { id: '12', title: 'Phat Bar', lat: 40.022657, lng: -105.268199, iconName: 'bar', map_id: '1' },
                { id: '13', title: 'Bar of the Rockies', lat: 40.026757, lng: -105.277199, iconName: 'bar', map_id: '1' },
                { id: '14', title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery', map_id: '1' },
            ]
        },
        {
            id: '2',
            title: 'Broomfield Food',
            origin: { lat: 39.923587, lng: -105.087146 },
            zoom: 13,
            locationList: [
                { id: '15', title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant', map_id: '2' },
                { id: '16', title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant', map_id: '2' },
                { id: '17', title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant', map_id: '2' },
                { id: '18', title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery', map_id: '2' },
                { id: '19', title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar', map_id: '2' }
            ]
        },
        {
            id: '3',
            title: 'Boulder Sightseeing',
            origin: { lat: 40.037757, lng: -105.278324 },
            zoom: 13,
            locationList: [
                { id: '20', title: 'Favorite Ski Resort', lat: 40.017557, lng: -105.278199, iconName: 'ski area', map_id: '3' },
                { id: '21', title: 'Favorite hiking trail', lat: 40.027657, lng: -105.288199, iconName: 'national park', map_id: '3' },
                { id: '22', title: 'Nice museum', lat: 40.037757, lng: -105.244199, iconName: 'museum', map_id: '3' },
                { id: '23', title: 'Good park', lat: 40.047857, lng: -105.268199, iconName: 'national park', map_id: '3' },
                { id: '24', title: 'Cheap Hotel', lat: 40.041857, lng: -105.268199, iconName: 'lodging', map_id: '3' }
            ]
        }
    ];

    public static readonly DEFAULT_MAP_MARKER_SET: Array<MarkerInfo> = [
        { iconLookup: 'restaurant', iconName: 'Restaurant', iconUrl: './assets/restaurant.png' },
        { iconLookup: 'UNESCO', iconName: 'UNESCO', iconUrl: './assets/UNESCO.png' },
        { iconLookup: 'museum', iconName: 'Museum', iconUrl: './assets/museum.png' },
        { iconLookup: 'brewery', iconName: 'Brewery', iconUrl: './assets/brewery.png' },
        { iconLookup: 'ski area', iconName: 'Ski Area', iconUrl: './assets/ski area.png' },
        { iconLookup: 'vineyard', iconName: 'Vineyard', iconUrl: './assets/vineyard.png' },
        { iconLookup: 'golf course', iconName: 'Golf Course', iconUrl: './assets/golf course.png' },
        { iconLookup: 'lodging', iconName: 'Lodging', iconUrl: './assets/lodging.png' },
        { iconLookup: 'national park', iconName: 'National Park', iconUrl: './assets/national park.png' },
        { iconLookup: 'bar', iconName: 'Bar', iconUrl: './assets/bar.png' }
    ];
}