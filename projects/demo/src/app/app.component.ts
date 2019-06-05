import { Component, OnInit, ViewChild } from '@angular/core';
import { MarkerInfo } from '@lcu-ide/dynamic-map-common/lib/models/marker-info.model';
import { IndividualMap } from 'projects/common/src/lcu.api';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // FIELDS

  // PROPERTIES

  /**
   * The map configuration to pass in to the map instance
   */
  public MapConfig: IndividualMap;

  /**
   * The icon set to pass in that will determine the available icons for the map
   */
  public IconSet: MarkerInfo[];

  public SecMaps: Array<IndividualMap> = [
    {
      id: '123',
      title: 'Boulder Bars and Breweries',
      origin: { lat: 40.037757, lng: -105.378324 },
      zoom: 13,
      locationList: [
        { title: 'Brewsky\'s', lat: 40.012557, lng: -105.268199, iconName: 'brewery', map_id: '123' },
        { title: 'Phat Bar', lat: 40.022657, lng: -105.268199, iconName: 'bar', map_id: '123' },
        { title: 'Bar of the Rockies', lat: 40.026757, lng: -105.277199, iconName: 'bar', map_id: '123' },
        { title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery', map_id: '123' },
      ]
    },
    {
      id: '456',
      title: 'Broomfield Restaurants',
      origin: { lat: 40.027757, lng: -105.378324 },
      zoom: 13,
      locationList: [
        { title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant', map_id: '456' },
        { title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant', map_id: '456' },
        { title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant', map_id: '456' },
        { title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery', map_id: '456' },
        { title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar', map_id: '456' }
      ]
    }
  ]

  /**
   * Passed to the @Input for panning, generates a random 'pan to' location and zoom level
   */
  public RandomPan: { lat: number, lng: number, zoom: number } = { lat: 40, lng: -105, zoom: 10 }

  // CONSTRUCTORS

  // LIFE CYCLE

  ngOnInit() {
    this.MapConfig = {
      id: '789',
      title: 'Boulder - All',
      origin: { lat: 40.037757, lng: -105.278324 },
      zoom: 13,
      locationList: [
        { title: 'Favorite UNESCO', lat: 40.011657, lng: -105.288199, iconName: 'UNESCO', map_id: '789',address: '1234 abc court', menu:'menu.com', reservations: 'reservations.com', starRating:3 },
        { title: 'Nice museum', lat: 40.049757, lng: -105.298199, iconName: 'museum', map_id: '789' },
        { title: 'Good lodging', lat: 40.028757, lng: -105.278199, iconName: 'lodging', town: 'Boulder', country: 'USA', phoneNumber: '303-123-4567', instagram: 'www', website: 'www', map_id: '789',address: '1234 abc court', menu:'menu.com', reservations: 'reservations.com', starRating:3.5, awards:"Best place to sleep 2019", media:"media.com", generalInfo:"Try to get a room that over looks the flattops"  },
        { title: 'Nice national park', lat: 40.051657, lng: -105.278199, iconName: 'national park', town: 'Boulder', country: 'USA', phoneNumber: '303-123-4567', instagram: 'www', map_id: '789',address: '1234 abc court', menu:'menu.com', reservations: 'reservations.com', starRating:3.25  }
      ]
    };
    this.IconSet = [ // this should be calling a service here
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
    ]
  }

  // API METHODS

  /**
   * 
   * @param map The function run when the map is successfully saved
   */
  public MapSaved(map) {
    console.log('saved map: ', map);
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
    this.MapConfig = {
      id: '2',
      title: 'Broomfield Food',
      origin: { lat: 39.923587, lng: -105.087146 },
      zoom: 13,
      locationList: [
        { title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant', map_id: '2' },
        { title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant', map_id: '2' },
        { title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant', map_id: '2' },
        { title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery', map_id: '2' },
        { title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar', map_id: '2' }
      ]
    }
  }

  public LoadSecMaps() {
    this.SecMaps = [
      {
        id: '1',
        title: 'Boulder Booze',
        origin: { lat: 40.037757, lng: -105.378324 },
        zoom: 13,
        locationList: [
          { title: 'Brewsky\'s', lat: 40.012557, lng: -105.268199, iconName: 'brewery', map_id: '1' },
          { title: 'Phat Bar', lat: 40.022657, lng: -105.268199, iconName: 'bar', map_id: '1' },
          { title: 'Bar of the Rockies', lat: 40.026757, lng: -105.277199, iconName: 'bar', map_id: '1' },
          { title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery', map_id: '1' },
        ]
      },
      {
        id: '2',
        title: 'Broomfield Food',
        origin: { lat: 39.923587, lng: -105.087146 },
        zoom: 13,
        locationList: [
          { title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant', map_id: '2' },
          { title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant', map_id: '2' },
          { title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant', map_id: '2' },
          { title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery', map_id: '2' },
          { title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar', map_id: '2' }
        ]
      },
      {
        id: '3',
        title: 'Boulder Sightseeing',
        origin: { lat: 40.037757, lng: -105.278324 },
        zoom: 13,
        locationList: [
          { title: 'Favorite Ski Resort', lat: 40.017557, lng: -105.278199, iconName: 'ski area', map_id: '3' },
          { title: 'Favorite hiking trail', lat: 40.027657, lng: -105.288199, iconName: 'national park', map_id: '3' },
          { title: 'Nice museum', lat: 40.037757, lng: -105.244199, iconName: 'museum', map_id: '3' },
          { title: 'Good park', lat: 40.047857, lng: -105.268199, iconName: 'national park', map_id: '3' },
          { title: 'Cheap Hotel', lat: 40.041857, lng: -105.268199, iconName: 'lodging', map_id: '3' }
        ]
      }
    ]
  }

  // HELPERS

}
