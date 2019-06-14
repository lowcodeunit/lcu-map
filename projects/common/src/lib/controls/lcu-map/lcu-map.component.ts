import { Component, OnInit, Input, Output, EventEmitter, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IndividualMap } from '../../models/individual-map.model';
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
import { MapService } from '../../services/map.service';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { InfoDisplayService } from '../../services/info-display.service';
import { MarkerData } from '../../models/marker-data.model';


@Component({
  selector: 'lcu-map',
  templateUrl: './lcu-map.component.html',
  styleUrls: ['./lcu-map.component.scss']
})
export class LcuMapComponent implements OnInit {

  // FIELDS



  /**
   * The place id of the location the user clicked on
   * 
   * This will be replaced by a direct call when AGM team puts out fix that allows user's click event to return place id directly from (mapClick)
   */
  protected placeId;

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
   * Input property that represents the current secondary maps (layers)
   */
  protected _secondaryMaps;

  /**
   * The subscription for the basic-info-window modal
   */
  protected markerInfoSubscription: Subscription;


  protected observerSubscription: Subscription;




  // PROPERTIES 

  public MarkerData: MarkerData;
  /**
   * Is true when screen size is small or xs, false otherwise
   */
  public IsMobile: boolean;
  /**
   * The boolean that is passed to the footer to display or not display the footer
   */
   public DisplayFooter: boolean;

  /**
   * The current map marker that someone has selected to diplay info
   */
  public CurrentMapMarker: MapMarker;

  /**
   * Input property that represents the current primary map
   */
  public _currentMapModel;

  /**
   * The maps (in layer form) that are currently being displayed
   */
  public CurrentlyActiveLayers: Array<IndividualMap>;

  /**
   * The location markers that are currently being displayed
   */
  public CurrentlyActiveLocations: Array<MapMarker>;

  /**
   * Boolean that determines whether or not the search bar should be shown
   */
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
  // public SecondaryLocations: Array<any>;

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
    * Breakpoints for screen sizes
    */
  protected monitorBreakpoints(): void {
    this.observerSubscription = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result: BreakpointState) => {
        console.log(result.matches);
        console.log(result);
        this.IsMobile = result.matches;
        this.observerSubscription.unsubscribe();
      });
  }

  /**
   * Takes a MapMarker passed from the legend and passes it to DisplayMarkerInfo  
   */
  @Input('display-basic-info-window')
  public set DisplayBasicInfoWindow(val: MapMarker) {
    this.DisplayMarkerInfo(val);
  }

  /**
   * Setter for the input '_panTo' field - also sets the lat/lng and zoom of the current map model
   */
  @Input('pan-to')
  public set PanTo(value: { lat: number, lng: number, zoom: number }) {
    this._panTo = value;
    if (this._currentMapModel) {
      this._currentMapModel.origin.lat = value.lat;
      this._currentMapModel.origin.lng = value.lng;
      this._currentMapModel.zoom = value.zoom;
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
   * The setter for the current map model
   */
  @Input('map-model')
  // MapModel?: IndividualMap = Constants.DEFAULT_PRIMARY_MAP_CONFIGURATION;
  public set MapModel(value: IndividualMap) {
    this._currentMapModel = value;
    this.CurrentlyActiveLocations = [];
    this._currentMapModel.locationList.forEach(loc => {
      loc.iconImageObject = this.mapConverions.ConvertIconObject(loc.iconName, this.MapMarkerSet);
    });
    this.toggleActiveMapLayer(this._currentMapModel);
  }

  /**
   * The getter for the current map model
   */
  public get MapModel() {
    return this._currentMapModel;
  }

  /**
   * Setter for the input field '_secondaryMaps'
   */
  @Input('secondary-maps')
  // SecondaryMaps: IndividualMap[] = Constants.DEFAULT_SECONDARY_MAP_ARRAY;
  public set SecondaryMaps(value: Array<IndividualMap>) {
    this._secondaryMaps = value;
  }

  /**
   * Getter for the input field '._secondaryMaps'
   */
  public get SecondaryMaps() {
    return this._secondaryMaps;
  }

  /**
   * The event emitted when a map is saved (the saved map is emitted)
   */
  @Output('map-saved')
  public MapSaved: EventEmitter<IndividualMap>;

  /**
 * The event emitted when the primary map's location list is altered (the new map is emitted)
 */
  @Output('primary-map-location-list-changed')
  public PrimaryMapLocationListChanged: EventEmitter<IndividualMap>;

  /**
   * The event emitted when a layer is clicked - emits list of active secondary locations
   */
  @Output('visible-location-list-changed')
  public VisibleLocationListChanged: EventEmitter<MapMarker[]>;

  // CONSTRUCTORS

  constructor(private dialog: MatDialog, private mapConverions: MapConversions,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private wrapper: GoogleMapsAPIWrapper,
    private mapService: MapService,
    private infoDisplayService: InfoDisplayService,
    protected breakpointObserver: BreakpointObserver) {
    this.MapSaved = new EventEmitter,
      this.PrimaryMapLocationListChanged = new EventEmitter;
    this.VisibleLocationListChanged = new EventEmitter;
    this.CurrentlyActiveLocations = new Array<MapMarker>();
    this.CurrentlyActiveLayers = new Array<IndividualMap>();
    this.monitorBreakpoints();

  }

  // LIFE CYCLE
  ngOnInit() {
    this._currentMapModel.locationList.forEach(loc => {
      loc.iconImageObject = this.mapConverions.ConvertIconObject(loc.iconName, this.MapMarkerSet);
    });
    this.currentBounds = { neLat: 0, neLng: 0, swLat: 0, swLng: 0 };
    this.runAutocompleteSearchPrep(); // set up the listener for the location search box
    this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
  }

  ngOnChanges(value) {
    if (value.MapModel) {
    }
    this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
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

        // this service call gets the place_id from the click listener attached to the 
        // mapReady event... this (along with the mapReady click listener) will be
        // switched out for the normal mapClick event once the AGM team releases the 
        // version where the place_id is passed back from there
        this.mapService.GetPlaceDetails(this.placeId).subscribe((res: any) => {
          if (res.result !== undefined && res !== null) {
            let townIndex = -1;
            let countryIndex = -1;
            res.result.address_components.forEach((comp, idx) => {
              if (comp.types.length > 0) {
                if (comp.types.includes('locality')) {
                  townIndex = idx;
                }
                if (comp.types.includes('country')) {
                  countryIndex = idx;
                }
              }
            });
            const marker = {
              title: res.result.name,
              lat: res.result.geometry.location.lat,
              lng: res.result.geometry.location.lng,
              map_id: this._currentMapModel,
              iconName: '',
              phoneNumber: res.result.formatted_phone_number,
              town: res.result.address_components[townIndex].long_name,
              country: res.result.address_components[countryIndex].long_name
            };
            this.DisplayMarkerInfo(marker);
          }
        });

        // this is temporarily disabled (adding a random map marker to any lat/lng on the map)
        // it will be commented back in at a later sprint when it is required again:

        // const dialogRef = this.dialog.open(AddMapMarkerComponent, {
        //   data: {
        //     lat: event.coords.lat,
        //     lng: event.coords.lng,
        //     iconList: this.MapMarkerSet,
        //     primary_map_id: this._currentMapModel.id
        //   }
        // });

        // dialogRef.afterClosed().subscribe(res => {
        //   if (res) {
        //     this._currentMapModel.locationList.push(res);
        //     if (this.CurrentlyActiveLayers.filter(map => map.id === this._currentMapModel.id).length > 0) {
        //       this.CurrentlyActiveLocations.push(res); // if primary map is being shown, show new icon as well
        //     }
        //     this.PrimaryMapLocationListChanged.emit(this._currentMapModel);
        //     this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
        //   }
        // }); // END for saving points on map that are NOT Google Maps POIs:

        // }); // end of 'subscribe' to mapService
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
        locationMarkers: this.stripOutsideLocations(this.CurrentlyActiveLocations, this.currentBounds),
        // for now, we include all displayed secondary map markers in a newly created map:
        // secondaryMarkers: this.stripOutsideLocations(this.SecondaryLocations, this.currentBounds),
        mapMarkerSet: this.MapMarkerSet
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res) {
          this.MapSaved.emit(res);
          // console.log('saved map: ', res)
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

    this.toggleActiveMapLayer(layer);

    // this is just for emitting the current list of active locs (currently displayed locations)
    setTimeout(x => {
      // emits the currently visible map markers for use in legend
      this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
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
    // delete later
  }

  public ShowFooter(val: boolean):void{
    this.DisplayFooter = val;
  }
  /**
   * When a user clicks on an icon it calls this method which opens the BasicInfoWindowComponent
   * 
   * @param marker holds the MapMarker with all its information to be displayed in the basic info window
   */
  //TODO: Change so we don't use setTimeout in timeout in lcu-map.component.ts DisplayInfoMarker()  waiting for state also in timeout in basic-info-window.components.ts
  public DisplayMarkerInfo(marker: MapMarker) {
     //this.CurrentMapMarker = marker;
    // this.CurrentMapMarker = this.infoDisplayService.CurrentMapMarker;
    // this.infoDisplayService.ShowFooter = true;
    //console.log("marker raw = ", marker);
    this.MarkerData = new MarkerData(marker, this.MapMarkerSet, this._currentMapModel.id);
    console.log("Marker lcu-map = ", this.MarkerData.marker);
    if(this.IsMobile){
      this.ShowFooter(true);
    }
    if (this.IsMobile === false) {
      if (marker) {
        setTimeout(() => {
          const dialogRef = this.dialog.open(BasicInfoWindowComponent, { data: { marker: marker, markerSet: this.MapMarkerSet, primary_map_id: this._currentMapModel.id } });
          this.markerInfoSubscription = dialogRef.afterClosed().subscribe(
            data => {
              // console.log("Dialog output:", data)
              // console.log(dialogRef);
              if (data !== undefined && data !== null) {
                this._currentMapModel.locationList.push(data);
                this.CurrentlyActiveLocations.push(data);
                this.PrimaryMapLocationListChanged.emit(this._currentMapModel);
              }
            })
        }, 50);
      }
    }
  }

  /**
   * 
   * @param map The map onto which the click event listener will be attached
   * 
   * Attaches a click listener to the map that returns an object that includes the place id
   * 
   * The place id is then assigned to the placeId field for use in the (mapClick) event
   * 
   * This will be removed once AGM team releases code that passes back the place id on (mapClick) directly
   */
  public OnMapReady(map) {
    map.addListener('click', (loc) => {
      loc.stop(); // stops the event that opens the default G-Maps info window
      this.placeId = loc.placeId;
    });
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
          this._currentMapModel.origin.lat = place.geometry.location.lat();
          this._currentMapModel.origin.lng = place.geometry.location.lng();
          this._currentMapModel.zoom = 16;

          let townIndex = -1;
          let countryIndex = -1;
          place.address_components.forEach((comp, idx) => {
            if (comp.types.length > 0) {
              if (comp.types.includes('locality')) {
                townIndex = idx;
              }
              if (comp.types.includes('country')) {
                countryIndex = idx;
              }
            }
          });

          this.DisplayMarkerInfo(new MapMarker({
            map_id: this._currentMapModel.id,
            title: place.name,
            iconName: place.icon,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            phoneNumber: place.formatted_phone_number,
            website: place.website,
            town: place.address_components[townIndex].long_name,
            country: place.address_components[countryIndex].long_name
          }));
        });
      });
    });
  }

  /**
   * 
   * @param locations An array of locations
   * 
   * Returns the first item of the array of locations that is of type "establishment"
   */
  protected getClosestEstablishment(locations: Array<any>) {
    let filteredLoc = locations.filter(loc => loc.types.includes('establishment'));
    return filteredLoc[0];
    // TODO: further refine this later to make sure the returned location is the closest to the clicked lat/lng
  }

  protected toggleActiveMapLayer(layer?: IndividualMap) {
    if (layer) { // in other words, if the layer click was a secondary layer
      if (this.CurrentlyActiveLayers.filter(map => map.id === layer.id).length === 0) {
        this.CurrentlyActiveLayers.push(layer);
        this.CurrentlyActiveLocations = this.addLayerLocations(this.CurrentlyActiveLocations, layer);
      } else {
        this.CurrentlyActiveLayers = this.CurrentlyActiveLayers.filter(map => map.id !== layer.id);
        this.CurrentlyActiveLocations = this.removeLayerLocations(this.CurrentlyActiveLocations, layer);
      }
    } else { // if the layer clicked was the primary layer
      if (this.CurrentlyActiveLayers.filter(map => map.id === this._currentMapModel.id).length === 0) {
        this.CurrentlyActiveLayers.push(this._currentMapModel);
        this.CurrentlyActiveLocations = this.addLayerLocations(this.CurrentlyActiveLocations, this._currentMapModel);
      } else {
        this.CurrentlyActiveLayers = this.CurrentlyActiveLayers.filter(map => map.id !== this._currentMapModel.id);
        this.CurrentlyActiveLocations = this.removeLayerLocations(this.CurrentlyActiveLocations, this._currentMapModel);
      }
    }
    this.CurrentlyActiveLocations.forEach(loc => {
      loc.iconImageObject = this.mapConverions.ConvertIconObject(loc.iconName, this.MapMarkerSet)
    });
  }

  protected addLayerLocations(locList: Array<MapMarker>, layer: IndividualMap) {
    layer.locationList.forEach(loc => {
      locList.push(loc)
    });
    return locList;
  }

  protected removeLayerLocations(locList: Array<MapMarker>, layer: IndividualMap) {
    return locList.filter(loc => loc.map_id !== layer.id);
  }

}