import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MapService } from '../../services/map.service';
import { IndividualMap } from '../../models/individual-map.model';
import { MarkerInfo } from '../../models/marker-info.model';
import { MapMarker } from '../../models/map-marker.model';
import { Constants } from '../../utils/constants/constants';



@Component({
  selector: 'lcu-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})

export class LegendComponent implements OnInit {

  //PROPERTIES
  protected _currentlyActiveLocations: Array<MapMarker>;
  protected _currentMapModel: IndividualMap;
  protected _legendLocations: Array<MapMarker>;


  @Input('get-legend-locations')
  public set GetLegendLocations(value: Array<MapMarker>) {
    if (value !== undefined) {
      this._legendLocations = value;
    }
  }
  @Input('current-map-model')
  public set CurrentMapModel(value: IndividualMap) {
    this._currentMapModel = value;
  }

  @Input('currently-active-locations')
  public set CurrentlyActiveLocations(value: Array<MapMarker>) {
    this._currentlyActiveLocations = value;
  }

  @Output('pan')
  Pan: EventEmitter<any>;

  @Output('display-basic-info')
  DisplayBasicInfo: EventEmitter<MapMarker>;

  @Output('save-legend-locations')
  SaveLegendLocations: EventEmitter<Array<MapMarker>>;

  /**
   * The primary map locations
   */
  protected primaryMap: IndividualMap = this._currentMapModel;

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


  //CONSTRUCTOR

  constructor(protected mapService: MapService) {
    this.Pan = new EventEmitter<any>();
    this.DisplayBasicInfo = new EventEmitter<MapMarker>();
    this.SaveLegendLocations = new EventEmitter<Array<MapMarker>>();
    this._currentlyActiveLocations = new Array<MapMarker>();
    this._legendLocations = new Array<MapMarker>();
    this.SetLocationList();
  }

  //LIFE CYCLE

  ngOnInit() {
  }



  /**
   * @param lat The latitude to pan to
   * 
   * @param long The longitude to pan to
   * 
   * Calls function on map service that emits event with the given lat/lng
   */

  //API METHODS

  public PanTo(marker: MapMarker) {
    this.Pan.emit({ lat: marker.lat, lng: marker.lng, zoom: 15 });
    this.DisplayBasicInfo.emit(marker);
    //console.log("Marker in legend = " + marker.title);
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
    this.MapTitle = this.primaryMap !== undefined ? this.primaryMap.title : '';
    let visLoc = new Array<MapMarker>();
    if (this._legendLocations.length >0) {
      visLoc = this._legendLocations;
    }
    else {
      visLoc = this._currentlyActiveLocations;
    }
    console.log("primary map after = ", this.primaryMap);

    //console.log("setting legend to = ", visLoc);
    if (visLoc.length > 0) {
      this.LocationsList = this.assignIconUrl(visLoc);
      this.LocationsList.sort(this.compareObject);
      //console.log("Locations List after sort: ", this.LocationsList);

      this.LocationsList = this.moveUndefinedToBottom(this.LocationsList);
      //console.log("Locations List after move to bottom: ", this.LocationsList);



      //console.log("locList = ", locList);
    }
    //console.log("LocList: ", locList);
    //console.log("visLoc: ", visLoc);
  }


  /**
   * @param event 
   * 
   * This is needed for the drag and drop to reflect the changes
   * 
   * TODO: This does not actually save the new array to memory, so upon refresh
   * 
   * it will go back to the original order.
   * 
   * UpdateVisibleLocations assigns the newly ordered LocationsList to the VisibleLocations in mapService
   */
  drop(event: CdkDragDrop<string[]>) {
    console.log("drop event called");
    moveItemInArray(this.LocationsList, event.previousIndex, event.currentIndex);
    this.giveOrder();
    this.SaveLegendLocations.emit(this.LocationsList);
  }


  //HELPERS
  /**
   * @param locList an array of the mapMarkers
   * 
   * loop i gets the mapMarker
   * 
   * loop j loops through the the icon list to match the iconName to the iconUrl
   */
  protected assignIconUrl(locList: Array<MapMarker>) {
    let temp: Array<MapMarker> = new Array<MapMarker>();
    for (let i = 0; i < locList.length; i++) {
      for (let j = 0; j < this.iconList.length; j++) {
        if (locList[i].iconName.match(this.iconList[j].iconLookup)) {
          locList[i].iconUrl = this.iconList[j].iconUrl;
        }
      }
      temp.push(locList[i]);
    }
    return temp;
  }

  /**
   * Gives order to the MapMarkers based on how the user orders the legend
   */
  protected giveOrder(): void {
    for (let i = 0; i < this.LocationsList.length; i++) {
      this.LocationsList[i].orderIndex = i;
    }
  }

  /**
   * compares and sorts the objects based on orderIndex 
   * 
   * if the indexes are the same then it compares based on title so it is alphabetical 
   */
  protected compareObject(obj1, obj2) {
    if (obj1.orderIndex > obj2.orderIndex)
      return 1;
    if (obj1.orderIndex < obj2.orderIndex)
      return -1;

    // obj1.orderIndex == obj2.orderIndex

    if (obj1.title > obj2.title)
      return 1;
    if (obj1.title < obj2.title)
      return -1;

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
      if (value.orderIndex >= 0) {
        locList.push(value);
        //console.log("pushing ", value, " to ", locList);
      }
      else {
        undefinedList.push(value);
      }
      //console.log("Order = ", value.orderIndex, "Title = ", value.title);
    });
    if (undefinedList) {
      undefinedList.forEach(function (value) {
        locList.push(value);
      })
    }
    return locList;
  }

}
