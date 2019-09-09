import { Component, OnInit, Input, Output, EventEmitter, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
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
import { LocationInfoService } from '../../services/location-info.service';
import { UserLayer } from '../../models/user-layer.model';
import { UserMap } from '../../models/user-map.model';



@Component({
  selector: 'lcu-map',
  templateUrl: './lcu-map.component.html',
  styleUrls: ['./lcu-map.component.scss'],
  host: {'(document:click)': 'onDocClick($event)'}
})
export class LcuMapComponent implements OnInit {

  // from host above
  onDocClick(e) {
    // close layer dropdown when user clicks outside the element:
    if (!e.target.classList.contains('layer-element')) {
      this.ShowLayersDropdown = false;
    }
    // close search bar element when user clicks outside the element:
    let isSearchBarElement = false;
    e.path.forEach(el => {
      if (el.classList !== undefined) {
        if (el.classList.contains('search-bar-element')) {
          isSearchBarElement = true;
        }
      }
    });
    if (!isSearchBarElement) {
      this.ShowSearchBar = false;
    }
  }

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

  protected lastBoundsChangeMillisecond: number;

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


  /**
   * Subscription for the break point observer(determines the screen size the app is running on)
   */
  protected observerSubscription: Subscription;

  /**
   * boolean value that determines if the MapMarker already exists and is being edited
   */
  protected isEdit: boolean;




  // PROPERTIES 
  //12 for bottom right & 9 for right bottom
  public ZoomOptions: Object = { position: 9 };

  /**
   * Indicates whether or not the layers dropdown will be displayed
   */
  public ShowLayersDropdown: boolean = false;

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
   * 
   * Right now - we leave this as 'ambl_on' because specs changed at last minute
   * Later, we'll add an input to take a custom value
   */
  public SearchMethods: Array<string> = ['ambl_on', 'Google'];

  /**
   * Input property that represents the current primary map
   */
  public _currentMapModel: any;

  /**
   * Input property that represents the locations and their order saved in memory
   */
  public _savedLegendLocations: Array<MapMarker>;

  /**
   * The location markers that are currently being displayed
   */
  public CurrentlyActiveLocations: Array<MapMarker>;

/**
 * The current location selected to display in legend as highlighted
 */
  public  SelectedLocation: MapMarker;

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
  public CurrentMapModel: UserMap;

  public _visibleLocationsMasterList: Array<MapMarker>;

  /**
   * The form control for searching custom marker locations
   */
  public CustomLocationControl: FormControl = new FormControl();

  /**
   * The current locations based on the current state of the custom location search form control
   */
  public FilteredLocations: Observable<MapMarker[]>;


  public IconIsHighlighted: boolean;

  /**
   * The search input box
   */
  @ViewChild('search', { static: false })
  public SearchElementRef: ElementRef;

  /**
   * The form control for the location search box
   */
  public SearchControl: FormControl;



  /**
   * Takes a MapMarker passed from the legend and passes it to DisplayMarkerInfo  
   */
  @Input('display-basic-info-window')
  public set DisplayBasicInfoWindow(val: MapMarker) {
    //console.log("this is being called, val = ", val);
    if (val) {
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
      this._currentMapModel.Latitude = value.lat;
      this._currentMapModel.Longitude = value.lng;
      this._currentMapModel.zoom = value.zoom;
    }
  }

  /**
   * Getter for the field '_panTo'
   */
  public get PanTo() {
    return this._panTo;
  }

  @Input('visible-locations-master-list')
  public set VisibleLocationsMasterList(value: Array<MapMarker>) {
    // console.log("VisibleLocationsMasterList = ", value)
    this._visibleLocationsMasterList = value;
    this.setUpCustomMarkerSearch();
    if (this._visibleLocationsMasterList && this._visibleLocationsMasterList.length > 0) {
      this._visibleLocationsMasterList.forEach(loc => {
        loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet);
        // console.log('after IconImageObject assigned');
      });
    } else {
      this._visibleLocationsMasterList = new Array<MapMarker>();
    }
  }

  public get VisibleLocationsMasterList() {
    return this._visibleLocationsMasterList;
  }

  public _userLayers;
  @Input('user-layers')
  public set UserLayers(value: Array<UserLayer>) {
    this._userLayers = value;
    this.shiftCuratedLayerToTop();
  }
  public get UserLayers() {
    return this._userLayers;
  }

  public _selectedUserLayers;
  @Input('selected-user-layers')
  public set SelectedUserLayers(value: Array<any>) {
    this._selectedUserLayers = value;
  }
  public get SelectedUserLayers() {
    return this._selectedUserLayers;
  }

  /**
   * The set of map markers and image paths that will be used to determine available map markers for current map
   */
  @Input('map-marker-set')
  MapMarkerSet: MarkerInfo[];

  /**
   * The setter for the current map model
   */
  @Input('map-model')
  // MapModel?: IndividualMap = Constants.DEFAULT_PRIMARY_MAP_CONFIGURATION;
  public set MapModel(value: UserMap) {
    this._currentMapModel = value;
    // this.CurrentlyActiveLocations = [];
    // this._currentMapModel.locationList.forEach(loc => {
    //   loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet);
    // });
    // this.UpdateCurrentlyActiveLayers(value);

    //this.resetMapCheckedState();
  }

  /**
   * The getter for the current map model
   */
  public get MapModel(): UserMap {
    return this._currentMapModel;
  }

  protected _visibleLocations;
  @Input('show-visible-locations')
  public set VisibleLocations(value: Array<any>) {
    this._visibleLocations = value;
    this.CurrentlyActiveLocations = this._visibleLocations;
  }

  /**
   * The event emitted when a map is saved (the saved map is emitted)
   */
  @Output('map-saved')
  public MapSaved: EventEmitter<UserMap>;

  /**
 * The event emitted when the primary map's location list is altered (the new map is emitted)
 */
  // @Output('primary-map-location-list-changed')
  // public PrimaryMapLocationListChanged: EventEmitter<IndividualMap>;

  /**
 * The Event that is emitted when a user creates a new location
 */
  @Output('add-location')
  public AddLocation: EventEmitter<MapMarker>;


  @Output('edit-location')
  public EditLocation: EventEmitter<MapMarker>;


  /**
   * The event emitted when a layer is clicked - emits list of active secondary locations
   */
  @Output('visible-location-list-changed')
  public VisibleLocationListChanged: EventEmitter<MapMarker[]>;

  /**
   * The event emitted when the legend is closed and the order/locations are saved to local storage
   */
  @Output('saved-legend-locations')
  public SavedLegendLocations: EventEmitter<Array<MapMarker>>;

  @Output('layer-checked')
  public LayerChecked: EventEmitter<UserLayer>;

  @Output('layer-unchecked')
  public LayerUnchecked: EventEmitter<UserLayer>;

  @Input('update-visible-locations-manually')
  public UpdateVisibleLocationsManually: Array<MapMarker>;

  @Output('map-bounds-change')
  public MapBoundsChange: EventEmitter<Array<number>>;



  // CONSTRUCTORS


  constructor(private dialog: MatDialog, private mapConversions: MapConversions,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private wrapper: GoogleMapsAPIWrapper,
    private mapService: MapService,
    protected breakpointObserver: BreakpointObserver,
    private locationInfoService: LocationInfoService) {
    this.MapSaved = new EventEmitter,
      // this.PrimaryMapLocationListChanged = new EventEmitter;
    this.VisibleLocationListChanged = new EventEmitter;
    this.CurrentlyActiveLocations = new Array<MapMarker>();
    // this.CurrentlyActiveLayers = new Array<IndividualMap>();
    this.SavedLegendLocations = new EventEmitter<Array<MapMarker>>();
    this.LayerChecked = new EventEmitter<UserLayer>();
    this.LayerUnchecked = new EventEmitter<UserLayer>();
    this.observerSubscription = new Subscription;
    this.monitorBreakpoints();
    this.SearchMethod = 'ambl_on';
    this.IconIsHighlighted = false;
    this.AddLocation = new EventEmitter<MapMarker>();
    this.EditLocation = new EventEmitter<MapMarker>();
    this.MapBoundsChange = new EventEmitter<Array<number>>();
  }

  // LIFE CYCLE
  ngOnInit() {
    // this._currentMapModel.locationList.forEach(loc => {
    //   loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet);
    // });
    this._visibleLocationsMasterList.forEach(loc => {
      loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet);
    });
    this.currentBounds = { neLat: 0, neLng: 0, swLat: 0, swLng: 0 };
    this.runAutocompleteSearchPrep(); // set up the listener for the location search box
    this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
    //this.resetMapCheckedState();
    this.setUpCustomMarkerSearch();
  }

  ngOnChanges() {
    this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
    // this.IconIsHighlighted = this.locationInfoService.GetHighlightedIcon();
    // console.log("is Highlighted = ", this.IconIsHighlighted);
  }
  /**
   * In the do check, this.IconIsHighlighted is checked to see if it has changed to true
   * 
   * if true the icon will be highlighted when more info is being displayed.
   */
  // ngDoCheck(){
  //this.IconIsHighlighted = this.locationInfoService.GetHighlightedIcon();
  // }

  // API METHODS


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
   *  Returns an array of strings that represent the titles of layers selected
   * 
   *  Called by the legend to get the layer titles to be displayed in the legend
   */
  public GetSelectedUserLayers(): Array<string> {
    let LayerTitles = new Array<string>();
    if (this._userLayers) {
      this._userLayers.forEach(function (layer) {
        if (this._selectedUserLayers.includes(layer.ID)) {
          LayerTitles.push(layer.Title);
        }
      }, this);
    }

    return LayerTitles;
  }
  /**
   * 
   * @param layer will be added to an array of active layers if it doesnt already exist in the array
   */
  // public UpdateCurrentlyActiveLayers(layer: IndividualMap): void {
  //   let LayerId = Array<IndividualMap>();
  //   if (layer) {
  //     LayerId = this.CurrentlyActiveLayers.filter(function (layers) {
  //       return layers.ID === layer.ID;
  //     });

  //     if (LayerId.length === 0) {
  //       this.CurrentlyActiveLayers.push(layer);
  //       // console.log("adding layer: ", layer);
  //       //this.mapService.SetCurrentlyActiveLayers(this.CurrentlyActiveLayers);
  //     }
  //     else {
  //       // console.log(LayerId[0], " Already exists");
  //     }
  //   }
  //   else {
  //     // console.log("Layer =", layer);
  //   }


  // }
  /**
   * legend uses this function to take incoming data from child class and sets the according values to allow panning
   * @param value 
   */
  public PanningTo(value: { lat: number, lng: number, zoom: number }): void {
    this._panTo = value;
    if (this._currentMapModel) {
      this._currentMapModel.Latitude = value.lat;
      this._currentMapModel.Longitude = value.lng;
      this._currentMapModel.Zoom = value.zoom;
    }
  }
  /**
   * Saves the legend order/loactions via event emmiter
   * @param val 
   */
  public SaveLegendLocations(val: Array<MapMarker>): void {
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
            //console.log("Google Returned: ",res.result)
            this.DisplayMarkerInfo(new MapMarker({
              ID: '',
              LayerID: this.UserLayers.find(lay => lay.Shared === false).ID,
              Title: res.result.name,
              Icon: res.result.icon,
              Latitude: res.result.geometry.location.lat,
              Longitude: res.result.geometry.location.lng,
              Telephone: res.result.formatted_phone_number,
              Website: res.result.website,
              Town: res.result.address_components[townIndex].long_name,
              Country: res.result.address_components[countryIndex].long_name,
              Photos: this.buildPhotoArray(res.result.photos),
              Type: res.result.types
            })
            );
          }
        });

        // this is temporarily disabled (adding a random map marker to any lat/lng on the map)
        // it will be commented back in at a later sprint when it is required again:

        // const dialogRef = this.dialog.open(AddMapMarkerComponent, {
        //   data: {
        //     lat: event.coords.lat,
        //     lng: event.coords.lng,
        //     iconList: this.MapMarkerSet,
        //     primary_map_id: this._currentMapModel.ID
        //   }
        // });

        // dialogRef.afterClosed().subscribe(res => {
        //   if (res) {
        //     this._currentMapModel.locationList.push(res);
        //     if (this.CurrentlyActiveLayers.filter(map => map.ID === this._currentMapModel.ID).length > 0) {
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
      width: "252px",
      height: "204px",
      data: {
        map,
       // locationMarkers: this.stripOutsideLocations(this.CurrentlyActiveLocations, this.currentBounds),
        mapMarkerSet: this.MapMarkerSet,
        coordinates: this.currentBounds,
        userLayer: this.UserLayers.find(layer => layer.Shared === false)
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
    this._currentMapModel.Latitude = loc.Latitude;
    this._currentMapModel.Longitude = loc.Longitude;
    this.DisplayMarkerInfo(loc);
  }

  /**
   * 
   * @param layer The layer (map) configuration sent in when a "layer" checkbox is checked/unchecked
   * 
   * Displays / hides the map markers of the chosen layer (map) in the "layers" dropdown
   */
  public LayerClicked(event, layer?: UserLayer): void {
    //tempActiveLoactions and the forEach are necessary so that the CurrentlyActiveLocations is
    //reset and thus those changes are being passed as input to the legend so OnChanges gets called
    //console.log("layer to toggle: ", layer);
    let tempActiveLocations: Array<MapMarker> = new Array<MapMarker>();
    this.CurrentlyActiveLocations.forEach(loc => {
      tempActiveLocations.push(loc);
    });
    if (layer) { // (if user clicked a secondary checkbox)
      if (event.checked === true) { // (if user checked the box)
        // this.UpdateCurrentlyActiveLayers(layer);
        this.LayerChecked.emit(layer);
        // this.CurrentlyActiveLayers.push(layer);
        // layer.locationList.forEach(loc => {
        //   tempActiveLocations.push(loc);
        // });
        this.CurrentlyActiveLocations = tempActiveLocations;
      } else { // (if user un-checked the box)
        this.LayerUnchecked.emit(layer);
        // this.CurrentlyActiveLayers.splice(this.CurrentlyActiveLayers.indexOf(layer), 1);
        // this.CurrentlyActiveLocations = this.CurrentlyActiveLocations.filter(loc => {
        //   return loc.LayerID !== layer.ID;
        // });
      }
    } else { // (if user clicked the primary checkbox)
      if (event.checked === true) { // (if user checked the box)
        //this.CurrentlyActiveLayers.push(this._currentMapModel);
        this.LayerChecked.emit(this._currentMapModel);

        // this.UpdateCurrentlyActiveLayers(this._currentMapModel);

        // this._currentMapModel.locationList.forEach(loc => {
        //   tempActiveLocations.push(loc);
        // });
        // this.CurrentlyActiveLocations = tempActiveLocations;
      } else { // (if user un-checked the box)
        this.LayerUnchecked.emit(this._currentMapModel);
        // this.CurrentlyActiveLayers.splice(this.CurrentlyActiveLayers.indexOf(this._currentMapModel), 1);
        // this.CurrentlyActiveLocations = this.CurrentlyActiveLocations.filter(loc => {
        //   return loc.LayerID !== this._currentMapModel.ID;
        // });
        //console.log("User unchecked the primary map");
      }
    }

    this.CurrentlyActiveLocations.forEach(loc => {
      loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet)
    });
    //console.log("Currently Active Layers: ", this.CurrentlyActiveLayers);
    //console.log("Current Map Model: ", this._currentMapModel);
    //this.mapService.SetCurrentlyActiveLayers(this.CurrentlyActiveLayers);
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
    this.ShowLayersDropdown = false;
    if(!event){
      return;
    }
    this.currentBounds.neLat = event.getNorthEast().lat();
    this.currentBounds.neLng = event.getNorthEast().lng();
    this.currentBounds.swLat = event.getSouthWest().lat();
    this.currentBounds.swLng = event.getSouthWest().lng();

    let Bounds: Array<number> = [event.getNorthEast().lat(), event.getNorthEast().lng(), event.getSouthWest().lat(), event.getSouthWest().lng()];
    //console.log("bounds change = ", Bounds);

    this.lastBoundsChangeMillisecond = new Date().getTime();
    setTimeout(() => {
      let currentTimeInMillis = new Date().getTime();
      if (currentTimeInMillis - this.lastBoundsChangeMillisecond > 999) {
        this.MapBoundsChange.emit(Bounds);
      }
    }, 1000);
  }

  /**
   * Angular function for use in custom marker location search
   */
  public DisplayFn(marker?: MapMarker): string | undefined {
    return marker ? marker.Title : undefined;
  }
  /**
   * 
   * @param val Toggles the displayFooter property to true or false
   */
  public ShowFooter(val: boolean): void {
    this.DisplayFooter = val;
  }
  /**
   * @param event 
   * 
   * sets the NewMapMarker value to the event and passes the value to SaveNewMarker
   */
  public SetNewMapMarker(event: MapMarker): void {
    this.NewMapMarker = event;
    this.SaveNewMarker(this.NewMapMarker);
  }
  /**
   * 
   * @param marker 
   * 
   * Saves the new MapMarker
   */
  public SaveNewMarker(marker: MapMarker): void {
    //console.log("data being returned = ", marker);
    if (!this.isEdit) {
      console.log("emiting marker: ", marker)
      this.AddLocation.emit(marker);
    } else {
      this.EditLocation.emit(marker)
    }
    //this.PrimaryMapLocationListChanged.emit(this._currentMapModel);
    //this.CustomLocationControl.setValue(''); // to reset the options and update location search real-time
  }
  /**
   * When a user clicks on an icon it calls this method which opens the BasicInfoWindowComponent
   * 
   * @param marker holds the MapMarker with all its information to be displayed in the basic info window
   */
  //TODO: Change so we don't use setTimeout in timeout in lcu-map.component.ts DisplayInfoMarker()  waiting for state also in timeout in basic-info-window.components.ts
  public DisplayMarkerInfo(marker: MapMarker): void {
    this.ShowSearchBar = false;
    this.SelectedLocation = marker;
    this.isEdit = false;
    let userLayerID = this.UserLayers.find(layer => layer.Shared === false).ID;
    if (marker.LayerID === userLayerID) {
      this.isEdit = true;
    }
    if (this.IsMobile) {
      this.MarkerData = new MarkerData(marker, this.MapMarkerSet, this._currentMapModel.ID, this.isEdit);
      this.ShowFooter(true);
    }
    if (this.IsMobile === false) {
      if (marker) {
        setTimeout(() => {
          const dialogRef = this.dialog.open(BasicInfoWindowComponent, {
            width: "300px", 
            height: "210px",
            backdropClass: 'dialogRefBackdrop',
            hasBackdrop: !(this.locationInfoService.GetHighlightedIcon()),
            data: { marker, markerSet: this.MapMarkerSet, layerID: this.UserLayers.find(lay => lay.Shared === false).ID, isEdit: this.isEdit }
          });
          this.markerInfoSubscription = dialogRef.afterClosed().subscribe(
            data => {
              //console.log("data being returned = ", data);
              if (data !== undefined && data !== null) {
                console.log(data)
                this.SaveNewMarker(data);
              }
            });
        }, 50);
      }
    }
    // console.log("zooming to: ", marker)
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
    this.options = this._visibleLocationsMasterList;
    this.FilteredLocations = this.CustomLocationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.Title),
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
  // protected stripOutsideLocations(locationList: Array<MapMarker>, bounds: any): Array<MapMarker> {
  //   return locationList.filter((loc: MapMarker) =>
  //     loc.lat <= bounds.neLat &&
  //     loc.lat >= bounds.swLat &&
  //     loc.lng <= bounds.neLng &&
  //     loc.lng >= bounds.swLng
  //   )
  // }

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
          //console.log("place: ", place);
          this._currentMapModel.Latitude = place.geometry.location.lat();
          this._currentMapModel.Longitude = place.geometry.location.lng();
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
          //let placePhotos: Array<string> = new Array<string>();
          this.mapService.GetPlaceDetails(place.place_id).subscribe((res: any) => {
            // console.log("result = ", res.result);
            // let photoArray: Array<string>;
            // if(res.result.pho)

            //console.log("placePhotos: ", placePhotos);

            this.DisplayMarkerInfo(new MapMarker({
              ID: '',
              LayerID: this.UserLayers.find(lay => lay.Shared === false).ID,
              Title: place.name,
              Icon: place.icon,
              Latitude: place.geometry.location.lat(),
              Longitude: place.geometry.location.lng(),
              Telephone: place.formatted_phone_number,
              Website: place.website,
              Town: place.address_components[townIndex].long_name,
              Country: place.address_components[countryIndex].long_name,
              Photos: this.buildPhotoArray(res.result.photos),
              Type: res.result.types
            })
            );
          });
        });
      });
    });
  }

  /**
   * Filter for use in custom marker location search
   */
  protected filterCustomLocations(title: string): Array<MapMarker> {
    const filterValue = title.toLowerCase();
    return this.options.filter(option => option.Title.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Sets primary layer to checked and secondary layers to unchecked and resets active location
   */
  // protected resetMapCheckedState(): void {
  //   this.PrimaryChecked = true;
  //   this.SecondaryChecked = false;
  //   this.CurrentlyActiveLocations = [];
  //   this._currentMapModel.locationList.forEach(loc => {
  //     this.CurrentlyActiveLocations.push(loc);
  //   });
  // }
  /**
   * 
   * @param value 
   * 
   * Sets _currentMapModel.orgin to the values of the incoming lat and long
   * 
   * ParseFloat is added to the incoming value in the instance that it is saved as a string
   * 
   * AGM can only take Numbers as the lat and long values, strings will not process correctly
   * 
   * Random decimal point are appended due to the fact the AGM uses == to determine current lat/long/zoom
   * 
   * if random decimals are not added then the map will not zoom/pan once user moves the map
   */
  protected zoomInToPoint(value): void {
    this._currentMapModel.Latitude = parseFloat(value.Latitude) + (Math.random() / 100000);
    this._currentMapModel.Longitude = parseFloat(value.Longitude) + (Math.random() / 100000);
    this._currentMapModel.Zoom = 16 + (Math.random() / 100);
  }
  /** 
   * @param photos
   * 
   * Takes and array of photos returned from the google api and pulls the photo reference out 
   * 
   * and builds the url to call so image displays. (currently only pulling one image from loop)
   */
  protected buildPhotoArray(photos: Array<any>): Array<string> {
    //console.log("photos = ", photos);
    let width = 100; //the max width of the image to display
    let photoUrls: Array<string>;
    let apiKey: string = this.mapService.GetMapApiKey();
    if (photos) {
      photoUrls = new Array<string>();
      //Just getting the first photo for now but set up to be full loop for future
      for (let i = 0; i < 1; i++) {
        let photoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + width + "&photoreference=" + photos[i].photo_reference + "&key=" + apiKey;
        photoUrls.push(photoUrl);
      }
    }
    //console.log("returning: ", photoUrls);
    return photoUrls;
  }

  protected shiftCuratedLayerToTop() {
    let first = "Curated Layer";
    if (this._userLayers && this._userLayers !== undefined) {
      this._userLayers.sort(function(layer1, layer2){ 
        return layer1.Title === first ? -1 : layer2.Title === first ? 1 : 0; 
      });
    }
  }

}