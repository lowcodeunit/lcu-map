import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MapService } from '../../services/map.service';
// import { IndividualMap } from '../../models/individual-map.model';
import { MarkerInfo } from '../../models/marker-info.model';
import { MapMarker } from '../../models/map-marker.model';
import { Constants } from '../../utils/constants/constants';
import { MatSidenav } from '@angular/material';
import { UserMap } from '../../models/user-map.model';



@Component({
  selector: 'lcu-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})

export class LegendComponent implements OnInit, OnChanges {



  //PROPERTIES
  protected _currentlyActiveLocations: Array<MapMarker>;
  protected _currentMapModel: UserMap;
  protected _legendLocations: Array<MapMarker>;
  protected _currentlyActiveLayers: Array<string>;

  public matContentWidth: string;
  public matContentHeight: string;
  public Tools: string;
  public SelectedLocation: MapMarker;
  public EditMode: boolean = false;

  // @Input('get-legend-locations')
  // public set GetLegendLocations(value: Array<MapMarker>) {
  //   if (value !== undefined) {
  //     this._legendLocations = value;
  //   }
  // }

  @Input('current-map-model')
  public set CurrentMapModel(value: UserMap) {
    this._currentMapModel = value;
  }


  @Input('currently-active-locations')
  public set CurrentlyActiveLocations(value: Array<MapMarker>) {
    this._currentlyActiveLocations = value;
    // console.log("Active Locations Changed");
  }

  @Input('currently-active-layers')
  public set CurrentlyActiveLayers(value: Array<string>) {
    this._currentlyActiveLayers = value;
  }

  @Input('selected-location')
  public set SelectedLoaction(value: MapMarker){
    this.SelectedLocation = value;
  }

  @Output('pan')
  Pan: EventEmitter<any>;

  @Output('display-basic-info')
  DisplayBasicInfo: EventEmitter<MapMarker>;

  @Output('save-legend-locations')
  SaveLegendLocations: EventEmitter<Array<MapMarker>>;

  @Output('is-legend-open')
  IsLegendOpen: EventEmitter<Boolean>;

  @ViewChild('sidenav', {static: false}) public drawer: MatSidenav;




  /**
   * The MarkerInfo where the icon url can be refrenced
   */
  protected iconList: Array<MarkerInfo> = Constants.DEFAULT_MAP_MARKER_SET;

  /**
   * The Title of the map which is displayed at the top of the Legend
   */
  public MapTitle: string;

  /**
   * The List of locations that will be displayed in the legend
   */
  //public LocationsList: Array<LocationListModel> = new Array<LocationListModel>();

  public LocationsList: Array<MapMarker> = new Array<MapMarker>();

  public LegendOpen: boolean;



  //CONSTRUCTOR

  constructor(protected mapService: MapService) {
    this.Pan = new EventEmitter<any>();
    this.DisplayBasicInfo = new EventEmitter<MapMarker>();
    this.SaveLegendLocations = new EventEmitter<Array<MapMarker>>();
    this._currentlyActiveLocations = new Array<MapMarker>();
    this._legendLocations = new Array<MapMarker>();
    this._currentlyActiveLayers = new Array<string>();
    this.LegendOpen = false;
    this.matContentWidth = "30px";
    this.matContentHeight = "30px";
    this.Tools = "closed";
    this.IsLegendOpen = new EventEmitter<Boolean>();
  }

  //LIFE CYCLE

  ngOnInit() {
    // this.SetLocationList();

  }

  ngOnChanges(){
    // console.log("Selected location from legend ",this.SelectedLocation);
      this.SetLocationList();
      this.scroll(document.querySelector('#Selected'));

  }
  ngAfterContentInit(){

  }




  /**
   * @param lat The latitude to pan to
   *
   * @param long The longitude to pan to
   *
   * Calls function on map service that emits event with the given lat/lng
   */

  //API METHODS

public scroll(element: any) {
    if(element){
      element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Toggles Tools view to advanced
 */
public ShowMore(): void{
  this.Tools = "advanced";
  this.EditMode = true;
}
/**
 * toggles tools view based on current view
 */
public ToggleTools():void{
  if(this.Tools === "basic"){
    this.Tools = "closed";
  }
  else if(this.Tools === "closed"){
    this.Tools = "basic";
  }
  else if(this.Tools === "advanced"){
    this.Tools = "basic";
    this.EditMode = false;
  }
}

/**
 * pans map to @param marker lat and long
 */
  public PanTo(marker: MapMarker) {
    if (!this.EditMode) {
      if (typeof (marker.Longitude) === 'string') {
        //console.log("lng is a string");
        marker.Longitude = parseFloat(marker.Longitude);
        //console.log("marker.Longitude = ",marker.Longitude);
      }
      if (typeof (marker.Latitude) === 'string') {
        //console.log("lat is a string");
        marker.Latitude = parseFloat(marker.Latitude);
        //console.log("marker.Latitude = ",marker.Latitude);
      }
      // console.log("Panning to: ", marker);
      this.Pan.emit({ lat: marker.Latitude, lng: marker.Longitude, zoom: 15 + Math.random() }); // zoom is checked with == in AGM library so value must be different in order to assure zoom change function is run - hence the random number between 0 and 1
      this.DisplayBasicInfo.emit(marker);
      this.SelectedLocation = marker;
      //console.log("Marker in legend = " + marker.Title);
    } else {
      marker.Checked = !marker.Checked;
    }
  }

  /**
   * @param map the map config that is passed in
   *
   * this function loops through the map cofig and fills the LocationsList
   *
   * (this is what is displayed on the drop down)
   */
  public SetLocationList() {
     //set to new so no duplicates present themselves
    this.LocationsList = new Array<MapMarker>();

    let visLoc = new Array<MapMarker>();
        visLoc = this._currentlyActiveLocations;

    //layers logic
    if (this._currentlyActiveLayers && this._currentlyActiveLayers.length > 1) {
      this.MapTitle = "Layers (" + this._currentlyActiveLayers.length + ")";
      // console.log("Layers = ", this._currentlyActiveLayers);
    }
    else if (this._currentlyActiveLayers && this._currentlyActiveLayers[0]) {
      this.MapTitle = this._currentlyActiveLayers[0];
    }
    else {
      this.MapTitle = "No Layer Selected";
    }
    //end layer logic

    if (visLoc.length > 0) {
      this.LocationsList = this.assignIconUrl(visLoc);
      this.LocationsList = visLoc;
      //console.log("List",this.LocationsList);
      this.LocationsList.sort(this.compareObject);
      this.LocationsList = this.moveUndefinedToBottom(this.LocationsList);
    }
    else{
      this.LocationsList = new Array<MapMarker>();
    }
  }


  /**
   * @param event
   *
   * This is needed for the drag and drop to reflect the changes
   *
   * UpdateVisibleLocations assigns the newly ordered LocationsList to the VisibleLocations in mapService
   */
  drop(event: CdkDragDrop<string[]>) {
    //console.log("drop event called");
    moveItemInArray(this.LocationsList, event.previousIndex, event.currentIndex);
    this.giveOrder();
    this.SaveLegendLocations.emit(this.LocationsList);
  }

  public CloseLegend():void{
    this.LegendOpen = false;
  }

  public OpenLegend():void{
    this.LegendOpen = true;
  }

  public toggleDrawer() {
    if (this.drawer.opened) {
      this.drawer.close();
      this.IsLegendOpen.emit(false);
      if(this.Tools !== "closed"){
        this.Tools = "closed";
      }
      this.LegendOpen = false;
      this.matContentWidth = "30px";
      this.matContentHeight = "30px";

    } else {
      this.drawer.open();
      this.IsLegendOpen.emit(true);
      this.LegendOpen = true;
      this.matContentWidth = "0px";
      this.matContentHeight = "95vh";
    }
  }


  //HELPERS
  /**
   * @param locList an array of the mapMarkers
   *
   * assigns icon Url based on icon name vs the icon lookup
   */
  protected assignIconUrl(locList: Array<MapMarker>) {
    //let temp: Array<MapMarker> = new Array<MapMarker>();
    for (let i = 0; i < locList.length; i++) {
      if(!locList[i].IconImageObject.url || locList[i].IconImageObject.url===null || locList[i].IconImageObject.url ==="" ){
      let iconTemp = this.iconList.filter(loc => {
        return loc.IconLookup.toLocaleLowerCase() === locList[i].Icon.toLocaleLowerCase();
      });
      if(iconTemp && iconTemp.length >0){
       locList[i].IconImageObject.url = iconTemp[0].IconUrl;
      // temp.push(locList[i]);
      }
      else{
        // console.log("Icon url doesn't exist for ", locList[i].Icon )
      }
    }
    }
    return locList;
  }

  /**
   * Gives order to the MapMarkers based on how the user orders the legend
   */
  protected giveOrder(): void {
    for (let i = 0; i < this.LocationsList.length; i++) {
      this.LocationsList[i].OrderIndex = i;
    }
  }

  /**
   * compares and sorts the objects based on orderIndex
   *
   * if the indexes are the same then it compares based on title so it is alphabetical
   */
  protected compareObject(obj1: MapMarker, obj2: MapMarker) {
    if (obj1.OrderIndex > obj2.OrderIndex)
      return 1;
    if (obj1.OrderIndex < obj2.OrderIndex)
      return -1;

    if (obj1.OrderIndex === obj2.OrderIndex) {

      if (obj1.Title.toUpperCase() > obj2.Title.toUpperCase())
        return 1;
      if (obj1.Title.toUpperCase() < obj2.Title.toUpperCase())
        return -1;
    }
    return 0;
  }
  /**
   * without this the MapMarker objects that have an undefined indexOrder are put at the top
   *
   * this method sets the undefined indexOrder aside and appends them to the end of the array/legend
   */
  protected moveUndefinedToBottom(list: Array<MapMarker>) {
    let undefinedList = new Array<MapMarker>();
    let locList = new Array<MapMarker>();

    list.forEach(function (value) {
      if (value.OrderIndex >= 0) {
        locList.push(value);
        //console.log("pushing ", value, " to ", locList);
      }
      else {
        undefinedList.push(value);
      }
      //console.log("Order = ", value.OrderIndex, "Title = ", value.Title);
    });
    if (undefinedList) {
      undefinedList.forEach(function (value) {
        locList.push(value);
      })
    }
    return locList;
  }

}
