import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  NgZone,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarkerInfo } from '../../models/marker-info.model';
import { GoogleMapsAPIWrapper, AgmInfoWindow, InfoWindowManager } from '@agm/core';
import { MapMarker } from '../../models/map-marker.model';
import { MapConversions } from '../../utils/conversions';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
// @ts-ignore
import { } from '@types/googlemaps';
import { Subscription, Observable } from 'rxjs';
import { MapService } from '../../services/map.service';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { MarkerData } from '../../models/marker-data.model';
import { map, startWith } from 'rxjs/operators';
import { LocationInfoService } from '../../services/location-info.service';
// import { UserLayer } from '../../models/user-layer.model';
import { UserMap } from '../../models/user-map.model';
import { MoreInfoWindowComponent } from './more-info-window/more-info-window.component';
import { IconImageObject } from '../../models/icon-image-object.model';
// import { ItineraryGenerator } from '../../utils/generators/itinerary.generator';
import { ItineraryModel } from '../../models/itinerary.model';
import { ActivityModel } from '../../models/activity.model';
import { ActivityGroupModel } from '../../models/activity-group.model';
import { debug } from 'console';


@Component({
  selector: 'lcu-map',
  templateUrl: './lcu-map.component.html',
  styleUrls: ['./lcu-map.component.scss'],
  host: { '(document:click)': 'OnDocClick($event)' }
})
export class LcuMapComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  // FIELDS

  /**
   * keys that should not trigger a new search
   */
  protected nonEssentialKeys: Array<string>;

  /**
   * The default lat/lng to show on map
   */
  protected defaultLocationData: { zoom: number, lat: number, lng: number } = { zoom: 4, lat: 39.741802, lng: -105.070799 };

  /**
   * The place id of the location the user clicked on
   *
   * This will be replaced by a direct call when AGM team puts out fix that allows user's click event
   * to return place id directly from (mapClick)
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

  protected _visibleLocations;

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
   * The subscription for the google api call
   */
  protected googlePlacesApiSubscription: Subscription;

  /**
   * The open panels represented by their indexes
   */
  protected _openPanels: Array<number> = [];

  /**
   * Subscription for the break point observer(determines the screen size the app is running on)
   */
  protected observerSubscription: Subscription;

  /**
   * The displayed journey
   */
  protected _displayedJourney: any;

  /** The list of locations needed to populate the locations on individual activities */
  protected _amblOnLocationArray: any;

  /**
   * Subscription to service that determines where the map should first open up to when accessed via a journey
   */
  protected forcePanToSubscription: Subscription;

  /**
   * Boolean that determines whether to show the indicator at the top of the legend
   */
  public ShowUpIndicator: boolean = false;

  /**
   * Boolean that determines whether to show the indicator at the bottom of the legend
   */
  public ShowDownIndicator: boolean = false;

  /**
   * The height of the legend container
   */
  public LegendContainerHeight: number = 0;

  public CheckBounds: boolean;

  /**
   * Determines where to place the indicator at the bottom of the legend (its 'top' value)
   */
  public DownIndicatorOffset: number = 0;

  /**
   * boolean value that determines if the MapMarker already exists and is being edited
   */
  public isEdit: boolean;

  // PROPERTIES
  // 12 for bottom right & 9 for right bottom
  public ZoomOptions: object = { position: 9 };

  /**
   * The minimum zoom level (so map can't show too far out)
   */
  public MinZoom: number = 2;

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
   * Determines whether or not the current info box belongs to the journey or not (determines its display layout)
   */
  public BelongsToJourney: boolean = false;

  /**
   * subscribes to map service to find out when legend's top lists button was clicked
   */
  public TopListsSubscription: Subscription;

  /**
   * The zoom level that determines the zoom level of the map - can be changed
   */
  public CurrentZoom: number = 9;

  /**
   * The value that determines the longitude of the map - can be changed
   */
  public CurrentLongitude: number = 0;

  /**
   * Thevalue that determines the latitude of the map - can be changed
   */
  public CurrentLatitude: number = 0;

  /**
   * Is true when screen size is small or xs, false otherwise
   */
  public IsMobile: boolean;
  /**
   * The boolean that is passed to the footer to display or not display the footer
   */
  public DisplayFooter: boolean;

  /**
   * indicates whether or not to show the dropdown list for the search bar
   */
  public displayAutocompleteOptions: boolean = false;

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
   * determines whether or not to display the search options with search bars
   */
  public DisplaySearchOptions: boolean;

  /**
   * The user's chosen search method for the location search (custom or native Google locations)
   */
  public SearchMethod: string;

  /**
   * Boolean that indicates whether or not the user is currently editing a journey's title
   */
  public EditingJourneyTitle: boolean = false;

  /**
   * The list of choices of location search methods for user to choose
   *
   */
  public SearchMethods: Array<string> = [];

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
   * The current Google location selected to display in legend as highlighted
   */
  public SelectedLocation: ActivityModel;

  /**
   * The current user map marker selected to display Basic info popover
   */
  public SelectedMarker: MapMarker;

  /**
   * The reference to the more info window dialog defined upon the window being populated
   */
  protected moreInfoWindowDR: any;

  /**
   * Boolean that determines whether or not the search bar should be shown
   */
  public ShowSearchBar: boolean = false;

  /**
   * Boolean that determines whether or not to show the map legend
   */
  public ShowJourneyLegend: boolean = true;

  /**
   * Whether or not to show the add menu
   */
  public ShowNewOptions: boolean;

  /**
   * The array of options that are displayed when the + icon is selected
   */
  public NewOptions: Array<any>;

  /**
   * The map type (standard, satellite, topographical) - default is standard ('roadmap')
   */
  public CurrentMapViewType: string = 'roadmap';

  /**
   * The public map model converted from the passed IndividualMap input
   */
  public CurrentMapModel: UserMap;

  /**
   * The list of locations that the user should be able to see on the map (may be able to remove this if it's not being used)
   */
  public _visibleLocationsMasterList: Array<MapMarker>;

  /**
   * The form control for searching custom marker locations
   */
  public CustomLocationControl: FormControl = new FormControl();

  /**
   * The current locations based on the current state of the custom location search form control
   */
  public FilteredLocations: Observable<MapMarker[]>;


  // public IconIsHighlighted: boolean;
  /**
   * The top margin of the legend, so the icons are always in line
   */
  public LegendMargin: string;

  public DisplayingMoreInfo: boolean;

  public prevInfoWindow: AgmInfoWindow;
  /**
   * The form control for the location search box
   */
  public SearchControl: FormControl;

  /**
   * The agmInfoWindow refrenced in the DOM
   */
  public amblInfoWindow: AgmInfoWindow;

  public ActivityLocationList: Array<ActivityModel> = [];

  /**
   * The search input box
   */
  @ViewChild('search', { static: false })
  public SearchElementRef: ElementRef;

  /**
   * The Info Window that displays when a Google map icon was clicked.
   */
  @ViewChild('googleInfoWindow', { static: false })
  public GoogleInfoWindowRef: AgmInfoWindow;

  @ViewChild('mapJourneyDisplayContainer')
  public MapJourneyDisplayContainer: ElementRef;

  @ViewChild('mapJourneyDisplay')
  public MapJourneyDisplay: ElementRef;

  @ViewChild('journeyTitleEdit') JourneyTitleEdit: ElementRef;

  @Input('displayed-journey')
  public set DisplayedJourney(journey: any) {
    console.log("journey upon entry: ", journey);
    this.ActivityLocationList = new Array<ActivityModel>();

    if (!journey) { return; }
    this._displayedJourney = journey;
    this._displayedJourney.ActivityGroups.forEach(ag => {
      ag.Activities.forEach(act => {
        if( act.WidgetIcon === 'local_see'){
          act.LocationObject = { scaledSize: { width: 20, height: 17 }, url: `./assets/${act.WidgetIcon}.png` };
        }
        else if(act.WidgetIcon === 'hotel' || act.WidgetIcon === 'terrain' ){
          act.LocationObject = { scaledSize: { width: 24, height: 17 }, url: `./assets/${act.WidgetIcon}.png` };
        }
        else if(act.WidgetIcon === 'golf_course' || act.WidgetIcon === 'location_on'|| act.WidgetIcon === 'music_note'|| act.WidgetIcon === 'restaurant'){
          act.LocationObject = { scaledSize: { width: 17, height: 20 }, url: `./assets/${act.WidgetIcon}.png` };
        }
        else{
          act.LocationObject = { scaledSize: { width: 17, height: 17 }, url: `./assets/${act.WidgetIcon}.png` };
        }
        // act.LocationObject = { scaledSize: { height: 30, width: 30 }, url: `../../../../assets/${act.WidgetIcon}.png` };
        this.ActivityLocationList.push(act);
      });
    });
    this.assignDefaultMapConfiguration();
  }

  public get DisplayedJourney() {
    return this._displayedJourney;
  }

  @Input('ambl-on-location-array')
  public set AmblOnLocationArray(arr) {
    this._amblOnLocationArray = arr;
    this.assignDefaultMapConfiguration();
  }
  public get AmblOnLocationArray() {
    return this._amblOnLocationArray;
  }

  /**
   * The array of available map views to be chosen by the user (default is roadmap)
   *
   */
  /* tslint:disable-next-line:no-input-rename */
  @Input('map-view-types')
  public MapViewTypes: Array<{}> = [
    { value: 'roadmap', display: 'Standard' },
    { value: 'hybrid', display: 'Satellite' },
    { value: 'terrain', display: 'Topographical' }
  ];

  /* tslint:disable-next-line:no-input-rename */
  @Input('custom-search-repress-dropdown-character-count')
  public CustomSearchRepressDropdownCharacterCount: number = 0;

  /* tslint:disable-next-line:no-input-rename */
  @Input('custom-search-method')
  public CustomSearchMethod: string;

  /* tslint:disable-next-line:no-input-rename */
  @Input('display-google-search-method')
  public DisplayGoogleSearchMethod: boolean = false;

  /**
   * the results of the user's custom location query to be displayed
   */
  /* tslint:disable-next-line:no-input-rename */
  @Input('custom-search-input-results')
  public CustomSearchInputResults: Array<MapMarker>;

  /* tslint:disable-next-line:no-input-rename */
  @Input('repress-search-options-list')
  public RepressSearchOptionsList: boolean = false;

  /* tslint:disable-next-line:no-input-rename */
  @Input('update-visible-locations-manually')
  public UpdateVisibleLocationsManually: Array<MapMarker>;


  /**
   * determines whether or not to include the save map feature
   *
   * TODO: will likely turn into simply a button and leave the entire implementation of this modal to parent component
   */
  /* tslint:disable-next-line:no-input-rename */
  @Input('include-save-map-feature')
  public IncludeSaveMapFeature: boolean;

  /**
   * Takes a MapMarker passed from the legend and passes it to DisplayMarkerInfo
   */
  // @Input('display-basic-info-window')
  // public set DisplayBasicInfoWindow(val: MapMarker) {
  //   if (val) {
  //     this.DisplayMarkerInfo(val);
  //   }
  // }



  /**
   * The default marker in the instance of a location not having an icon
   *
   */
  /** tslint:disable-next-line:no-input-rename */
  @Input('default-marker')
  public DefaultMarker: IconImageObject;

  /**
   * Setter for the input '_panTo' field - also sets the lat/lng and zoom of the current map model
   */
  @Input('pan-to')
  public set PanTo(value: { lat: number, lng: number, zoom: number }) {
    // this._panTo = value;
    // if (this.CurrentLatitude) {
    //   setTimeout(() => {
    //     this.CurrentLatitude = value.lat;
    //     this.CurrentLongitude = value.lng;
    //     this.CurrentZoom = value.zoom;
    //   }, 2000);
    // }
  }

  /**
   * Getter for the field '_panTo'
   */
  public get PanTo() {
    return this._panTo;
  }

  @Input('visible-locations-master-list')
  public set VisibleLocationsMasterList(value: Array<MapMarker>) {
    this._visibleLocationsMasterList = value;
    this.setUpCustomMarkerSearch();
    if (this._visibleLocationsMasterList && this._visibleLocationsMasterList.length > 0) {
      this._visibleLocationsMasterList.forEach(loc => {
        loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet);
      });
    } else {
      this._visibleLocationsMasterList = new Array<MapMarker>();
    }
  }

  public get VisibleLocationsMasterList() {
    return this._visibleLocationsMasterList;
  }

  // public _userLayers;
  // @Input('user-layers')
  // public set UserLayers(value: Array<UserLayer>) {
  //   this._userLayers = value;
  // }
  // public get UserLayers() {
  //   return this._userLayers;
  // }

  // public _selectedUserLayers;
  // @Input('selected-user-layers')
  // public set SelectedUserLayers(value: Array<any>) {
  //   this._selectedUserLayers = value;
  // }
  // public get SelectedUserLayers() {
  //   return this._selectedUserLayers;
  // }

  /**
   * The set of map markers and image paths that will be used to determine available map markers for current map
   */
  /* tslint:disable-next-line:no-input-rename */
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

    // this.resetMapCheckedState();
  }

  /**
   * The getter for the current map model
   */
  public get MapModel(): UserMap {
    return this._currentMapModel;
  }

  @Input('open-panel-indexes')
  public set OpenPanels(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
      this._openPanels = arr;
      // console.log("open panels input at lcu map = ", this._openPanels);
    }
  }
  public get OpenPanels() {
    return this._openPanels;
  }

  @Input('show-visible-locations')
  public set VisibleLocations(value: Array<any>) {
    this._visibleLocations = value;
    this.CurrentlyActiveLocations = this._visibleLocations;
  }

  @Input('excluded-locations')
  public ExcludedLocations: Array<string>;

  /**
   * The event emitted when a map is saved (the saved map is emitted)
   */
  /* tslint:disable-next-line:no-output-rename */
  @Output('map-saved')
  public MapSaved: EventEmitter<UserMap>;

  @Output('journey-changed')
  public JourneyChanged: EventEmitter<any> = new EventEmitter<any>();

  @Output('journey-copied')
  public JourneyCopied: EventEmitter<any> = new EventEmitter<any>();

  @Output('journey-shared')
  public JourneyShared: EventEmitter<any> = new EventEmitter<any>();

  @Output('legend-top-icon-clicked')
  public LegendIconClicked: EventEmitter<string> = new EventEmitter();

  /**
   * The event emitted when the primary map's location list is altered (the new map is emitted)
   */
  // @Output('primary-map-location-list-changed')
  // public PrimaryMapLocationListChanged: EventEmitter<IndividualMap>;

  /**
   * The Event that is emitted when a user creates a new location
   */
  /* tslint:disable-next-line:no-output-rename */
  @Output('add-location')
  public AddLocation: EventEmitter<MapMarker>;


  /* tslint:disable-next-line:no-output-rename */
  @Output('edit-location')
  public EditLocation: EventEmitter<MapMarker>;

  @Output('update-excluded-curations')
  public UpdateExcludedCurations: EventEmitter<string>;

  /**
   * The event emitted when a layer is clicked - emits list of active secondary locations
   */
  /* tslint:disable-next-line:no-output-rename */
  @Output('visible-location-list-changed')
  public VisibleLocationListChanged: EventEmitter<MapMarker[]>;

  /* tslint:disable-next-line:no-output-rename */
  @Output('search-location-chosen')
  public SearchLocationChosen: EventEmitter<MapMarker>;

  /**
   * The event emitted when the legend is closed and the order/locations are saved to local storage
   */
  /* tslint:disable-next-line:no-output-rename */
  @Output('edited-legend-locations')
  public EditedLegendLocations: EventEmitter<Array<MapMarker>>;

  /* tslint:disable-next-line:no-output-rename */
  // @Output('layer-checked')
  // public LayerChecked: EventEmitter<UserLayer>;

  /* tslint:disable-next-line:no-output-rename */
  // @Output('layer-unchecked')
  // public LayerUnchecked: EventEmitter<UserLayer>;

  /* tslint:disable-next-line:no-output-rename */
  // @Output('map-bounds-change')
  // public MapBoundsChange: EventEmitter<Array<number>>;

  /* tslint:disable-next-line:no-output-rename */
  @Output('custom-search-change')
  public CustomSearchChange: EventEmitter<string>;

  /* tslint:disable-next-line:no-output-rename */
  @Output('locations-to-delete')
  public LocationsToDelete: EventEmitter<Array<MapMarker>>;

  /**
   * emits event to parent that the legend's top lists button was clicked
   */
  /* tslint:disable-next-line:no-output-rename */
  @Output('top-lists-button-clicked')
  public TopListsButtonClicked: EventEmitter<any>;

  @Output('current-panel-open-state')
  public CurrentPanelOpenState: EventEmitter<Array<number>> = new EventEmitter();

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected changeDetector: ChangeDetectorRef,
    protected dialog: MatDialog,
    protected infoWindowManager: InfoWindowManager,
    protected locationInfoService: LocationInfoService,
    protected mapConversions: MapConversions,
    protected mapService: MapService,
    protected mapsAPILoader: MapsAPILoader,
    protected ngZone: NgZone,
    protected wrapper: GoogleMapsAPIWrapper
  ) {
    this.forcePanToSubscription = this.mapService.GetForcePanToEvent().subscribe(locInfo => {
      this.PanTo = locInfo;
    });
    this.IncludeSaveMapFeature = false;
    this.MapSaved = new EventEmitter(),
      // this.PrimaryMapLocationListChanged = new EventEmitter;
      this.VisibleLocationListChanged = new EventEmitter();
    this.SearchLocationChosen = new EventEmitter<MapMarker>();
    this.UpdateExcludedCurations = new EventEmitter<string>();
    this.CurrentlyActiveLocations = new Array<MapMarker>();
    // this.CurrentlyActiveLayers = new Array<IndividualMap>();
    this.EditedLegendLocations = new EventEmitter<Array<MapMarker>>();
    // this.LayerChecked = new EventEmitter<UserLayer>();
    // this.LayerUnchecked = new EventEmitter<UserLayer>();
    this.CustomSearchChange = new EventEmitter<string>();
    this.TopListsButtonClicked = new EventEmitter();
    this.observerSubscription = new Subscription();
    this.monitorBreakpoints();
    // this.IconIsHighlighted = false;
    this.AddLocation = new EventEmitter<MapMarker>();
    this.EditLocation = new EventEmitter<MapMarker>();
    // this.MapBoundsChange = new EventEmitter<Array<number>>();
    this.LocationsToDelete = new EventEmitter<Array<MapMarker>>();
    this.LegendMargin = '3px';
    this.DisplayingMoreInfo = false;
    this.nonEssentialKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
    this.ShowNewOptions = false;
    this.CheckBounds = false;
    this.NewOptions = [{
      display: 'New Day',
      action: 'day'
    },
    {
      display: 'New Options',
      action: 'extras'
    },
    {
      display: 'Copy Journey',
      action: 'copy'
    },]
    
  }

  public ngOnInit(): void {
    // this.setUpSearchMethods();
    this.SearchMethod = 'Google';
    this._visibleLocationsMasterList.forEach(loc => {
      loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet);
    });
    this.currentBounds = { neLat: 0, neLng: 0, swLat: 0, swLng: 0 };
    this.runAutocompleteSearchPrep(); // set up the listener for the location search box
    this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
    // this.resetMapCheckedState();
    this.setUpCustomMarkerSearch();
    this.TopListsSubscription = this.mapService.TopListsClicked.subscribe(() => {
      this.TopListsButtonClicked.emit();
    });

    this.mapService.MoreInfoClicked.subscribe(
      (data) => {
        this.openMoreInfoDialog(data);
      }
    );

    this.mapService.InfoWindowClosed.subscribe(
      () => {
        this.BelongsToJourney = false;
        this.SelectedMarker = null;
        // console.log("setting selectedMarker to NULL");
        this.locationInfoService.SetSelectedMarker(null);
        this.SelectedLocation = null;

      }
    );

    this.mapService.MapMarkerSaved.subscribe(
      (marker: MapMarker) => {
        console.log('MapMarkerSaved event!', marker);
        this.SaveNewMarker(marker);
      }
    );
  }
  public ngAfterViewInit(): void {

    // this.setIndicators();
    // console.log("Default Marker in map= ", this.DefaultMarker)
    if (!this.DefaultMarker) {
      this.DefaultMarker = {
        name: 'lcu-map-default-marker',
        url: './assets/location_on.png',
        scaledSize: { width: 40, height: 40 }
      };
    }
    this.LegendContainerHeight = this.MapJourneyDisplayContainer.nativeElement.offsetHeight;
    this.DownIndicatorOffset = this.LegendContainerHeight + 35;
    this.changeDetector.detectChanges();
    this.MapJourneyDisplayContainer.nativeElement.addEventListener('scroll', () => {
      this.DownIndicatorOffset = this.MapJourneyDisplayContainer.nativeElement.offsetHeight + 35;
      // this.setIndicators();
      // console.log("Scrolling");
      // Check the bounds
      this.CheckBounds = true;
    });
    this.MapJourneyDisplayContainer.nativeElement.addEventListener('click', () => {
      setTimeout(() => {
        this.DownIndicatorOffset = this.MapJourneyDisplayContainer.nativeElement.offsetHeight + 35;
        // this.setIndicators();
      }, 220);
    });
  }

  // protected setIndicators() {
  // const display = this.MapJourneyDisplayContainer.nativeElement;
  // let child = document.getElementById("lcuMapJourney").getBoundingClientRect();
  // let parent = display.getBoundingClientRect();


  // console.log('OFFSET HEIGHT: ', display.offsetHeight);
  // console.log('SCROLL HEIGHT: ', display.scrollHeight);
  // console.log('OFSSET TOP   : ', display.offsetTop);
  // console.log('NATIVE ELEMEN: ', this.MapJourneyDisplay);
  // console.log('Parent        : ', display.childNodes.item(0).getBoundingClientRect());
  // console.log("Parent: ", parent)
  // console.log("child = ", child)

  // if(child.top < 40){
  //   console.log("Top arrow should show")
  // }
  // else{
  //   console.log("Top arrow should NOT show")
  // }

  // if(child.bottom > parent.bottom){
  //   console.log("bottom arrow should show")
  // }
  // else{
  //   console.log("Bottm arrow should NOT show")
  // }

  // const container = this.MapJourneyDisplayContainer.nativeElement;
  // if (container.offsetHeight < container.scrollHeight) {
  //   this.ShowUpIndicator = true;
  //   this.ShowDownIndicator = true;
  // } else {
  //   this.ShowUpIndicator = false;
  //   this.ShowDownIndicator = false;
  // }
  // }
  public ngOnChanges(): void {
    // this.CheckForHiddenLocations();
    // this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
    // console.log("activity location list = " , this.ActivityLocationList);
  }

  public ngOnDestroy(): void {
    if (this.googlePlacesApiSubscription) {
      this.googlePlacesApiSubscription.unsubscribe();
    }
    this.TopListsSubscription.unsubscribe();
    this.observerSubscription.unsubscribe();
    if (this.markerInfoSubscription) {
      this.markerInfoSubscription.unsubscribe();
    }
    this.forcePanToSubscription.unsubscribe();
  }

  public onMapReady(map?: google.maps.Map ){
  
    if(map)
    map.setOptions({
      streetViewControl: false,
      zoomControl: false,
      fullscreenControl: false
    });
  }

  /**
   *
   * @param event the array of activity groups
   *
   * Event that gets emitted when an activity group changes
   */
  public ActivityGroupsChanged(event: Array<ActivityGroupModel>) {
    this.ActivityLocationList = new Array<ActivityModel>();
    event.forEach((ag: ActivityGroupModel) => {
      ag.Activities.forEach(act => {
        this.ActivityLocationList.push(act);
      });
    });
    // console.log("activities to display: ", this.ActivityLocationList);
  }

  public CalcBounds(childBounds: any) {
    this.CheckBounds = false;
    if (this.MapJourneyDisplayContainer) {
      const parentBounds = this.MapJourneyDisplayContainer.nativeElement.getBoundingClientRect();
      // console.log("Parent Bounds: ", parentBounds);
      // console.log("Child Bounds: ", childBounds);
      const childsTop = Math.round(childBounds.top);
      const childsBottom = Math.round(childBounds.bottom);
      const parentsTop = Math.round(parentBounds.top);
      const parentsBottom = Math.round(parentBounds.bottom);

      // console.log("Childs Rounded Top: ", childsTop, "Childs Rounded bottom: ", childsBottom);
      // console.log("Parents Rounded Top: ", parentsTop, "Parents Rounded bottom: ", parentsBottom);
      if (childsBottom + 4 > parentsBottom) {
        // console.log("Bottom arrow should show")
        this.ShowDownIndicator = true;
      } else {
        // console.log("Bottom arrow should NOT show")
        this.ShowDownIndicator = false;
      }

      if (childsTop - 40 < parentsTop) {// "Top arrow should show"
        setTimeout(() => {
          this.ShowUpIndicator = true;
        }, 0);
      } else {// "Top arrow should NOT show"
        setTimeout(() => {
          this.ShowUpIndicator = false;
        }, 0);
      }

     
    }
  }

  /**
   *
   * @param event the notes to save
   * @param marker the activity of the notes that changed
   *
   * Runs when the user saves notes from the map
   */
  public NotesSaved(event, marker) {
    let activity;
    this.DisplayedJourney.ActivityGroups.forEach(ag => {
      ag.Activities.forEach(act => {
        if (act.ID === marker.ID) {
          act.Notes = event;
          activity = act;
        }
      });
    });
    this.JourneyChanged.emit({ message: 'notes saved', journey: this.DisplayedJourney, additional: { activity } });
  }

  public ToggleFavorited(event: boolean, marker: ActivityModel) {
    let activity;
    this.DisplayedJourney.ActivityGroups.forEach(ag => {
      ag.Activities.forEach((act: ActivityModel) => {
        if (act.ID === marker.ID) {
          act.Favorited = event;
          activity = act;
        }
      });
    });
    this.JourneyChanged.emit({ message: 'activity favorited changed', journey: this.DisplayedJourney, additional: { activity } });
  }

  /**
   * Breakpoints for screen sizes
   */
  protected monitorBreakpoints(): void {
    this.observerSubscription = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result: BreakpointState) => {
        this.IsMobile = result.matches;
        this.observerSubscription.unsubscribe();
      });
  }


  public UpdateExcludedCurationsList(event: string) {
    // console.log('emitting: ', event);
    this.UpdateExcludedCurations.emit(event);
  }
  /**
   *  Returns an array of strings that represent the titles of layers selected.
   *  Called by the legend to get the layer titles to be displayed in the legend.
   */
  // public GetSelectedUserLayers(): Array<string> {
  //   const LayerTitles = new Array<string>();
  //   if (this._userLayers) {
  //     this._userLayers.forEach(function (layer) {
  //       if (this._selectedUserLayers.includes(layer.ID)) {
  //         LayerTitles.push(layer.Title);
  //       }
  //     }, this);
  //   }

  //   return LayerTitles;
  // }

  /**
   *
   * @param event the array of map markers
   *
   * Updates the visible locations
   */
  public UpdateVisibleLocations(event: Array<MapMarker>): void {
    // this._visibleLocationsMasterList = event;
  }

  public CheckForHiddenLocations(): void {
    // console.log("locations before checking if hidden: ", this._visibleLocationsMasterList);

    for (let i = 0; i < this._visibleLocationsMasterList.length; i++) {
      if (this.ExcludedLocations.includes(this._visibleLocationsMasterList[i].ID)) {
        // console.log("IsHidden is false but ID is in hiddenLocationIds array")
        this._visibleLocationsMasterList[i].IsHidden = true;
      }
    }
    // console.log("locations after checking if hidden: ", this._visibleLocationsMasterList);
  }

  public EmitTopListsClick(event: string): void {
    // console.log(event);
    this.TopListsButtonClicked.emit();
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

  public DeleteLocations(event) {
    this.LocationsToDelete.emit(event);
  }

  // public ToggleLegendMargin(event) {
  //   if (event) {
  //     this.LegendMargin = '35px';
  //   } else {
  //     this.LegendMargin = '3px';
  //   }
  // }

  /**
   * Legend uses this function to take incoming data from child class and sets the according values to allow panning.
   * @param value the value passed in
   */
  // public PanningTo(value: { lat: number, lng: number, zoom: number }): void {
  //   if (!value.zoom) {
  //     value.zoom = this._currentMapModel.Zoom;
  //   }
  //   this._panTo = value;

  //   if (this._currentMapModel) {
  //     this._currentMapModel.Latitude = value.lat;
  //     this._currentMapModel.Longitude = value.lng;
  //     this._currentMapModel.Zoom = value.zoom;
  //   }
  // }

  /**
   * Saves the legend order/loactions via event emmiter.
   * @param val the value passed in
   */
  // public EditLegendLocations(val: Array<MapMarker>): void {
  //   this.EditedLegendLocations.emit(val);
  // }

  /**
   * Toggles the location search bar hidden / shown.
   */
  public ShowLocationSearchBarClicked(): void {
    this.ShowSearchBar = this.ShowSearchBar === true ? false : true;
    if (this.ShowNewOptions === true) {
      this.ShowNewOptions = false;
    }
  }

  /**
   * Runs when user single-clicks location on map. Modal displays prompting user to enter info about custom location marker.
   * @param event The event passed in upon user clicking the map.
   */
  public OnChoseLocation(event): void {
    this.SelectedLocation = null;
    this.SelectedMarker = null;
    this.locationInfoService.SetSelectedMarker(null);
    this.changeDetector.detectChanges();

    setTimeout(x => { // set timeout to half a second to wait for possibility of double click (mimic Google Maps)
      if (!this.isDoubleClick) {

        this.googlePlacesApiSubscription = this.mapService.GetPlaceDetails(this.placeId).subscribe((res: any) => {
          if (res && res.result !== undefined) {
            this.callDisplayMarkerWithGooglePlaceDetails(res.result);
          } else {
            console.log('the results are either null or undefined');

          }
        });
      }
      // this timeout is necessary because it is used to determine whether the user has single clicked or double clicked
    }, this.expectedDoubleClickElapsedTime);
  }

  /**
   * Function that sets property 'isDoubleClicked' to true for a moment.
   * This is necessary because when the events 'mapClick' and 'mapDblClick' appear on the same component, both will be fired.
   *
   * @param event The event passed in upon user double-clicking the map.
   */
  public OnMapDoubleClicked(event): void {
    this.isDoubleClick = true;
    setTimeout(x => {
      this.isDoubleClick = false;
    }, 500); // about after enough time it takes to zoom, turn off the "double-clicked" flag
  }

  /**
   * Activates the dialog for user to enter name of map which will then be 'saved'.
   */
  // public ActivateSaveMapDialog(map): void {
  //   const dialogRef = this.dialog.open(SaveMapComponent, {
  //     width: '252px',
  //     height: '204px',
  //     data: {
  //       map,
  //       mapMarkerSet: this.MapMarkerSet,
  //       coordinates: this.currentBounds,
  //       // userLayer: this.UserLayers.find(layer => layer.Shared === false)
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe((res: any) => {
  //     if (res) {
  //       if (res) {
  //         this.MapSaved.emit(res);
  //       }
  //     }
  //   });
  // }

  /**
   * Run when user clicks a custom location marker from custom location search.
   */
  public DropdownItemChosen(loc: any): void {
    this.CurrentLatitude = loc.Latitude;
    this.CurrentLongitude = loc.Longitude;
    // this.DisplayMarkerInfo(loc);
  }
  /**
   * called when the user has selected a new location to add to their journey and adds activity
   * to the last activity group and give it an order
   * 
   * @param event 
   */
  public addIconClicked(event: ActivityModel) {
    // console.log("Adding event: ", event)
    this.BelongsToJourney = true;
    event.locationData.IconImageObject = { scaledSize: { width: 17, height: 22 }, url: './assets/location_on.png' };
    event.Order = this.DisplayedJourney.ActivityGroups[this.DisplayedJourney.ActivityGroups.length - 1].Activities.length;
    this.DisplayedJourney.ActivityGroups[this.DisplayedJourney.ActivityGroups.length - 1].Activities.push(event);
    this.JourneyChanged.emit({ message: 'add activity', journey: this.DisplayedJourney });
  }

  /**
   * Displays / hides the map markers of the chosen layer (map) in the "layers" dropdown.
   *
   * @param layer The layer (map) configuration sent in when a "layer" checkbox is checked/unchecked.
   */
  // public LayerClicked(event, layer?: UserLayer): void {
  //   // tempActiveLoactions and the forEach are necessary so that the CurrentlyActiveLocations is
  //   // reset and thus those changes are being passed as input to the legend so OnChanges gets called
  //   // console.log("layer to toggle: ", layer);
  //   const tempActiveLocations: Array<MapMarker> = new Array<MapMarker>();
  //   this.CurrentlyActiveLocations.forEach(loc => {
  //     tempActiveLocations.push(loc);
  //   });
  //   if (layer) { // (if user clicked a secondary checkbox)
  //     if (event.checked === true) { // (if user checked the box)
  //       // this.UpdateCurrentlyActiveLayers(layer);
  //       this.LayerChecked.emit(layer);
  //       // this.CurrentlyActiveLayers.push(layer);
  //       // layer.locationList.forEach(loc => {
  //       //   tempActiveLocations.push(loc);
  //       // });
  //       this.CurrentlyActiveLocations = tempActiveLocations;
  //     } else { // (if user un-checked the box)
  //       this.LayerUnchecked.emit(layer);
  //       // this.CurrentlyActiveLayers.splice(this.CurrentlyActiveLayers.indexOf(layer), 1);
  //       // this.CurrentlyActiveLocations = this.CurrentlyActiveLocations.filter(loc => {
  //       //   return loc.LayerID !== layer.ID;
  //       // });
  //     }
  //   } else { // (if user clicked the primary checkbox)
  //     if (event.checked === true) { // (if user checked the box)
  //       // this.CurrentlyActiveLayers.push(this._currentMapModel);
  //       this.LayerChecked.emit(this._currentMapModel);

  //       // this.UpdateCurrentlyActiveLayers(this._currentMapModel);

  //       // this._currentMapModel.locationList.forEach(loc => {
  //       //   tempActiveLocations.push(loc);
  //       // });
  //       // this.CurrentlyActiveLocations = tempActiveLocations;
  //     } else { // (if user un-checked the box)
  //       this.LayerUnchecked.emit(this._currentMapModel);
  //       // this.CurrentlyActiveLayers.splice(this.CurrentlyActiveLayers.indexOf(this._currentMapModel), 1);
  //       // this.CurrentlyActiveLocations = this.CurrentlyActiveLocations.filter(loc => {
  //       //   return loc.LayerID !== this._currentMapModel.ID;
  //       // });
  //       // console.log("User unchecked the primary map");
  //     }
  //   }

  //   this.CurrentlyActiveLocations.forEach(loc => {
  //     loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet);
  //   });
  //   // console.log("Currently Active Layers: ", this.CurrentlyActiveLayers);
  //   // console.log("Current Map Model: ", this._currentMapModel);
  //   // this.mapService.SetCurrentlyActiveLayers(this.CurrentlyActiveLayers);
  //   // this is just for emitting the current list of active locs (currently displayed locations)
  //   setTimeout(x => {
  //     // emits the currently visible map markers for use in legend
  //     this.VisibleLocationListChanged.emit(this.CurrentlyActiveLocations);
  //   }, 0);
  //   this.CustomLocationControl.setValue(''); // to reset the options and update location search real-time

  // }

  /**
   * Sets currentBounds to the map's exact boundary whenever the boundary of the map changes.
   *
   * @param event The event sent every time the boundary of the map changes.
   */
  // public BoundsChange(event): void {
  //   this.ShowLayersDropdown = false;
  //   if (!event) {
  //     return;
  //   }
  //   this.currentBounds.neLat = event.getNorthEast().lat();
  //   this.currentBounds.neLng = event.getNorthEast().lng();
  //   this.currentBounds.swLat = event.getSouthWest().lat();
  //   this.currentBounds.swLng = event.getSouthWest().lng();

  //   const Bounds: Array<number> = [
  //     event.getNorthEast().lat(),
  //     event.getNorthEast().lng(),
  //     event.getSouthWest().lat(),
  //     event.getSouthWest().lng()
  //   ];

  //   this.lastBoundsChangeMillisecond = new Date().getTime();
  //   setTimeout(() => {
  //     const currentTimeInMillis = new Date().getTime();
  //     if (currentTimeInMillis - this.lastBoundsChangeMillisecond > 999) {
  //       this.MapBoundsChange.emit(Bounds);
  //     }
  //   }, 1000);
  // }

  /**
   * Emits the current value of the custom search bar each time user types something.
   *
   * @param e the value of the user-typed text
   */
  public CustomSearchInputChange(e) {
    if (!this.nonEssentialKeys.includes(e.code)) {
      this.CustomSearchChange.emit(e.target.value);
      this.setUpCustomMarkerSearch();
      if (e.target.value.length > this.CustomSearchRepressDropdownCharacterCount) {
        this.displayAutocompleteOptions = true;
      } else {
        this.displayAutocompleteOptions = false;
      }
    }
  }

  /**
   * Calls the method that pans user to location and shows the location modal.
   *
   * @param e the event passed when user selects an option from the mat-autocomplete dropdown.
   */
  public LocationOptionSelected(e) {
    this.DropdownItemChosen(e.option.value);
    this.SearchLocationChosen.emit(e.option.value);
    this.CustomLocationControl.setValue({});
  }

  /**
   * Angular function for use in custom marker location search.
   */
  public DisplayFn(marker?: MapMarker): string | undefined {
    return marker ? marker.Title : undefined;
  }

  /**
   *
   * @param val Toggles the displayFooter property to true or false.
   */
  public ShowFooter(val: boolean): void {
    this.DisplayFooter = val;
    if (!val) {
      this.locationInfoService.SetSelectedMarker(undefined);
    }
  }
  /**
   * Toggles the add menu
   */
  public ShowAddMenu() {
    this.ShowNewOptions = !this.ShowNewOptions;
  }

  /**
   * Toggles the layer dropdown
   */
  public ShowLayers() {
    this.ShowLayersDropdown = !this.ShowLayersDropdown;
    if (this.ShowNewOptions === true) {
      this.ShowNewOptions = false;
    }
  }
  /**
   * called when the share icon in the toolbar is clicked
   */
  public ShareClicked() {
    // console.log('Want to share ', this.DisplayedJourney);
    this.JourneyShared.emit(this.DisplayedJourney);
  }

  /**
   * Toggles the EditingJourneyTitle boolean
   */
  public EditJourneyTitle() {
    this.EditingJourneyTitle = true;

    setTimeout(() => {
      this.JourneyTitleEdit.nativeElement.select();
    }, 0);
  }

  /**
   *
   * @param newTitle the new journey's title
   *
   * Emits the journey's new title and toggles the EditingJourneyTitle to false
   */
  public DoneEditingJourneyTitle(newTitle) {
    this.DisplayedJourney.Title = newTitle.value;
    this.EditingJourneyTitle = false;
    this.JourneyChanged.emit({ message: 'journey title changed', journey: this.DisplayedJourney });
  }

  public NewOptionClicked(action: any) {
    let newGroup;
    this.ShowNewOptions = false;
    let dayCount = 0;
    if (this._displayedJourney.ActivityGroups !== null) {
      dayCount = this._displayedJourney.ActivityGroups.filter(gr => gr.GroupType === 'day').length;
    } else {
      this._displayedJourney.ActivityGroups = [];
    }
    if (action === 'day') {
      newGroup = this.getFullDayActivityGroup(dayCount);
      // console.log('open panels b4', this.OpenPanels);
      this._displayedJourney.ActivityGroups.push(newGroup);
      this._openPanels.push(this._displayedJourney.ActivityGroups.length -1);
      // console.log("Open panels now after adding day:", this._openPanels);
      this.OnPanelOpenStateChanged(this.OpenPanels);
      this.changeDetector.detectChanges();
      this.assignOrder();
      this.updateItinerary('add day');
    } 
    else if (action === 'extras') {
      newGroup = this.getExtrasActivityGroup();
      newGroup.Title = this.getValidOptionsTitle();
      this._displayedJourney.ActivityGroups.push(newGroup);
      this.assignOrder();
      this.updateItinerary('add extras');
    } 
    else if (action === 'copy') { // if copying shared itinerary...
      if (this._displayedJourney.Shared) {
        const itinToCopy = this._displayedJourney;
        itinToCopy.ID = null;

        itinToCopy.ActivityGroups.forEach(activityGroup => {
          activityGroup.ID = null;
          activityGroup.Activities.forEach(activity => {
            activity.ID = null;
          });
        });

        const usernameToAdd: string = itinToCopy.SharedByUsername === '' ? 'user' : itinToCopy.SharedByUsername;
        itinToCopy.ActivityGroups.forEach((group: ActivityGroupModel) => {
          group.Activities.forEach((activity: ActivityModel) => {
            if (activity.Notes !== '') {
              activity.Notes = usernameToAdd + `: ${activity.Notes}`;
            }
          });
        });
        this.JourneyCopied.emit(
          {
            journey: this._displayedJourney
          });
        // this.usersCtxt.AddItinerary(itinToCopy);


      } else { // if copying one's own created itinerary...
        console.log('copying one\'s own itinerary...');

        this.JourneyCopied.emit({
          journey: new ItineraryModel({
            ID: "00000000-0000-0000-0000-000000000000",
            Title: `${this._displayedJourney.Title} (copy)`,
            ActivityGroups: this._displayedJourney.ActivityGroups,
            CreatedDateTime: undefined,
            Editable: undefined,
            Shared: undefined,
            SharedByUserID: undefined,
            SharedByUsername: undefined
          })
        });
        // this.State.Loading = true;
      }
      // focus on the journey input
      this.EditingJourneyTitle = true;
      const input = document.getElementById('JourneyTitleInput');
      setTimeout(function () {
        input.focus();
      }, 0);

    }
    // scroll all the way to the right:
    // const el = this.AmblActivityGroupList.nativeElement;
    // setTimeout(() => {
    //   el.scrollTo({ left: (el.scrollLeft + 264 + el.scrollWidth), behavior: 'smooth' });
    //   this.setScrollerToCurrentPosition();
    // }, 0);
  }

  public onActivityLocationClicked(activityLocation: any) {
    this.CurrentLatitude = activityLocation.locationData.Latitude;
    this.CurrentLongitude = activityLocation.locationData.Longitude;
    this.BelongsToJourney = true;
    this.SelectedLocation = null;
    this.SelectedMarker = activityLocation;
    this.changeDetector.detectChanges();
    this.locationInfoService.SetSelectedMarker(activityLocation);
    this.mapService.MapMarkerClickedEvent(this.GoogleInfoWindowRef);
  }

  public onJourneyChanged(event) {
    this.JourneyChanged.emit(event);
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
   * @param e the mouse event run when user clicks anywhere on the map
   *
   * closes certain elements based on the target of the mouse event
   */
  public OnDocClick(e) {
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

  /**
   * Saves the new MapMarker.
   *
   * @param marker The MapMarker to save.
   *
   */
  public SaveNewMarker(marker: MapMarker): void {
    if (!this.isEdit) {
      this.AddLocation.emit(marker);
    } else {
      this.EditLocation.emit(marker);
    }
  }

  public OnUserChoseIcon(icon: string, location: any) {
    let activity;
    this.DisplayedJourney.ActivityGroups.forEach(ag => {
      ag.Activities.forEach(act => {
        if (act.ID && !location) {
          act.WidgetIcon = icon;
        }
        if (location && (act.ID === location.ID)) {
          act.WidgetIcon = icon;
          activity = act;
        }
      });
    });
    this.JourneyChanged.emit({ message: 'activity icon changed', journey: this.DisplayedJourney, additional: { activity } });
  }

  public LegendTopIconClicked(event) {
    this.LegendIconClicked.emit(event);
  }

  public DisplayMoreInfo(marker: MapMarker): void {
    this.openMoreInfoDialog(marker);
  }



  /**
   * When a user clicks on an icon it calls this method which opens the BasicInfoWindowComponent.
   *
   * @param marker holds the MapMarker with all its information to be displayed in the basic info window.
   */
  // public DisplayMarkerInfo(marker: MapMarker): void {

  //   this.SearchControl.setValue('');
  //   this.displayAutocompleteOptions = false;
  //   this.ShowSearchBar = false;
  //   this.locationInfoService.SetSelectedMarker(marker);
  //   this.SelectedLocation = marker;
  //   this.changeDetector.detectChanges();
  //   this.isEdit = false;
  //   // const userLayerID = this.UserLayers.find(layer => layer.Shared === false).ID;

  //   // if (marker.LayerID === userLayerID) {
  //   //   this.isEdit = true;
  //   // }

  //   if (this.IsMobile) {
  //     this.MarkerData = new MarkerData(marker, this.MapMarkerSet, this._currentMapModel.ID, this.isEdit);
  //     this.ShowFooter(true);
  //   }
  //   console.log('displaying marker', marker);
  //   this.OnLocationClicked(this.GoogleInfoWindowRef, this.SelectedLocation);
  //   this.mapService.MapMarkerClickedEvent(this.amblInfoWindow);

  //   // this.zoomInToPoint(marker);
  // }

  /**
   * Attaches a click listener to the map that returns an object that includes the place id.
   * The place id is then assigned to the placeId field for use in the (mapClick) event.
   * This will be removed once AGM team releases code that passes back the place id on (mapClick) directly.
   *
   * @param map The map onto which the click event listener will be attached
   */
  public OnMapReady(map): void {
    map.addListener('click', (loc) => {
      loc.stop(); // stops the event that opens the default G-Maps info window
      this.placeId = loc.placeId;
    });
  }
  /**
   * Assigns order to the activity groups
   */
  protected assignOrder() {
    this._displayedJourney.ActivityGroups.forEach((group, idx) => {
      group.Order = idx;
    });
  }

  public OnPanelOpenStateChanged(event) {
    // console.log("emitting from lcu map", event);
    this.CurrentPanelOpenState.emit(event);

  }

  protected updateItinerary(typeChange: string) {
    this._displayedJourney.ActivityGroups.forEach((group: any) => {
      if (group.Activities.length === 0) {
        if (group.GroupType === 'day') {
          group.Activities.push(this.getNewActivity('Good Morning'));
        } else if (group.GroupType === 'extras') {
          group.Activities.push(this.getNewActivity('New Location'));
        }
      }
    });
    // updates an itinerary, does not save a new one
    console.log('the itinerary being changed: ', this._displayedJourney);
    // this.itineraryService.UpdateCurrentItinerary(this.DisplayedItinerary);

    if(typeChange === 'add day'){
      this.JourneyChanged.emit({ message: 'add day', journey: this._displayedJourney });
    }
    else {
      this.JourneyChanged.emit({ message: 'journey changed', journey: this._displayedJourney });
    }

    // temporarily comment this out... we will use a save button to save aggregated changes
    // until the new state system is implemented, thereby improving the speed of saving
    // this.State.Loading = true;
    // this.usersCtxt.EditItinerary(this.DisplayedItinerary);
  }


  protected getBasicDayActivityGroup(dayCount?: number) {
    return new ActivityGroupModel({
      Title: `Day ${dayCount + 1}`,
      CreatedDateTime: new Date(),
      GroupType: 'day',
      Checked: false,
      ID: "00000000-0000-0000-0000-000000000000",
      Activities: [
        this.getNewActivity('Beginning of day', 'hotel'),
        this.getNewActivity('End of day', 'hotel')
      ]
    });
  }

  protected getNewActivity(title?: string, widgetIcon?: string) {
    return new ActivityModel({
      Title: `${title ? title : 'New Location'}`,
      ID: "00000000-0000-0000-0000-000000000000",
      LocationID: null,
      Notes: '',
      TransportIcon: '',
      WidgetIcon: `${widgetIcon ? widgetIcon : 'location_on'}`,
      Favorited: false,
      Checked: false
    });
  }
  protected getFullDayActivityGroup(dayCount: number = 0) {
    return new ActivityGroupModel({
      Title: `Day ${dayCount + 1}`,
      CreatedDateTime: new Date(),
      GroupType: 'day',
      Checked: false,
      ID: "00000000-0000-0000-0000-000000000000",
      Activities: [
        this.getNewActivity('Good morning', 'hotel'),
        this.getNewActivity('Breakfast', 'restaurant'),
        this.getNewActivity('Lunch', 'restaurant'),
        this.getNewActivity('Dinner', 'restaurant'),
        this.getNewActivity('Good night', 'hotel')
      ]
    });
  }

  protected getExtrasActivityGroup() {
    const object: {
      Title: string,
      GroupType: string,
      Checked: boolean,
      ID: any,
      Activities: any
    } = {
      Title: 'Options',
      GroupType: 'extras',
      Checked: false,
      ID: "00000000-0000-0000-0000-000000000000",
      Activities: [this.getNewActivity()]
    };
    return object;
  }

  protected getValidOptionsTitle() {
    const validTitle = 'Options';
    let optionsNumToAssign = 1;
    let strNum = '';
    const optionsNumbers: Array<number> = [];
    this._displayedJourney.ActivityGroups.forEach(group => {
      if (group.Title.includes('Options (')) {
        const str = group.Title.substring(9);
        strNum = '';
        /*tslint:disable-next-line*/
        for (let idx = 0; idx < str.length; idx++) {
          if (!isNaN(Number(str[idx]))) { // if index is a number, add it to the string number
            strNum += str[idx];
          }
          optionsNumbers.push(Number(strNum)); // push number to array
        }
        optionsNumToAssign = Math.max(...optionsNumbers) + 1; // add one to the highest number in array and assign to be new title's number
      }
    });
    return `${validTitle} (${optionsNumToAssign})`;
  }

  /**
   * Sets up the search filtering for the custom marker search.
   */
  protected setUpCustomMarkerSearch(): void {
    if (this.CustomSearchInputResults && this.CustomSearchInputResults.length > 0) {
      this.CustomSearchInputResults.forEach(loc => {
        loc.IconImageObject = this.mapConversions.ConvertIconObject(loc.Icon, this.MapMarkerSet);
      });
      this.options = this.CustomSearchInputResults;
      this.FilteredLocations = this.CustomLocationControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.Title),
          map(title => title ? this.filterCustomLocations(title) : this.options.slice()),
        );
    }
  }

  /**
   * Strips locations that don't exist within the bounds and returns the altered array.
   * TODO: write the edge case for locations that exist on map where lat or lng overlap
   *
   * @param locationList The list of locations that come with the map that should be stripped
   * @param bounds The bounds used to determine which locations to strip
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
   * Runs the boiler plate code that sets up location searching for AGM Google Maps.
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
          this.callDisplayMarkerWithGooglePlaceDetails(place);
        });
      });
    });
  }

  /**
   *
   * @param results the results of the google api call
   *
   * takes the results of a google api call and opens the info window for that place
   */
  protected callDisplayMarkerWithGooglePlaceDetails(results) {

    const regionIndices = this.getLocationRegionIndices(results);

    const tempActivity = this.getNewActivity(results.name);
    console.log("RESULTS: ", results)
    tempActivity.locationData = new MapMarker({
      ID: '',
      Title: results.name,
      GoogleLocationName: results.name,
      Icon: results.icon,
      Latitude: this.normalizeLatitudeAndLongitude(results, true),
      Longitude: this.normalizeLatitudeAndLongitude(results, false),
      Telephone: results.international_phone_number,
      Website: results.website,
      Address: results.formatted_address,
      Town: results.address_components[regionIndices.twnCtyTwnshpIndex] ?
        results.address_components[regionIndices.twnCtyTwnshpIndex].long_name : '',
      State: results.address_components[regionIndices.stateIndex] ?
        results.address_components[regionIndices.stateIndex].long_name : '',
      Country: results.address_components[regionIndices.countryIndex] ?
        results.address_components[regionIndices.countryIndex].long_name : '',
      Photos: this.buildPhotoArray(results.photos),
      Type: results.types,
      IconImageObject: { scaledSize: { width: 30, height: 30 }, url: './assets/ambl_marker.png' }
    });
    this.ShowSearchedLocation(tempActivity);

    // Maybe TODO: Make the call to the API and then put the time out here,
    // only displaying the marker if it's a single click... for performance improvement
    // LayerID: this.UserLayers.find(lay => lay.Shared === false).ID,
  }

  /**
   * sets up the search methods (if any) on which to search the map
   */
  // protected setUpSearchMethods() {
  //   if (this.CustomSearchMethod) { this.SearchMethods.push(this.CustomSearchMethod); }
  //   if (this.DisplayGoogleSearchMethod) { this.SearchMethods.push('Google'); }
  //   if (this.SearchMethods.length === 0) {
  //     this.DisplaySearchOptions = false;
  //   } else {
  //     this.DisplaySearchOptions = true;
  //     this.SearchMethod = this.SearchMethods[0];
  //   }
  // }

  /**
   *
   * @param googleResults the results from the google places api call
   *
   * takes google places api call results and returns object of indices where necessary regional data exists
   */
  protected getLocationRegionIndices(googleResults): any {
    const regionIndices = {
      twnCtyTwnshpIndex: -1,
      stateIndex: -1,
      countryIndex: -1
    };
    const typeValues = {
      town: 'locality',
      township: 'administrative_area_level_3',
      county: 'administrative_area_level_2',
      state: 'administrative_area_level_1',
      country: 'country'
    };
    googleResults.address_components.forEach((comp, idx) => {
      if (comp.types.length > 0) {
        if (comp.types.includes(typeValues.town)) {
          regionIndices.twnCtyTwnshpIndex = idx;
        }
        if (regionIndices.twnCtyTwnshpIndex === -1 && comp.types.includes(typeValues.county)) {
          regionIndices.twnCtyTwnshpIndex = idx; // if no town, set to county
        }
        if (regionIndices.twnCtyTwnshpIndex === -1 && comp.types.includes(typeValues.township)) {
          regionIndices.twnCtyTwnshpIndex = idx; // if no town or county, set to township
        }
        if (comp.types.includes(typeValues.state)) {
          regionIndices.stateIndex = idx;
        }
        if (comp.types.includes(typeValues.country)) {
          regionIndices.countryIndex = idx;
        }
      }
    });
    return regionIndices;
  }

  /**
   * Assigns the lat/lng and zoom for the first activity on a journey
   */
  protected assignDefaultMapConfiguration() {
    if (this.AmblOnLocationArray && this.DisplayedJourney) {
      const firstActivity = this.DisplayedJourney.ActivityGroups[0].Activities[0];
      const firstLocation = this.AmblOnLocationArray.find(loc => loc.ID === firstActivity.LocationID);
      if (firstLocation) {
        this.CurrentZoom = 10;
        this.CurrentLongitude = firstLocation.Longitude;
        this.CurrentLatitude = firstLocation.Latitude;
      } else {
        this.CurrentZoom = this.defaultLocationData.zoom;
        this.CurrentLongitude = this.defaultLocationData.lng;
        this.CurrentLatitude = this.defaultLocationData.lat;
      }
    }
  }

  /**
   *
   * @param mapMarkerData the results of the google api call
   *
   * @param isLat boolean that indicates whether to return latitude data or longitude data
   *
   * takes google places api call results and lat/lng boolean and returns normalized values for latitude or longitude
   */
  protected normalizeLatitudeAndLongitude(mapMarkerData, isLat: boolean): number {
    const markerData = mapMarkerData.geometry.location;
    if (isLat) {
      return typeof markerData.lat === 'function' ? markerData.lat() : markerData.lat;
    } else {
      return typeof markerData.lng === 'function' ? markerData.lng() : markerData.lng;
    }
  }

  /**
   * Filter for use in custom marker location search.
   */
  protected filterCustomLocations(title: string): Array<MapMarker> {
    const filterValue = title.toLowerCase();
    return this.options.filter(option => option.Title.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Sets primary layer to checked and secondary layers to unchecked and resets active location.
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
   * Sets _currentMapModel.orgin to the values of the incoming lat and long.
   * ParseFloat is added to the incoming value in the instance that it is saved as a string.
   * AGM can only take Numbers as the lat and long values, strings will not process correctly.
   * Random decimal point are appended due to the fact the AGM uses == to determine current lat/long/zoom.
   * If random decimals are not added then the map will not zoom/pan once user moves the map.
   *
   * @param value the point (lat / lng) to pan to
   */
  protected zoomInToPoint(value): void {
    this.CurrentLatitude = parseFloat(value.Latitude) + (Math.random() / 100000);
    this.CurrentLongitude = parseFloat(value.Longitude) + (Math.random() / 100000);
    this.CurrentZoom = 12;
  }

  /**
   * Takes and array of photos returned from the google api and pulls the photo reference out
   * and builds the url to call so image displays. (currently only pulling one image from loop).
   *
   * @param photos the photos passed in
   */
  protected buildPhotoArray(photos: Array<any>): Array<string> {
    const width = 100; // the max width of the image to display
    let photoUrls: Array<string>;
    const apiKey: string = this.mapService.GetMapApiKey();
    if (photos) {
      photoUrls = new Array<string>();
      // Just getting the first photo for now but set up to be full loop for future
      for (let i = 0; i < 1; i++) {
        const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' +
          width +
          '&photoreference=' +
          photos[i].photo_reference +
          '&key=' +
          apiKey;
        photoUrls.push(photoUrl);
      }
    }
    return photoUrls;
  }

  // protected shiftCuratedLayerToTop() {
  //   const first = 'Curated';
  //   if (this._userLayers && this._userLayers !== undefined) {
  //     this._userLayers.sort((layer1, layer2) => {
  //       return layer1.Title === first ? -1 : layer2.Title === first ? 1 : 0;
  //     });
  //   }
  // }

  /**
   * Opens the 'More Info' dialog when the button is pressed in the 'Basic Info' info window.
   *
   * @param marker The MapMarker data to pass to the 'More Info' dialog.
   */
  protected openMoreInfoDialog(marker: MapMarker): void {
    if (this.moreInfoWindowDR) {
      this.moreInfoWindowDR.close();
    }
    const dialogRef: any = this.dialog.open(MoreInfoWindowComponent, {
      panelClass: 'more-info-window',
      width: '330px',
      height: '88vh',
      position: { right: '10px', top: '35px', bottom: '35px' },
      backdropClass: 'dialogRefBackdrop',
      hasBackdrop: false,
      disableClose: true,
      data: {
        marker,
        markerSet: this.MapMarkerSet,
        // layerID: this.UserLayers.find(lay => lay.Shared === false).ID,
        isEdit: this.isEdit
      }
    });

    this.moreInfoWindowDR = dialogRef;

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data !== undefined && data !== null) {
          this.SaveNewMarker(data);
        }
      }
    );
  }
  /**
   * Called when the user selects a location from the google search
   * @param searchedLocation the activity to search
   */
  public ShowSearchedLocation(searchedLocation: ActivityModel) {
    this.SearchControl.setValue('');
    this.displayAutocompleteOptions = false;
    this.ShowSearchBar = false;
    this.BelongsToJourney = false;
    this.SelectedLocation = searchedLocation;
    this.SelectedMarker = searchedLocation.locationData;
    this.changeDetector.detectChanges();

    this.locationInfoService.SetSelectedMarker(searchedLocation.locationData);

    this.mapService.MapMarkerClickedEvent(this.amblInfoWindow);

    this.zoomInToPoint(searchedLocation.locationData);
  }

  /**
   * Handles the show/hide lifecycle of a selected AMBL-ON Map Marker and initializes the
   * basic info popover to display Map Marker information.
   *
   * @param infoWindow The current AGM info window.
   * @param marker The Map Marker that was selected.
   */
  public OnMarkerClicked(infoWindow: AgmInfoWindow, marker: MapMarker): void {
    this.BelongsToJourney = true;
    this.SelectedLocation = null;
    this.SelectedMarker = marker;
    this.isEdit = false;
    // const userLayerID = this.UserLayers.find(layer => layer.Shared === false).ID;
    // if (marker.LayerID === userLayerID) {
    //   this.isEdit = true;
    // }
    this.changeDetector.detectChanges();

    this.locationInfoService.SetSelectedMarker(marker);
    // console.log("infoWindow: ", infoWindow);
    this.mapService.MapMarkerClickedEvent(infoWindow);

  }

  /**
   * Handles the show/hide lifecycle of a selected GOOGLE Map Marker and initializes the
   * basic info popover to display Map Marker information.
   *
   * @param infoWindow The current AGM info window.
   * @param marker The Map Marker that was selected.
   */
  public OnLocationClicked(infoWindow: AgmInfoWindow, marker: MapMarker): void {
    // console.log("setting selected marker to null")
    this.SelectedMarker = null;
    this.changeDetector.detectChanges();
    this.mapService.MapMarkerClickedEvent(infoWindow);
  }

}
