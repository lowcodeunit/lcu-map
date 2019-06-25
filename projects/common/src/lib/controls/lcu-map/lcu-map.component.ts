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
import { Subscription, Observable } from 'rxjs';
import { MapService } from '../../services/map.service';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { MarkerData } from '../../models/marker-data.model';
import * as uuid from 'uuid';
import { map, startWith } from 'rxjs/operators';





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
  protected placeId: string;

  /**
   * The list of custom marker options for use in the custom marker location search
   */
  protected options: MapMarker[];

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
  protected _secondaryMaps: Array<IndividualMap>;

  /**
   * The subscription for the basic-info-window modal
   */
  protected markerInfoSubscription: Subscription;



  protected observerSubscription: Subscription;

  protected isEdit: boolean;




  // PROPERTIES 

  /**
   * The new map marker returned from the footer
   */
  public NewMapMarker: MapMarker;

  /**
   * Data that is being passed to the footer
   */
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
   * Boolean that controls the checked/unchecked state of the primary checkbox (layer)
   */
  public PrimaryChecked: boolean;

  /**
   * Boolean that controls the checked/unchecked state of all the secondary checkboxes (layers)
   */
  public SecondaryChecked: boolean;

  /**
   * The user's chosen search method for the location search (custom or native Google locations)
   */
  public SearchMethod: string;

  /**
   * The list of choices of location search methods for user to choose
   */
  public SearchMethods: Array<string> = ['Custom Markers', 'Google Locations'];

  /**
   * Input property that represents the current primary map
   */
  public _currentMapModel: any;

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
  public MapViewTypes: Array<{}> = [
    { value: 'roadmap', display: 'Standard' },
    { value: 'satellite', display: 'Satellite' },
    { value: 'terrain', display: 'Topographical' }
  ]

  /**
   * The public map model converted from the passed IndividualMap input
   */
  public CurrentMapModel: IndividualMap;

  /**
   * The form control for searching custom marker locations
   */
  public CustomLocationControl: FormControl = new FormControl();

  /**
   * The current locations based on the current state of the custom location search form control
   */
  public FilteredLocations: Observable<MapMarker[]>;

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
        // console.log(result.matches);
        // console.log(result);
        this.IsMobile = result.matches;
        this.observerSubscription.unsubscribe();
      });
  }

  /**
   * Takes a MapMarker passed from the legend and passes it to DisplayMarkerInfo  
   */
  @Input('display-basic-info-window')
  public set DisplayBasicInfoWindow(val: MapMarker) {
    //console.log("this is being called, val = ", val);
    if(val){
    this.DisplayMarkerInfo(val);
    }
  }

  /**
   * Setter for the input '_panTo' field - also sets the lat/lng and zoom of the current map model
   */
  @Input('pan-to')
  public set PanTo(value: { lat: number, lng: number, zoom: number }) {
    this._panTo = value;
    //console.log("_panTo = ", this._panTo);
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
    this.UpdateCurrentlyActiveLayer(value);
    this.resetMapCheckedState();
  }

  /**
   * The getter for the current map model
   */
  public get MapModel(): IndividualMap {
    return this._currentMapModel;
  }

  /**
   * Setter for the input field '_secondaryMaps'
   */
  @Input('secondary-maps')
  // SecondaryMaps: IndividualMap[] = Constants.DEFAULT_SECONDARY_MAP_ARRAY;
  public set SecondaryMaps(value: Array<IndividualMap>) {
    this._secondaryMaps = value;
    this.resetMapCheckedState();
  }

  @Input('get-saved-legend-locations')
  // SecondaryMaps: IndividualMap[] = Constants.DEFAULT_SECONDARY_MAP_ARRAY;
  public set GetSavedLegendLocations(value: Array<MapMarker>) {
    this._savedLegendLocations = value;
  }
public _savedLegendLocations: Array<MapMarker>;
  /**
   * Getter for the input field '._secondaryMaps'
   */
  public get SecondaryMaps(): Array<IndividualMap> {
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

  @Output('saved-legend-locations')
  public SavedLegendLocations: EventEmitter<Array<MapMarker>>;

  // CONSTRUCTORS


  constructor(private dialog: MatDialog, private mapConverions: MapConversions,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private wrapper: GoogleMapsAPIWrapper,
    private mapService: MapService,
    protected breakpointObserver: BreakpointObserver) {
    this.MapSaved = new EventEmitter,
      this.PrimaryMapLocationListChanged = new EventEmitter;
    this.VisibleLocationListChanged = new EventEmitter;
    this.CurrentlyActiveLocations = new Array<MapMarker>();
    this.CurrentlyActiveLayers = new Array<IndividualMap>();
    this.SavedLegendLocations = new EventEmitter<Array<MapMarker>>();
    this.monitorBreakpoints();
    this.SearchMethod = 'Google Locations';
  }

  // LIFE CYCLE
  ngOnInit() {
    this._currentMapModel.locationList.forEach(loc => {
      loc.iconImageObject = this.mapConverions.ConvertIconObject(loc.iconName, this.MapMarkerSet);
    });
    this.currentBounds = { neLat: 0, neLng: 0, swLat: 0, swLng: 0 };
    this.runAutocompleteSearchPrep(); // set up the listener for the location search box
    this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
    this.resetMapCheckedState();
    this.setUpCustomMarkerSearch();
  }

  ngOnChanges(value) {
    this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
  }

  // API METHODS

  public UpdateCurrentlyActiveLayer(layer: IndividualMap):void{
    this.CurrentlyActiveLayers.push(layer);
    this.mapService.SetCurrentlyActiveLayers(this.CurrentlyActiveLayers);
  }

  public PanningTo(value: { lat: number, lng: number, zoom: number }) {
    this._panTo = value;
    if (this._currentMapModel) {
      this._currentMapModel.origin.lat = value.lat;
      this._currentMapModel.origin.lng = value.lng;
      this._currentMapModel.zoom = value.zoom;
    }
  }

  public SaveLegendLocations(val: Array<MapMarker>){
    this.SavedLegendLocations.emit(val);
  }
  /**
   * Toggles the location search bar hidden / shown
   */
  public ShowLocationSearchBarClicked(): void {
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

        this.mapService.GetPlaceDetails(this.placeId).subscribe((res: any) => {
          if (res.result !== undefined && res !== null) {
            let townIndex = -1;
            let countryIndex = -1;
            res.result.address_components.forEach((comp, idx) => {
              if (comp.types.includes('locality')) {
                townIndex = idx;
              }
              if (comp.types.includes('country')) {
                countryIndex = idx;
              }
              if (townIndex === -1 && comp.types.includes('administrative_area_level_2')) {
                // if location is outside a "town", set it to "county"
                townIndex = idx;
              }
            });
            const marker = {
              id: uuid.v4(),
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
        mapMarkerSet: this.MapMarkerSet
      }
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res) {
          this.MapSaved.emit(res);
        }
      }
    });
  }

  /**
   * Run when user clicks a custom location marker from custom location search
   */
  public DropdownItemChosen(loc): void {
    this._currentMapModel.origin.lat = loc.lat;
    this._currentMapModel.origin.lng = loc.lng;
    this.DisplayMarkerInfo(loc);
  }

  /**
   * 
   * @param layer The layer (map) configuration sent in when a "layer" checkbox is checked/unchecked
   * 
   * Displays / hides the map markers of the chosen layer (map) in the "layers" dropdown
   */
  public LayerClicked(event, layer?: IndividualMap): void {
    if (layer) { // (if user clicked a secondary checkbox)
      if (event.checked === true) { // (if user checked the box)
        this.CurrentlyActiveLayers.push(layer);
        layer.locationList.forEach(loc => {
          this.CurrentlyActiveLocations.push(loc);
        });
      } else { // (if user un-checked the box)
        this.CurrentlyActiveLayers.splice(this.CurrentlyActiveLayers.indexOf(layer),1);
        this.CurrentlyActiveLocations = this.CurrentlyActiveLocations.filter(loc => {
          return loc.map_id !== layer.id;
        });
      }
    } else { // (if user clicked the primary checkbox)
      if (event.checked === true) { // (if user checked the box)
        this.CurrentlyActiveLayers.push(this._currentMapModel);
        this._currentMapModel.locationList.forEach(loc => {
          this.CurrentlyActiveLocations.push(loc);
        });
      } else { // (if user un-checked the box)
        this.CurrentlyActiveLayers.splice(this.CurrentlyActiveLayers.indexOf(this._currentMapModel),1);
        this.CurrentlyActiveLocations = this.CurrentlyActiveLocations.filter(loc => {
          return loc.map_id !== this._currentMapModel.id;
        });
      }
    }

    this.CurrentlyActiveLocations.forEach(loc => {
      loc.iconImageObject = this.mapConverions.ConvertIconObject(loc.iconName, this.MapMarkerSet)
    });
    this.mapService.SetCurrentlyActiveLayers(this.CurrentlyActiveLayers);
    // this is just for emitting the current list of active locs (currently displayed locations)
    setTimeout(x => {
      // emits the currently visible map markers for use in legend
      this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
    }, 0)
    this.CustomLocationControl.setValue(''); // to reset the options and update location search real-time

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
   * Angular function for use in custom marker location search
   */
  public DisplayFn(marker?: MapMarker): string | undefined {
    return marker ? marker.title : undefined;
  }

  public ShowFooter(val: boolean): void {
    this.DisplayFooter = val;
  }

  public SetNewMapMarker(event:MapMarker):void{
    this.NewMapMarker = event;
    this.SaveNewMarker(this.NewMapMarker);
  }

  public SaveNewMarker(marker: MapMarker):void{
      //console.log("data being returned = ", marker);
      if (!this.isEdit) {
        this._currentMapModel.locationList.push(marker);
        this.CurrentlyActiveLocations.push(marker);
      } else {
        let idx = this._currentMapModel.locationList.findIndex(loc => {
          return loc.id === marker.id;
        });
        this._currentMapModel.locationList.splice(idx, 1, marker);
        idx = this.CurrentlyActiveLocations.findIndex(loc => {
          return loc.id === marker.id;
        });
        this.CurrentlyActiveLocations.splice(idx, 1, marker);
      }
      this.PrimaryMapLocationListChanged.emit(this._currentMapModel);
      this.CustomLocationControl.setValue(''); // to reset the options and update location search real-time
  }
  /**
   * When a user clicks on an icon it calls this method which opens the BasicInfoWindowComponent
   * 
   * @param marker holds the MapMarker with all its information to be displayed in the basic info window
   */
  //TODO: Change so we don't use setTimeout in timeout in lcu-map.component.ts DisplayInfoMarker()  waiting for state also in timeout in basic-info-window.components.ts
  public DisplayMarkerInfo(marker: MapMarker): void {
    this.isEdit = false;
    if (marker.iconImageObject !== undefined && marker.map_id === this._currentMapModel.id) {
      this.isEdit = true;
    }
    if (this.IsMobile) {
      this.MarkerData = new MarkerData(marker, this.MapMarkerSet, this._currentMapModel.id, this.isEdit);
      this.ShowFooter(true);
    }
    if (this.IsMobile === false) {
      if (marker) {
        setTimeout(() => {
          const dialogRef = this.dialog.open(BasicInfoWindowComponent, { data: { marker, markerSet: this.MapMarkerSet, primary_map_id: this._currentMapModel.id, isEdit: this.isEdit } });
          this.markerInfoSubscription = dialogRef.afterClosed().subscribe(
            data => {
              //console.log("data being returned = ", data);
              if (data !== undefined && data !== null) {
                this.SaveNewMarker(data);
              }
            });
        }, 50);
      }
    }
    // console.log(marker)
    this.zoomInToPoint(marker);
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
  public OnMapReady(map): void {
    map.addListener('click', (loc) => {
      loc.stop(); // stops the event that opens the default G-Maps info window
      this.placeId = loc.placeId;
    });
  }

  // HELPERS

  /**
   * Sets up the search filtering for the custom marker search
   */
  protected setUpCustomMarkerSearch(): void {
    this.options = this.CurrentlyActiveLocations;
    this.FilteredLocations = this.CustomLocationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this.filterCustomLocations(title) : this.options.slice()),
      );
  }

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
  protected runAutocompleteSearchPrep(): void {
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
              if (townIndex === -1 && comp.types.includes('administrative_area_level_2')) {
                // if location is outside a "town", set it to "county"
                townIndex = idx;
              }
            }
          });

          this.DisplayMarkerInfo(new MapMarker({
            id: uuid.v4(),
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
   * Filter for use in custom marker location search
   */
  protected filterCustomLocations(title: string): Array<MapMarker> {
    const filterValue = title.toLowerCase();
    return this.options.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Sets primary layer to checked and secondary layers to unchecked and resets active location
   */
  protected resetMapCheckedState(): void {
    this.PrimaryChecked = true;
    this.SecondaryChecked = false;
    this.CurrentlyActiveLocations = [];
    this._currentMapModel.locationList.forEach(loc => {
      this.CurrentlyActiveLocations.push(loc);
    });
  }

  protected zoomInToPoint(value) {
    this._currentMapModel.origin.lat = value.lat;
    this._currentMapModel.origin.lng = value.lng;
    this._currentMapModel.zoom = 15 + Math.random();
  }

}