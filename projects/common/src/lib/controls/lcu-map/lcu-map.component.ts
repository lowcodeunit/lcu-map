import { Component, OnInit, Input, Output, EventEmitter, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IndividualMap } from '../../models/individual-map.model';
import { AddMapMarkerComponent } from './add-map-marker/add-map-marker.component';
import { SaveMapComponent } from './save-map/save-map.component';
import { MarkerInfo } from '../../models/marker-info.model';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapMarker } from '../../models/map-marker.model';
import { Constants } from '../../utils/constants/constants';
import { MapConversions } from '../../utils/conversions';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
// @ts-ignore
import { } from '@types/googlemaps';
import { BasicInfoWindowComponent } from './basic-info-window/basic-info-window.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'lcu-map',
  templateUrl: './lcu-map.component.html',
  styleUrls: ['./lcu-map.component.scss']
})
export class LcuMapComponent implements OnInit {

  // FIELDS  

  /**
   * Boolean that determines whether or not the user is in the middle of a double-click
   */
  protected isDoubleClick: boolean = false;

  /**
   * The maximum amount of time in milliseconds the average person expects between clicks of a double-click
   */
  protected expectedDoubleClickElapsedTime: number = 500;

  /**
   * The NE and SW lat/lng set of the current map
   */
  protected currentBounds: { neLat: number, neLng: number, swLat: number, swLng: number };

  /**
   * Input property that allows panning to a certain lat/lng and zoom level on the current map
   */
  protected _panTo: { lat: number, lng: number, zoom: number };

  /**
   * The subscription for the basic-info-window modal
   */
  protected markerInfoSubscription: Subscription;

  // PROPERTIES

  public ShowSearchBar: boolean = false;

  /**
   * The map type (standard, satellite, topographical) - default is standard ('roadmap')
   */
  public CurrentMapViewType: string = 'roadmap';

  /**
   * The array of available map views to be chosen by the user (default is standard)
   */
  public MapViewTypes: {}[] = [
    { value: 'roadmap', display: 'Standard' },
    { value: 'satellite', display: 'Satellite' },
    { value: 'terrain', display: 'Topographical' }
  ]

  /**
   * Boolean that determines whether or not to show the markers of the current map (primary map)
   */
  public PrimaryMarkersSelected: boolean = true;

  /**
   * The public map model converted from the passed IndividualMap input
   */
  public CurrentMapModel: IndividualMap;

  /**
   * A conglomerated list of all the map markers of all the secondary (non-primary) maps
   */
  public SecondaryLocations: Array<any>;
  
  /**
   * The search input box
   */
  @ViewChild('search')
  public SearchElementRef: ElementRef;

  /**
   * The form control for the location search box
   */
  public SearchControl: FormControl;

  /**
   * Indicates whether temporary marker will be shown over the searched location
   */
  public ShowTempSearchMarker: boolean = false;

  /**
   * Takes a MapMarker passed from the legend and passes it to DisplayMarkerInfo  
   */
  @Input('display-basic-info-window')
  public set DisplayBasicInfoWindow(val: MapMarker){
    this.DisplayMarkerInfo(val);
  }

  /**
   * Setter for the input '_panTo' field - also sets the lat/lng and zoom of the current map model
   */
  @Input('pan-to')
  public set PanTo(value: { lat: number, lng: number, zoom: number }) {
    this._panTo = value;
    if (this.CurrentMapModel) {
      this.CurrentMapModel.origin.lat = value.lat;
      this.CurrentMapModel.origin.lng = value.lng;
      this.CurrentMapModel.zoom = value.zoom;
    }
  }


  /**
   * Getter for the field '_panTo'
   */
  public get PanTo() {
    return this._panTo;
  }

  /**
   * The set of map markers and image paths that will be used to determine available map markers for current map
   */
  @Input('map-marker-set')
  MapMarkerSet: MarkerInfo[] = Constants.DEFAULT_MAP_MARKER_SET;

  /**
   * The map model object (IndividualMap model) containing all the settings for the map to be displayed
   */
  @Input('map-model')
  MapModel?: IndividualMap = Constants.DEFAULT_PRIMARY_MAP_CONFIGURATION;

  /**
   * The array of secondary (non-primary) maps to be shown as 'layers' whose markers will be displayed on the current map
   */
  @Input('secondary-maps')
  SecondaryMaps: IndividualMap[] = Constants.DEFAULT_SECONDARY_MAP_ARRAY;

  /**
   * The even emitted when a map is saved (the saved map is emitted)
   */
  @Output('map-saved')
  public MapSaved: EventEmitter<IndividualMap>;

  /**
   * The event emitted when a layer is clicked - emits list of active secondary locations
   */
  @Output('visible-location-list-changed')
  public VisibleLocationListChanged: EventEmitter<MapMarker[]>;

  // CONSTRUCTORS

  constructor(private dialog: MatDialog, private mapConverions: MapConversions,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private wrapper: GoogleMapsAPIWrapper) {
    this.MapSaved = new EventEmitter;
    this.VisibleLocationListChanged = new EventEmitter;
    
  }

  // LIFE CYCLE

  ngOnInit() {
    this.CurrentMapModel = this.MapModel;
    this.CurrentMapModel.locationList.forEach(loc => {
      loc.iconImageObject = this.mapConverions.ConvertIconObject(loc.iconName, this.MapMarkerSet);
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
            iconImageObject: this.mapConverions.ConvertIconObject(loc.iconName, this.MapMarkerSet),
            mapTitle: map.title
          }
        )
      })
    });
    this.currentBounds = { neLat: 0, neLng: 0, swLat: 0, swLng: 0 };
    // set up the listener for the location search box:
    this.runAutocompleteSearchPrep();
  }

  // API METHODS

  /**
   * Toggles the location search bar hidden / shown
   */
  public ShowLocationSearchBarClicked() {
    this.ShowSearchBar = this.ShowSearchBar === true ? false : true;
  }

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
  public OnMapDoubleClicked(event): void {
    this.isDoubleClick = true;
    setTimeout(x => {
      this.isDoubleClick = false;
    }, 500); // about after enough time it takes to zoom, turn off the "double-clicked" flag
  }

  /**
   * Activates the dialog for user to enter name of map which will then be 'saved'
   */
  public ActivateSaveMapDialog(map): void {
    const dialogRef = this.dialog.open(SaveMapComponent, {
      data: {
        map,
        locationMarkers: this.stripOutsideLocations(this.CurrentMapModel.locationList, this.currentBounds),
        // for now, we include all displayed secondary map markers in a newly created map:
        secondaryMarkers: this.stripOutsideLocations(this.SecondaryLocations, this.currentBounds),
        mapMarkerSet: this.MapMarkerSet
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res) {
          this.MapSaved.emit(res);
          console.log('saved map: ', res)
        }
      }
    });
  }

  /**
   * 
   * @param layer The layer (map) configuration sent in when a "layer" checkbox is checked/unchecked
   * 
   * Displays / hides the map markers of the chosen layer (map) in the "layers" dropdown
   */
  public LayerClicked(layer?: IndividualMap): void {
    if (layer) {
      this.SecondaryLocations.forEach((loc) => {
        if (layer.title === loc.mapTitle) {
          loc.showMarker = loc.showMarker === true ? false : true;
        }
      })
    }

    let currentlyDisplayedLocations = this.SecondaryLocations.filter(loc => loc.showMarker === true);
    setTimeout(x => {
      if (this.PrimaryMarkersSelected) {
        this.CurrentMapModel.locationList.forEach((loc: MapMarker) => {
          currentlyDisplayedLocations.push(loc);
        })
      }
      // emits the currently visible map markers for use in legend
      this.VisibleLocationListChanged.emit(currentlyDisplayedLocations);
    }, 0)
  }

  /**
   * 
   * @param event The event sent every time the boundary of the map changes
   * 
   * Sets currentBounds to the map's exact boundary whenever the boundary of the map changes
   */
  public BoundsChange(event): void {
    this.currentBounds.neLat = event.getNorthEast().lat();
    this.currentBounds.neLng = event.getNorthEast().lng();
    this.currentBounds.swLat = event.getSouthWest().lat();
    this.currentBounds.swLng = event.getSouthWest().lng();
  }
  
  /**
   * When a location search is performed and a location is chosen, a marker will temporarily display over the chosen location
   */
  public TempSearchMarkerClicked() {
    this.ShowTempSearchMarker = false;
  }
  /**
   * When a user clicks on an icon it calls this method which opens the BasicInfoWindowComponent
   * 
   * @param marker holds the MapMarker with all its information to be displayed in the basic info window
   */
  public DisplayMarkerInfo(marker:MapMarker){    
    if(marker){
      const dialogRef = this.dialog.open(BasicInfoWindowComponent, {data: {marker: marker}});
      this.markerInfoSubscription = dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data)
          console.log(dialogRef);
        })
    }
  }

  // HELPERS

  /**
   * 
   * @param locationList The list of locations that come with the map that should be stripped
   * 
   * @param bounds The bounds used to determine which locations to strip
   * 
   * Strips locations that don't exist within the bounds and returns the altered array
   * 
   * TODO: write the edge case for locations that exist on map where lat or lng overlap
   */
  protected stripOutsideLocations(locationList: Array<MapMarker>, bounds: any): Array<MapMarker> {
    return locationList.filter((loc: MapMarker) =>
      loc.lat <= bounds.neLat &&
      loc.lat >= bounds.swLat &&
      loc.lng <= bounds.neLng &&
      loc.lng >= bounds.swLng
    )
  }

  /**
   * Runs the boiler plate code that sets up location searching for AGM Google Maps
   */
  protected runAutocompleteSearchPrep() {
    this.SearchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.SearchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.CurrentMapModel.origin.lat = place.geometry.location.lat();
          this.CurrentMapModel.origin.lng = place.geometry.location.lng();
          this.CurrentMapModel.zoom = 16;
          this.ShowTempSearchMarker = true;
        });
      });
    });
  }

}