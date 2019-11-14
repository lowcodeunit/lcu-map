import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MapMarker } from '../../models/map-marker.model';
import { MatSidenav, MatDialog } from '@angular/material';
import { UserMap } from '../../models/user-map.model';
import { DeleteLocationsComponent } from './delete-locations/delete-locations.component';
import { MarkerInfo } from '../../models/marker-info.model';



@Component({
  selector: 'lcu-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})

export class LegendComponent implements OnInit, OnChanges {

  //PROPERTIES
  
  /**
  * The maximum amount of time in milliseconds the average person expects between clicks of a double-click
  */
  protected expectedDoubleClickElapsedTime: number = 500;

/**
 * double click to show more info modal
 */
  protected isDoubleClick: boolean;

  /**
   * and array with all teh hiddenLocation ids to check against
   */
  protected hiddenLocationIds: Array<any>;
/**
 * width of the sidenav
 */
  public matContentWidth: string;

  /**
   * height of the sidenav
   */
  public matContentHeight: string;

  /**
   * track tools view 
   */
  public Tools: string;

  /**
   * editMode for checking unchecking  items
   */
  public EditMode: boolean = false;

  /**
   * legend height
   */
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
/**
 * is the legend open
 */
  public LegendOpen: boolean;
  /**
   * List of locations that are hidden
   */
  public HiddenLocations: Array<MapMarker>;
  /**
   * to determine if the hidden list is visible
   */
  public HiddenListVisible: boolean;

  /**
   * tracker so if a location is selected and the user scrolls the list, the scroll function doesnt scroll
   * 
   * away from the location that the user scrolled to
   */
  protected scrolled: boolean;

  /**
   * to determine if the selectedLocation has changed
   */
  protected PreviousSelectedLocation: MapMarker;

  /**
  * The MarkerInfo where the icon url can be refrenced
  */
//  protected iconList: Array<MarkerInfo> = Constants.DEFAULT_MAP_MARKER_SET;
  @Input('icon-list')
  protected iconList: Array<MarkerInfo>;


/**
 * Used for getting the title of the map to display at top
 */
  @Input('current-map-model')
  protected _currentMapModel: UserMap;

/**
 * all locations within view
 */
  @Input('currently-active-locations')
  protected _currentlyActiveLocations: Array<MapMarker>
/**
 * if no map is selected the layer title will display at top
 */
  @Input('currently-active-layers')
  protected _currentlyActiveLayers: Array<string>

/**
 * the location to highlight in the legend
 */
  @Input('selected-location')
  public SelectedLocation: MapMarker;

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

  @Output('update-visible-locations')
  UpdateVisibleLocations: EventEmitter<Array<MapMarker>>;

  @Output('top-list-clicked')
  TopListClicked: EventEmitter<any>;

  @Output('update-hidden-curations')
  UpdateHiddenCurations: EventEmitter<Array<string>>;

  @ViewChild('sidenav', { static: false }) public drawer: MatSidenav;

  //CONSTRUCTOR
  constructor(public Dialog: MatDialog ) {
    this.DisplayBasicInfo = new EventEmitter<MapMarker>();
    this.EditLegendLocations = new EventEmitter<Array<MapMarker>>();
    this.DeleteLegendLocations = new EventEmitter<Array<MapMarker>>();
    this.UpdateVisibleLocations = new EventEmitter<Array<MapMarker>>();
    this.TopListClicked = new EventEmitter<any>();
    this.UpdateHiddenCurations = new EventEmitter<Array<string>>();
    this._currentlyActiveLocations = new Array<MapMarker>();
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
    this.LegendContentHeight = "93%";
    this.hiddenLocationIds = new Array<any>();
    this.PreviousSelectedLocation = { ID: '', LayerID: '', Title: '', Latitude: '', Longitude: '', Icon: '' };

  }

  //LIFE CYCLE

  ngOnInit() {
  }

  ngOnChanges() {

    if (this.LegendOpen && !this.SelectedLocation) {
      this.SetLocationList();
      this.CheckIfHidden();
    }
    if (this.LegendOpen && this.SelectedLocation) {
      if (this.SelectedLocation.ID !== this.PreviousSelectedLocation.ID) {
        this.PreviousSelectedLocation = this.SelectedLocation;
        this.scrolled = false;
        setTimeout(() => {
          //waits for the #Selected element to change to the new element before scrolling process begins
          this.scroll(document.querySelector('#Selected'));
        }, 500)
      }
    }
  }

  //API METHODS

  /**
   * Toggles the HiddenLocation list in the legend
   */
  public ToggleHiddenListVisibility() {
    this.HiddenListVisible = !this.HiddenListVisible;
  }

  /**
   * Checks to see if any locations should be hidden coming from the back-end
   */
  public CheckIfHidden(): void {
    for (let i = 0; i < this._currentlyActiveLocations.length; i++) {
      if (this._currentlyActiveLocations[i].IsHidden) {
        console.log("hiding: ", this._currentlyActiveLocations[i]);
        this.HiddenLocations.push(this._currentlyActiveLocations[i]);
        this.hiddenLocationIds.push(this._currentlyActiveLocations[i].ID);
        this._currentlyActiveLocations.splice(i, 1);
      }
      else if (this.hiddenLocationIds.includes(this._currentlyActiveLocations[i].ID)) {
        console.log("IsHidden is false but ID is in hiddenLocationIds array")
        this._currentlyActiveLocations.splice(i, 1);
      }
    }
    this.UpdateVisibleLocations.emit(this._currentlyActiveLocations);
  }


  /**
   * Marks the MapMarker as being checked
   * 
   * @param event Marker to check
   */
  public CheckMarker(event: MapMarker): void {
    // console.log("checking: ", event);
    event.Checked = !event.Checked;
    // console.log("checked = ", event.Checked);
  }

  /**
   * Hides the checked locations in the _currentlyActiveLocations and pushes them to the HiddenLocation Array
   */
  public HideLocations(): void {
    // console.log("locs", this._currentlyActiveLocations);
    let locationIdsToHide = new Array<string>();
    let justHid = new Array<MapMarker>();
    for (let i = 0; i < this._currentlyActiveLocations.length; i++) {
      if (this._currentlyActiveLocations[i].Checked === true) {
        this._currentlyActiveLocations[i].IsHidden = true;
        this._currentlyActiveLocations[i].Checked = false;
        console.log("hiding: ", this._currentlyActiveLocations[i]);
        this.HiddenLocations.push(this._currentlyActiveLocations[i]);
        this.hiddenLocationIds.push(this._currentlyActiveLocations[i].ID);
        justHid.push(this._currentlyActiveLocations[i]);
        locationIdsToHide.push(this._currentlyActiveLocations[i].ID);
      }
    }
    //to avoid error in back end
    if (justHid.length > 0) {
      this.EditLegendLocations.emit(justHid);
      this.UpdateVisibleLocations.emit(this._currentlyActiveLocations);
      this.UpdateHiddenCurations.emit(locationIdsToHide);
    }
    this.SetLocationList();
  }

  /**
   * Makes the the markers from the HiddenLocations that are checked visible again.
   */
  public MakeVisible(): void {
    let tempHidden = new Array<MapMarker>();
    //list of markers to emit to backend 
    let nowVisible = new Array<MapMarker>();
    this.HiddenLocations.forEach(function (marker) {
      if (marker.Checked === true) {
        marker.Checked = false;
        marker.IsHidden = false;
        this._currentlyActiveLocations.push(marker);
        this.hiddenLocationIds.splice(this.hiddenLocationIds.indexOf(marker.ID), 1);
        nowVisible.push(marker);
      }
      else {
        tempHidden.push(marker);
      }
    }, this)
    this.HiddenLocations = tempHidden;
    this.EditLegendLocations.emit(nowVisible);
    this.UpdateVisibleLocations.emit(this._currentlyActiveLocations);
    this.SetLocationList();
  }

  /**
   * Pulls up the Delete-location modal for users to confirm deletion
   * 
   * delets both hidden and visible locations
   */
  public DeleteLocationConfirmation(): void {
    let markersToDelete = new Array<MapMarker>();
    this._currentlyActiveLocations.forEach(function (marker) {
      if (marker.Checked === true) {
        markersToDelete.push(marker);
        console.log("pushing marker: ", marker);
      }
    })
    this.HiddenLocations.forEach(function (marker) {
      if (marker.Checked === true) {
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
   * 
   * TODO change if making lcu
   */
  public TopListsClicked() {
    this.TopListClicked.emit('TopLists Clicked');
  }

  /**
   * toggles tools view based on current view
   */
  public ToggleTools(): void {
    if (this.Tools === "basic") {
      this.Tools = "closed";
      this.LegendContentHeight = '93%';
    }
    else if (this.Tools === "closed") {
      this.Tools = "basic";
      this.LegendContentHeight = '81%';

    }
    else if (this.Tools === "advanced") {
      this.Tools = "basic";
      this.EditMode = false;
    }
  }

  /**
   * Toggles Tools view to advanced
   */
  public ShowMoreTools(): void {
    this.Tools = "advanced";
    this.EditMode = true;
  }

  /**
   * When an item from the legend is double-clicked it will display the mor info-window
   * @param item marker to display
   */
  public ShowMoreInfo(item: MapMarker): void {
    this.isDoubleClick = true;
    this.DisplayMoreInfo.emit(item);
    setTimeout(x => {
      this.isDoubleClick = false;
    }, 500);

  }

  /**
   * normalizes lat and long and emits marker to map for it to display
   */
  public MarkerClicked(marker: MapMarker) {
    setTimeout(x => {
      if (!this.isDoubleClick) {
        if (!this.EditMode) {
          if (typeof (marker.Longitude) === 'string') {
            marker.Longitude = parseFloat(marker.Longitude);
          }
          if (typeof (marker.Latitude) === 'string') {
            marker.Latitude = parseFloat(marker.Latitude);
          }
          this.DisplayBasicInfo.emit(marker);
          this.SelectedLocation = marker;
          if (this.LegendOpen && this.SelectedLocation) {
            this.scroll(document.querySelector('#Selected'));
          }
        }
        else {
          this.SelectedLocation = marker;
          this.CheckMarker(marker);
        }
      }
    }, this.expectedDoubleClickElapsedTime);
  }

  /**
   * @param event
   *
   * This is needed for the drag and drop to reflect the changes
   *
   * UpdateVisibleLocations assigns the newly ordered LocationsList to the VisibleLocations in mapService
   */
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.LocationsList, event.previousIndex, event.currentIndex);
    this.giveOrder();
    this.EditLegendLocations.emit(this.LocationsList);
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
    this.removeHiddenLocations();

    let visLoc = new Array<MapMarker>();
    visLoc = this._currentlyActiveLocations;

    //Map Title Logic

    if (this._currentMapModel) {
      this.MapTitle = this._currentMapModel.Title;
    }
    else if (this._currentlyActiveLayers && this._currentlyActiveLayers[0]) {
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
    else {
      this.LocationsList = new Array<MapMarker>();
    }
  }

  /**
   * To track whether or not the legend is closed
   */
  public CloseLegend(): void {
    this.LegendOpen = false;
  }
  /**
   * To track whether or not the legend is open
   */
  public OpenLegend(): void {
    this.LegendOpen = true;
  }
  /**
   * Toggles the side nav where the legend lives
   */
  public toggleDrawer() {
    if (this.drawer.opened) {
      this.drawer.close();
      this.IsLegendOpen.emit(false);
      if (this.Tools !== "closed") {
        this.Tools = "closed";
        this.LegendContentHeight = '93%';
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
    for (let i = 0; i < locList.length; i++) {
      if (!locList[i].IconImageObject.url || locList[i].IconImageObject.url === null || locList[i].IconImageObject.url === "") {
        let iconTemp = this.iconList.filter(loc => {
          return loc.IconLookup.toLocaleLowerCase() === locList[i].Icon.toLocaleLowerCase();
        });
        if (iconTemp && iconTemp.length > 0) {
          locList[i].IconImageObject.url = iconTemp[0].IconUrl;
        }
        else {
          // console.log("Icon url doesn't exist for ", locList[i].Icon)
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
      }
      else {
        undefinedList.push(value);
      }
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
  protected removeHiddenLocations(): void {
    let templist = new Array<MapMarker>();
    this._currentlyActiveLocations.forEach(function (marker) {
      if (marker.IsHidden === false || !marker.IsHidden) {
        templist.push(marker);
      }
    }, this)
    this._currentlyActiveLocations = templist;
  }
  /**
   * Called when a user selects a location from the map while the legend is open
   * 
   * @param element #Selected
   */
  protected scroll(element: any): void {
    if (element) {
      let parent = document.getElementById("legend-content")

      let isOut = this.isOutOfParentElement(element, parent);
      if (isOut === false) {//if its inview but user scrolls this prevents it from scrolling back up
        this.scrolled = true;
      }
      if (isOut === true && this.scrolled === false) {
        console.log("Its out were scrolling")
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          //waits for scrolling to finish otherwise it wouldn't scroll
          this.scrolled = true;
        }, 500);
      }
    }
  }

  /**
   * Checks to see if the @child element is outside the @parent element
   */
  protected isOutOfParentElement(child: HTMLElement, parent: HTMLElement): boolean {
    // Get element's bounding
    let childBound = child.getBoundingClientRect();
    let parentBound = parent.getBoundingClientRect();
    // console.log("location = ", this.SelectedLocation);
    // console.log("ChildBounds = ", childBound)
    // console.log("ParentBounds = ", parentBound)

    // Check if it's out of the viewport on each side

    if (childBound.top < parentBound.top) {
      return true;
    }

    if (childBound.bottom > parentBound.height) {
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


    else {
      return false;
    }

  }

}
