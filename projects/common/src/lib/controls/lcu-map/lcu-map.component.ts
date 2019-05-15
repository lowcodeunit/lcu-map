import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IndividualMap } from '../../models/individual-map.model';
import { AddMapMarkerComponent } from './add-map-marker/add-map-marker.component';
import { MapService } from '../../services/map.service';
import { SaveMapComponent } from './save-map/save-map.component';
import { MarkerInfo } from '../../models/marker-info.model';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subscription } from 'rxjs';
import { MapMarker } from '@lcu-ide/dynamic-map-common/lcu.api';

@Component({
  selector: 'lcu-map',
  templateUrl: './lcu-map.component.html',
  styleUrls: ['./lcu-map.component.scss']
})
export class LcuMapComponent implements OnInit {

  chosenView: string = 'roadmap';
  mapViews: {}[] = [
    { value: 'roadmap', display: 'Standard' },
    { value: 'satellite', display: 'Satellite' },
    { value: 'terrain', display: 'Topographical' }
  ]

  public primaryMarkersSelected: boolean = true;

  // FIELDS

  /**
   * The public map model converted from the passed IndividualMap input
   */
  public CurrentMapModel: IndividualMap;

  public SecondaryLocations: Array<any>;

  private currentBounds: any;

  // PROPERTIES

  /**
   * Boolean that determines whether or not the user is in the middle of a double-click
   */
  private isDoubleClick: boolean = false;

  /**
   * The maximum amount of time in milliseconds the average person expects between clicks of a double-click
   */
  private expectedDoubleClickElapsedTime: number = 500;


  @Input() MapMarkerSet: MarkerInfo[] = [ // sets a default set of icons if non passed in
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

  /**
   * The map model object (IndividualMap model) containing all the settings for the map to be displayed
   */
  @Input() mapModel?: IndividualMap = { // sets a default map if none passed in
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

  @Input() SecondaryMaps: IndividualMap[] = [
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
  ]

  /**
   * The even emitted when a map is saved (the saved map is emitted)
   */
  @Output('MapSaved')
  public MapSaved: EventEmitter<IndividualMap>;

  // CONSTRUCTORS
  constructor(private dialog: MatDialog, private mapService: MapService, private wrapper: GoogleMapsAPIWrapper) {
    this.MapSaved = new EventEmitter;
  }
  mapSubscription = new Subscription;
  // LIFE CYCLE
  ngOnInit() {
    this.CurrentMapModel = this.mapModel;
    this.CurrentMapModel.locationList.forEach(loc => {
      loc.iconImageObject = this.mapService.ConvertIconObject(loc.iconName, this.MapMarkerSet);
    });
    this.SecondaryLocations = [];
    this.SecondaryMaps.forEach(map => {
      map.locationList.forEach(loc => {
        this.SecondaryLocations.push(
          {
            title: loc.title,
            lat: loc.lat,
            lng: loc.lng,
            iconName: loc.iconName,
            iconImageObject: this.mapService.ConvertIconObject(loc.iconName, this.MapMarkerSet),
            mapTitle: map.title
          }
        )
      })
    });
    this.currentBounds = { neLat: 0, neLng: 0, swLat: 0, swLng: 0 }
  }

  // API METHODS

  /**
   * 
   * @param event The event passed in upon user clicking the map
   * 
   * Runs when user single-clicks location on map. Modal displays prompting user to enter info about custom location marker
   */
  public OnChoseLocation(event): void {
    setTimeout(x => { // set timeout to half a second to wait for possibility of double click (mimic Google Maps)
      if (!this.isDoubleClick) {
        const dialogRef = this.dialog.open(AddMapMarkerComponent, {
          data: {
            lat: event.coords.lat,
            lng: event.coords.lng,
            iconList: this.MapMarkerSet
          }
        });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.CurrentMapModel.locationList.push(res);
          }
        });
      }
    }, this.expectedDoubleClickElapsedTime);
  }

  /**
   * 
   * @param event The event passed in upon user double-clicking the map
   * 
   * Function that sets property 'isDoubleClicked' to true for a moment.
   * 
   * This is necessary because when the events 'mapClick' and 'mapDblClick' appear on the same component, both will be fired
   */
  public OnMapDoubleClicked(event) {
    this.isDoubleClick = true;
    setTimeout(x => {
      this.isDoubleClick = false;
    }, 500); // about after enough time it takes to zoom, turn off the "double-clicked" flag
  }

  /**
   * Activates the dialog for user to enter name of map which will then be 'saved'
   */
  public ActivateSaveMapDialog(map) {
    console.log(this.wrapper)
    const dialogRef = this.dialog.open(SaveMapComponent, {
      data: {
        map: map,
        locationMarkers: this.stripOutsideLocations(this.CurrentMapModel.locationList, this.currentBounds),
        mapMarkerSet: this.MapMarkerSet
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (res) {
          this.MapSaved.emit(res);
          console.log('saved map: ', res)
        }
      }
    });
  }

  public LayerClicked(layer) {
    this.SecondaryLocations.forEach(loc => {
      if (layer.title === loc.mapTitle) {
        loc.showMarker = loc.showMarker === true ? false : true;
      }
    })
  }

  public boundsChange(e) {
    this.currentBounds.neLat = e.getNorthEast().lat();
    this.currentBounds.neLng = e.getNorthEast().lng();
    this.currentBounds.swLat = e.getSouthWest().lat();
    this.currentBounds.swLng = e.getSouthWest().lng();
  }

  /**
   * 
   * @param lat The latitude to pan to
   * @param lng The longitude to pan to
   * 
   * Takes a lat / lng and pans to that point on the map
   */
  public UpdateLatLng(lat, lng) {
    this.CurrentMapModel.origin.lat = lat;
    this.CurrentMapModel.origin.lng = lng;
  }

  // HELPERS

  /**
   * 
   * @param locationList The list of locations that come with the map that should be stripped
   * @param bounds The bounds used to determine which locations to strip
   * 
   * Strips locations that don't exist within the bounds and returns the altered array
   * 
   * TODO: write the edge case for locations that exist on map where lat or lng overlap
   */
  private stripOutsideLocations(locationList: Array<MapMarker>, bounds: any) {
    return locationList.filter(loc =>
      loc.lat <= bounds.neLat &&
      loc.lat >= bounds.swLat &&
      loc.lng <= bounds.neLng &&
      loc.lng >= bounds.swLng
    )
  }

}