import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MapService } from '../../services/map.service';
// import { IndividualMap } from '../../models/individual-map.model';
import { MarkerInfo } from '../../models/marker-info.model';
import { MapMarker } from '../../models/map-marker.model';
import { Constants } from '../../utils/constants/constants';
import { MatSidenav, MatDialog } from '@angular/material';
import { UserMap } from '../../models/user-map.model';
import { DeleteLocationsComponent } from './delete-locations/delete-locations.component';



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

  @Input('selected-location')
  public set SelectedLoaction(value: MapMarker){
    this.SelectedLocation = value;
    this.scrolled = false;
  }

  @Output('pan')
  Pan: EventEmitter<any>;

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

  constructor(protected mapService: MapService, public Dialog: MatDialog ) {
    this.Pan = new EventEmitter<any>();
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
    // this.LegendContentMarginTop = "0px";
    this.DisplayMoreInfo = new EventEmitter<MapMarker>();
    this.scrolled = false;
    this.HiddenLocations = new Array<MapMarker>();
    this.HiddenListVisible = false;
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
    this.SetLocationList();
    // console.log("selected location: ", this.SelectedLocation)
  }
  // ngAfterContentInit(){

  // }




  /**
   * @param lat The latitude to pan to
   *
   * @param long The longitude to pan to
   *
   * Calls function on map service that emits event with the given lat/lng
   */

  //API METHODS

protected scroll(element: any):void {
    if(element){
      let parent = document.getElementById("legend-content")
      let isOut = this.IsOutOfParentElement(element, parent);
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

public IsOutOfParentElement(child: HTMLElement, parent: HTMLElement):boolean {  
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
public ToggleHiddenListVisibility(){
  this.HiddenListVisible = !this.HiddenListVisible;
}
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
 * Toggles Tools view to advanced
 */
public ShowMore(): void{
  this.Tools = "advanced";
  this.EditMode = true;
}

public CheckMarker(event: MapMarker):void{
  console.log("checking: ", event);
  event.Checked = !event.Checked;
  console.log("checked = ", event.Checked);
}


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
    // this.LegendContentMarginTop = '0px';
  }
  else if(this.Tools === "closed"){
    this.Tools = "basic";
  }
  else if(this.Tools === "advanced"){
    this.Tools = "basic";
    this.EditMode = false;
  }
}

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
      this.Pan.emit({ lat: marker.Latitude, lng: marker.Longitude }); // zoom is checked with == in AGM library so value must be different in order to assure zoom change function is run - hence the random number between 0 and 1
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

    //layers logic

    if(this._currentMapModel){
      this.MapTitle = this._currentMapModel.Title;
    }
    // else if (this._currentlyActiveLayers && this._currentlyActiveLayers.length > 1) {
    //   this.MapTitle = "Layers (" + this._currentlyActiveLayers.length + ")";
    //   // console.log("Layers = ", this._currentlyActiveLayers);
    // }
    // else if (this._currentlyActiveLayers && this._currentlyActiveLayers[0]) {
    //   this.MapTitle = this._currentlyActiveLayers[0];
    // }
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
    this.EditLegendLocations.emit(this.LocationsList);
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

  protected removeHiddenLocations():void{
    let templist = new Array<MapMarker>();
    this._currentlyActiveLocations.forEach( function(marker){
      if(marker.IsHidden === false || !marker.IsHidden){
        templist.push(marker);
      }
    },this)
    this._currentlyActiveLocations = templist;
  }

}
