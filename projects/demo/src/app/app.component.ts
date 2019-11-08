import { Component, OnInit } from '@angular/core';
// import { IndividualMap } from 'projects/common/src/lcu.api';
import { MapMarker, UserMap, MarkerInfo } from 'projects/common/src/lcu.api';
import { UserLayer } from 'projects/common/src/lib/models/user-layer.model';

@Component({
    selector: 'lcu-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    // FIELDS

    // protected maps = this.getRealRepresentationOfMapList();

    // PROPERTIES

    public TestLocationSearchResults: any = [
        { ID: '41', Title: 'Nice museumzz', Latitude: 40.069757, Longitude: -105.298199, Country: 'USA', Icon: 'museum', LayerID: '789', Address: '321 Heyo Str', State: 'Colorado' },
        { ID: '42', Title: 'Good hotelzz', Latitude: 40.048757, Longitude: -105.278199, Icon: 'hotel', Address: '123 Sup Street', LayerID: '789', Country: 'USA', State: 'Colorado', Town: 'Hillbilly Town' }
    ]

    public VisibleLocations: Array<MapMarker>;

    /**
     * The map configuration to pass in to the map instance
     */
    public MapConfig: UserMap;

    public UserLayers: Array<UserLayer>;
    public SelectedUserLayers: Array<any>;

    /**
     * The icon set to pass in that will determine the available icons for the map
     */
    public IconSet: MarkerInfo[];

    public MasterVisLocs: Array<MapMarker>;

    public MapViewTypes = [
        { value: 'roadmap', display: 'Roadmap' },
        { value: 'hybrid', display: 'Hybrid' },
        { value: 'satellite', display: 'Satellite' },
        { value: 'terrain', display: 'Terrain' }
    ]

    public SecMaps: Array<UserMap> = [
        // {
        //     id: '123',
        //     title: 'Boulder Bars and Breweries',
        //     origin: { lat: 40.037757, lng: -105.378324 },
        //     zoom: 13,
        //     locationList: [
        //         { id: '30', title: 'Brewsky\'s', lat: 40.012557, lng: -105.268199, iconName: 'brewery', LayerID: '123' },
        //         { id: '31', title: 'Phat Bar', lat: 40.022657, lng: -105.268199, iconName: 'bar', LayerID: '123' },
        //         { id: '32', title: 'Bar of the Rockies', lat: 40.026757, lng: -105.277199, iconName: 'bar', LayerID: '123' },
        //         { id: '33', title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery', LayerID: '123' },
        //     ]
        // },
        // {
        //     id: '456',
        //     title: 'Broomfield Restaurants',
        //     origin: { lat: 40.027757, lng: -105.378324 },
        //     zoom: 13,
        //     locationList: [
        //         { id: '34', title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant', LayerID: '456' },
        //         { id: '35', title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant', LayerID: '456' },
        //         { id: '36', title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant', LayerID: '456' },
        //         { id: '37', title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery', LayerID: '456' },
        //         { id: '38', title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar', LayerID: '456' }
        //     ]
        // }
    ]


    /**
     * Passed to the @Input for panning, generates a random 'pan to' location and zoom level
     */
    public RandomPan: { lat: number, lng: number, zoom: number } = { lat: 40, lng: -105, zoom: 10 }

    // CONSTRUCTORS

    // LIFE CYCLE

    ngOnInit() {
        this.MapConfig = this.SecMaps[0];
        this.SecMaps = this.SecMaps.filter(x => {
            return x.ID !== this.MapConfig.ID;
        });
        this.MapConfig = {
            ID: '789',
            Title: 'Boulder - All',
            Latitude: 40.037757,
            Longitude: -105.278324,
            Zoom: 13,
            Coordinates: [1,2,3,4],
            Primary: true,
            Shared: true,
            Deletable: true,
            DefaultLayerID: 123
        };
        this.IconSet = [ // this should be calling a service here
            { IconLookup: 'restaurant', Icon: 'Restaurant', IconUrl: './assets/restaurant.png' },
            { IconLookup: 'UNESCO', Icon: 'UNESCO', IconUrl: './assets/UNESCO.png' },
            { IconLookup: 'museum', Icon: 'Museum', IconUrl: './assets/museum.png' },
            { IconLookup: 'brewery', Icon: 'Brewery', IconUrl: './assets/brewery.png' },
            { IconLookup: 'ski area', Icon: 'Ski Area', IconUrl: './assets/ski area.png' },
            { IconLookup: 'vineyard', Icon: 'Vineyard', IconUrl: './assets/vineyard.png' },
            { IconLookup: 'golf course', Icon: 'Golf Course', IconUrl: './assets/golf course.png' },
            { IconLookup: 'hotel', Icon: 'Hotel', IconUrl: './assets/lodging.png' },
            { IconLookup: 'national park', Icon: 'National Park', IconUrl: './assets/national park.png' },
            { IconLookup: 'bar', Icon: 'Bar', IconUrl: './assets/bar.png' },
            { IconLookup: 'ambl_marker', Icon: 'ambl_marker', IconUrl: './assets/ambl_marker.png' }
        ];
        this.MasterVisLocs = [
            { ID: '41', Title: 'Nice museum', Latitude: 40.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '42', Title: 'Best Hotel In Boulder Area That I Could Find', Latitude: 40.028757, Longitude: -105.278199, Icon: 'hotel', LayerID: '789', Instagram: "@vail", Country: "USA", Telephone:"303-123-4567", Town:"Boulder", State:"CO", Address:"123 Pearl St 80000" },
            { ID: '43', Title: 'Black Canyon of The Gunnison National Park', Latitude: 41.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789', State: "CO" },
            { ID: '44', Title: 'Belmond La Manoir aux Quat\'Saisons', Latitude: 42.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789', Town:"Boulder" },
            { ID: '45', Title: 'Nice museum', Latitude: 43.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '46', Title: 'Nice museum', Latitude: 44.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '47', Title: 'Nice museum', Latitude: 45.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '48', Title: 'Nice museum', Latitude: 46.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '49', Title: 'Nice museum', Latitude: 47.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '40', Title: 'Nice museum', Latitude: 48.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '51', Title: 'Nice museum', Latitude: 49.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '61', Title: 'Nice museum', Latitude: 50.049757, Longitude: -105.298199, Icon: 'museum', LayerID: '789' },
            { ID: '71', Title: 'Nice museum', Latitude: 40.049757, Longitude: -101.298199, Icon: 'museum', LayerID: '789' },
            { ID: '81', Title: 'Nice museum', Latitude: 40.049757, Longitude: -102.298199, Icon: 'museum', LayerID: '789' },
            { ID: '91', Title: 'Nice museum', Latitude: 40.049757, Longitude: -103.298199, Icon: 'museum', LayerID: '789' },
            { ID: '11', Title: 'Nice museum', Latitude: 40.049757, Longitude: -104.298199, Icon: 'museum', LayerID: '789' },
            { ID: '21', Title: 'Nice museum', Latitude: 40.049757, Longitude: -106.298199, Icon: 'museum', LayerID: '789' },
            { ID: '31', Title: 'Nice museum', Latitude: 40.049757, Longitude: -107.298199, Icon: 'museum', LayerID: '789' },
            { ID: '415', Title: 'Nice museum', Latitude: 40.049757, Longitude: -108.298199, Icon: 'museum', LayerID: '789' },
            { ID: '416', Title: 'Nice museum', Latitude: 40.049757, Longitude: -109.298199, Icon: 'museum', LayerID: '789' },
            { ID: '417', Title: 'Nice museum', Latitude: 40.049757, Longitude: -110.298199, Icon: 'museum', LayerID: '789' },

        ];
        this.UserLayers = [{ID: 123, Title: 'User', Shared: false, Deletable: false},
        {ID: 456, Title: 'Curated', Shared: true, Deletable: false},
        {ID: 789, Title: 'My Friend\'s Layer', Shared: true, Deletable: false}];
        this.SelectedUserLayers = [123,456];
    }

    // API METHODS

    public CustomSearchChanged(searchTerm) {
        // console.log('user typed: ', searchTerm);
        this.TestLocationSearchResults = {...this.TestLocationSearchResults};
        // console.log('sending in this as test result list: ', this.TestLocationSearchResults)
    }

    /**
     *
     * @param map The function run when the map is successfully saved
     */
    public MapSaved(map) {
        console.log('saved map: ', map);
    }

    public SearchLocationChosen(e) {
        // console.log(e)
    }

    /**
     *
     * @param lat The latitude to pan to
     * @param lng The longitude to pan to
     *
     * Upon clicking, the map will pan to the given location (0,0)
     */
    public GoToRandomLoc() {
        this.RandomPan = { lat: Math.floor(Math.random() * 50), lng: -103, zoom: Math.floor(Math.random() * 50) }
    }

    /**
     *
     * @param list The new list of active secondary locations
     *
     * Logs to the console the updated list of active secondary locations
     */
    public ListChanged(list) {
        // console.log('list of secondary locs: ', list);
    }

    public TopListButtonClicked() {
        alert('top list button clicked (from demo proj)')
    }

    /**
     *
     * @param map The updated version of the primary map
     *
     * Runs when the primary map is changed
     */
    public PrimMapChanged(map) {
        console.log(map); // this can be a call to save the primary map because the location list has changed
    }

    public GoToRandomMap() {
        // this.MapConfig = {
        //     ID: '2',
        //     Title: 'Broomfield Food',
        //     Latitude: 39.923587,
        //     Longitude: -105.087146,
            // Zoom: 13,
            // locationList: [
            //     { id: '44', title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant', LayerID: '2' },
            //     { id: '45', title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant', LayerID: '2' },
            //     { id: '46', title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant', LayerID: '2' },
            //     { id: '47', title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery', LayerID: '2' },
            //     { id: '48', title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar', LayerID: '2' }
            // ]
        // }
    }

    public LoadSecMaps() {

    }

    public SimulateNewMapSet() {
        // this.MapConfig = this.maps[1];
        // this.SecMaps = this.maps.filter(x => {
        //     return x.ID !== this.MapConfig.ID;
        // });
    }

    public LayerChecked(layer) {
        console.log('layer checked: ', layer)
    }

    public LayerUnchecked(layer) {
        console.log('layer UNchecked: ', layer)
    }
}
