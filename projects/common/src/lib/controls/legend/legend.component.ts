import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MapService } from '../../services/map.service';
import { MarkerInfo } from '../../models/marker-info.model';
import { MapMarker } from '../../models/map-marker.model';
import { Constants } from '../../utils/constants/constants';
import { MatSidenav, MatDialog } from '@angular/material';
import { UserMap } from '../../models/user-map.model';
import { DeleteLocationsComponent } from './delete-locations/delete-locations.component';
import { LocationInfoService } from '../../services/location-info.service';



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
   /**
   * The MarkerInfo where the icon url can be refrenced
   */
  protected iconList: Array<MarkerInfo> = Constants.DEFAULT_MAP_MARKER_SET;
   /**
   * The maximum amount of time in milliseconds the average person expects between clicks of a double-click
   */
  protected expectedDoubleClickElapsedTime: number = 500;

  protected isDoubleClick: boolean;

  public matContentWidth: string;
  public matContentHeight: string;
  public Tools: string;
  public SelectedLocation: MapMarker;
  public EditMode: boolean = false;
  public LegendContentHeight: string;

   

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
/**
 * List of locations that are hidden
 */
  public HiddenLocations: Array<MapMarker>;
/**
 * to determine if the hidden list is visible
 */
  public HiddenListVisible: boolean;

  // protected undefinedCounter: number;

  // public LegendContentMarginTop: string;

/**
 * tracker so if a location is selected and the user scrolls the list, the scroll function doesnt scroll
 * 
 * away from the location that the user scrolled to
 */
  protected scrolled: boolean;

  

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

  @Output('display-basic-info')
  DisplayBasicInfo: EventEmitter<MapMarker>;

  @Output('display-more-info')
  DisplayMoreInfo: EventEmitter<MapMarker>;

  @Output('edit-legend-locations')
  EditLegendLocations: EventEmitter<Array<MapMarker>>;

  @Output('delete-locations')
  DeleteLegendLocations: EventEmitter<Array<MapMarker>>;

  @Output('is-legend-open')
  IsLegendOpen: EventEmitter<boolean>;

  @ViewChild('sidenav', {static: false}) public drawer: MatSidenav;

  //CONSTRUCTOR

  constructor(protected mapService: MapService, public Dialog: MatDialog, protected locationInfoService: LocationInfoService ) {
    this.DisplayBasicInfo = new EventEmitter<MapMarker>();
    this.EditLegendLocations = new EventEmitter<Array<MapMarker>>();
    this.DeleteLegendLocations = new EventEmitter<Array<MapMarker>>();
    this._currentlyActiveLocations = new Array<MapMarker>();
    this._legendLocations = new Array<MapMarker>();
    this._currentlyActiveLayers = new Array<string>();
    this.LegendOpen = false;
    this.matContentWidth = "40px";
    this.matContentHeight = "40px";
    this.Tools = "closed";
    this.IsLegendOpen = new EventEmitter<boolean>();
    this.DisplayMoreInfo = new EventEmitter<MapMarker>();
    this.scrolled = false;
    this.HiddenLocations = new Array<MapMarker>();
    this.HiddenListVisible = false;
    this.LegendContentHeight="92%";
  }

  //LIFE CYCLE

  ngOnInit() {
   
  }

  ngOnChanges(){
    //console.log("open: ", this.LegendOpen, " Selected: ", this.SelectedLocation);
   
    if(this.LegendOpen && !this.SelectedLocation){
      this.SetLocationList();
      this.CheckIfHidden();
    }
    if(this.LegendOpen && this.SelectedLocation){
      this.scroll(document.querySelector('#Selected'));
    }
    // this.SetLocationList();
    this.SelectedLocation = this.locationInfoService.GetSelectedMarker();
    // console.log("selected location: ", this.SelectedLocation)
  }
  
  /**
   * @param lat The latitude to pan to
   *
   * @param long The longitude to pan to
   *
   * Calls function on map service that emits event with the given lat/lng
   */

  //API METHODS

/**
 * Toggles the HiddenLocation list in the legend
 */
public ToggleHiddenListVisibility(){
  this.HiddenListVisible = !this.HiddenListVisible;
}

/**
 * Checks to see if any locations should be hidden coming from the back-end
 */
public CheckIfHidden():void{
  for(let i = 0; i < this._currentlyActiveLocations.length; i++){
    if(this._currentlyActiveLocations[i].IsHidden){
      console.log("hiding: ", this._currentlyActiveLocations[i]);
      this.HiddenLocations.push(this._currentlyActiveLocations[i]);
      this._currentlyActiveLocations.splice(i, 1);
    }
  }
}


/**
 * Marks the MapMarker as being checked
 * 
 * @param event Marker to check
 */
public CheckMarker(event: MapMarker):void{
  console.log("checking: ", event);
  event.Checked = !event.Checked;
  console.log("checked = ", event.Checked);
}

/**
 * Hides the checked locations in the _currentlyActiveLocations and pushes them to the HiddenLocation Array
 */
public HideLocations():void{
  console.log("locs", this._currentlyActiveLocations);
  // let temp = this._currentlyActiveLocations;
  let justHid = new Array<MapMarker>();
  for(let i = 0; i < this._currentlyActiveLocations.length; i++){
    if(this._currentlyActiveLocations[i].Checked === true){
      this._currentlyActiveLocations[i].IsHidden = true;
      this._currentlyActiveLocations[i].Checked = false;
      console.log("hiding: ", this._currentlyActiveLocations[i]);
      this.HiddenLocations.push(this._currentlyActiveLocations[i]);
      justHid.push(this._currentlyActiveLocations[i]);
    }
  }
  // this._currentlyActiveLocations = temp;
  // console.log("hid ", this.HiddenLocations);

  //to avoid error in back end
  if(justHid.length > 0){
    this.EditLegendLocations.emit(justHid);
  }
  this.SetLocationList();
}

/**
 * Makes the the markers from the HiddenLocations that are checked visible again.
 */
public MakeVisible():void{
  let tempHidden = new Array<MapMarker>();
  //list of markers to emit to backend 
  let nowVisible = new Array<MapMarker>();
  this.HiddenLocations.forEach(function(marker){
    if(marker.Checked === true){
      marker.Checked = false;
      marker.IsHidden = false;
      this._currentlyActiveLocations.push(marker);
      nowVisible.push(marker);
    }
    else{
      tempHidden.push(marker);
    }
  },this)
  this.HiddenLocations = tempHidden;
  this.EditLegendLocations.emit(nowVisible);
  this.SetLocationList();
}

/**
 * Pulls up the Delete-location modal for users to confirm deletion
 * 
 * delets both hidden and visible locations
 */
public DeleteLocationConfirmation(): void {
  let markersToDelete = new Array<MapMarker>();
  this._currentlyActiveLocations.forEach(function(marker){
    if(marker.Checked === true){
      markersToDelete.push(marker);
      console.log("pushing marker: ", marker);
    }
  })
  this.HiddenLocations.forEach(function(marker){
    if(marker.Checked === true){
      markersToDelete.push(marker);
      console.log("pushing marker: ", marker);
    }
  })
  const dialogRef = this.Dialog.open(DeleteLocationsComponent, {
    width: '500px',
    data: { locationsLength: markersToDelete.length }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.DeleteLegendLocations.emit(markersToDelete);
    }
  });
}

/**
 * informs the map service that the TopLists button was clicked
 */
public TopListsClicked() {
  this.mapService.LegendTopListsClicked();
}

/**
 * toggles tools view based on current view
 */
public ToggleTools():void{
  if(this.Tools === "basic"){
    this.Tools = "closed";
    this.LegendContentHeight = '92%';
  }
  else if(this.Tools === "closed"){
    this.Tools = "basic";
    this.LegendContentHeight = '80%';

  }
  else if(this.Tools === "advanced"){
    this.Tools = "basic";
    this.EditMode = false;
  }
}

/**
 * Toggles Tools view to advanced
 */
public ShowMoreTools(): void{
  this.Tools = "advanced";
  this.EditMode = true;
}

/**
 * When an item from the legend is double-clicked it will display the mor info-window
 * @param item marker to display
 */
public ShowMoreInfo(item:MapMarker):void{
  this.isDoubleClick = true;
  this.DisplayMoreInfo.emit(item);
  this.PanTo(item);
  setTimeout(x => {
    this.isDoubleClick = false;
  }, 500);
  
}

/**
 * pans map to @param marker lat and long
 */
  public PanTo(marker: MapMarker) {
    setTimeout(x => {
    if (!this.isDoubleClick) {
    if (!this.EditMode) {
      if (typeof (marker.Longitude) === 'string') {
        marker.Longitude = parseFloat(marker.Longitude);
      }
      if (typeof (marker.Latitude) === 'string') {
        marker.Latitude = parseFloat(marker.Latitude);
      }
      // this.Pan.emit({ lat: marker.Latitude, lng: marker.Longitude }); // zoom is checked with == in AGM library so value must be different in order to assure zoom change function is run - hence the random number between 0 and 1
      this.DisplayBasicInfo.emit(marker);
      this.SelectedLocation = marker;
      if(this.LegendOpen && this.SelectedLocation){
        this.scroll(document.querySelector('#Selected'));
      }
      // console.log("panto marker = ", marker)
    } 
    else{
      // marker.Checked = !marker.Checked;
      this.SelectedLocation = marker;
      this.CheckMarker(marker);
      // console.log("checked = ", marker.Checked);
    }
  }
}, this.expectedDoubleClickElapsedTime);
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
        //  console.log("selected location: ", this.SelectedLocation)

    this.LocationsList = new Array<MapMarker>();
    this.removeHiddenLocations();

    let visLoc = new Array<MapMarker>();
        visLoc = this._currentlyActiveLocations;

    //Map Title Logic

    if(this._currentMapModel){
      this.MapTitle = this._currentMapModel.Title;
    }    
    else if(this._currentlyActiveLayers && this._currentlyActiveLayers[0]){
      this.MapTitle = this._currentlyActiveLayers[0];
    }
    else {
      this.MapTitle = "No Layer Selected";
    }
    //end title logic

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
 * To track whether or not the legend is closed
 */
  public CloseLegend():void{
    this.LegendOpen = false;
  }
/**
 * To track whether or not the legend is open
 */
  public OpenLegend():void{
    this.LegendOpen = true;
  }
/**
 * Toggles the side nav where the legend lives
 */
  public toggleDrawer() {
    if (this.drawer.opened) {
      this.drawer.close();
      this.IsLegendOpen.emit(false);
      if(this.Tools !== "closed"){
        this.Tools = "closed";
        this.EditMode = false;
      }
      this.LegendOpen = false;
      this.matContentWidth = "40px";
      this.matContentHeight = "40px";

    } else {
      this.drawer.open();
      this.IsLegendOpen.emit(true);
      this.LegendOpen = true;
      this.matContentWidth = "100%";
      this.matContentHeight = "88vh";
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
   * @param event
   *
   * This is needed for the drag and drop to reflect the changes
   *
   * UpdateVisibleLocations assigns the newly ordered LocationsList to the VisibleLocations in mapService
   */
  protected drop(event: CdkDragDrop<string[]>) {
    //console.log("drop event called");
    moveItemInArray(this.LocationsList, event.previousIndex, event.currentIndex);
    this.giveOrder();
    this.EditLegendLocations.emit(this.LocationsList);
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
  protected compareObject(marker1: MapMarker, marker2: MapMarker) {
    // Compare based on OrderIndex
    if (marker1.OrderIndex > marker2.OrderIndex)
      return 1;
    if (marker1.OrderIndex < marker2.OrderIndex)
      return -1;
    //If same OrderIndex, Compare based on Alphabet
    if (marker1.OrderIndex === marker2.OrderIndex) {

      if (marker1.Title.toUpperCase() > marker2.Title.toUpperCase())
        return 1;
      if (marker1.Title.toUpperCase() < marker2.Title.toUpperCase())
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

  /**
   * Removes the Hidden locations from the _currentlyActiveLocations so they do not display in the legend
   */
  protected removeHiddenLocations():void{
    let templist = new Array<MapMarker>();
    this._currentlyActiveLocations.forEach( function(marker){
      if(marker.IsHidden === false || !marker.IsHidden){
        templist.push(marker);
      }
    },this)
    this._currentlyActiveLocations = templist;
  }
/**
 * Called when a user selects a location from the map while the legend is open
 * 
 * @param element #Selected
 */
  protected scroll(element: any):void {
    if(element){
      let parent = document.getElementById("legend-content")
      let isOut = this.isOutOfParentElement(element, parent);
      if(isOut === false){
        this.scrolled = true;
      }
      if(isOut === true && this.scrolled === false){
        console.log("scrolled")
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          //wait for scrolling to finish
          this.scrolled = true;
        },500);
      }
    }
}

/**
 * Checks to see if the @child element is outside the @parent element
 */
protected isOutOfParentElement(child: HTMLElement, parent: HTMLElement):boolean {  
	// Get element's bounding
  let childBound = child.getBoundingClientRect();
  let parentBound = parent.getBoundingClientRect();
  // console.log("ChildBounds = ", childBound)
  // console.log("ParentBounds = ", parentBound)

	// Check if it's out of the viewport on each side
  
  if(childBound.top < parentBound.top){
    return true;
  }

  //commented out since we are only concerned with child being out of view above and below parent
  //when checkboxes are present it puts the childs left outside the parents left, even though it's not
  //out of view.

  // if(childBound.left > parentBound.left){
  //   return true;
  // }
  // if(childBound.right > parentBound.right){
  //   return true;
  // }
  if(childBound.bottom > parentBound.height){ 
    return true;
  }
  
  else{
    return false;
  }

}

}
