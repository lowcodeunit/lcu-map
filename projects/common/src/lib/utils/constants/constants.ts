import { MarkerInfo } from '@lcu-ide/dynamic-map-common/lcu.api';
import { IndividualMap } from '../../models/individual-map.model';

export class Constants {

    // DEFAULTS

    public static readonly DEFAULT_PRIMARY_MAP_CONFIGURATION: IndividualMap = {
        title: 'Default Map (Primary)',
        origin: { lat: 40.037757, lng: -105.278324 },
        zoom: 13,
        locationList: [
            { title: 'Favorite steak house', lat: 40.017557, lng: -105.278199, iconName: 'restaurant' },
            { title: 'Favorite UNESCO', lat: 40.027657, lng: -105.288199, iconName: 'UNESCO' },
            { title: 'Nice museum', lat: 40.037757, lng: -105.298199, iconName: 'museum' },
            { title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery' },
            { title: 'Favorite ski area', lat: 40.057557, lng: -105.288199, iconName: 'ski area' },
            { title: 'Favorite vineyard', lat: 40.060657, lng: -105.298199, iconName: 'vineyard' },
            { title: 'Nice golf course', lat: 40.037757, lng: -105.258199, iconName: 'golf course' },
            { title: 'Good lodging', lat: 40.037757, lng: -105.278199, iconName: 'lodging' },
            { title: 'Nice national park', lat: 40.060657, lng: -105.278199, iconName: 'national park' },
            { title: 'Good bar', lat: 40.017557, lng: -105.288199, iconName: 'bar' }
        ]
    };

    public static readonly DEFAULT_SECONDARY_MAP_ARRAY: Array<IndividualMap> = [
        {
            title: 'Boulder Booze',
            origin: { lat: 40.037757, lng: -105.378324 },
            zoom: 13,
            locationList: [
                { title: 'Brewsky\'s', lat: 40.012557, lng: -105.268199, iconName: 'brewery' },
                { title: 'Phat Bar', lat: 40.022657, lng: -105.268199, iconName: 'bar' },
                { title: 'Bar of the Rockies', lat: 40.026757, lng: -105.277199, iconName: 'bar' },
                { title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery' },
            ]
        },
        {
            title: 'Broomfield Food',
            origin: { lat: 40.027757, lng: -105.378324 },
            zoom: 13,
            locationList: [
                { title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant' },
                { title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant' },
                { title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant' },
                { title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery' },
                { title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar' }
            ]
        },
        {
            title: 'Boulder Sightseeing',
            origin: { lat: 40.037757, lng: -105.278324 },
            zoom: 13,
            locationList: [
                { title: 'Favorite Ski Resort', lat: 40.017557, lng: -105.278199, iconName: 'ski area' },
                { title: 'Favorite hiking trail', lat: 40.027657, lng: -105.288199, iconName: 'national park' },
                { title: 'Nice museum', lat: 40.037757, lng: -105.244199, iconName: 'museum' },
                { title: 'Good park', lat: 40.047857, lng: -105.268199, iconName: 'national park' },
                { title: 'Cheap Hotel', lat: 40.041857, lng: -105.268199, iconName: 'lodging' }
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