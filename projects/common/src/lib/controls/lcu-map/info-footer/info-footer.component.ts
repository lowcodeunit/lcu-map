import { Component, OnInit, Input, OnDestroy, OnChanges, DoCheck, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { MapMarker } from '../../../models/map-marker.model';
import { MarkerData } from '../../../models/marker-data.model';
import { LocationInfoService } from '../../../services/location-info.service';

@Component({
  selector: 'lcu-info-footer',
  templateUrl: './info-footer.component.html',
  styleUrls: ['./info-footer.component.scss']
})
export class InfoFooterComponent implements OnInit, OnChanges, OnDestroy {

  //FIELDS
/**
   * Incomming MapMarker with location info
   */
  @Input() MarkerData: MarkerData;
  
/**
 * Outgoing boolean to diplay footer
 */
  @Output('show-footer')
  ShowFooter: EventEmitter<boolean>;

/**
 * Outgoing map marker 
 */
  @Output('new-map-marker')
  NewMapMarker: EventEmitter<MapMarker>;

  //PROPERTIES

  /**
   * The view of the footer either basic or moreInfo
   */
  public FormView: string;

/**
 * MapMarker to use in component
 */
  public Marker: MapMarker;
/**
 * The phone number with link
 */
  public LinkedPhoneNumber: string;
/**
 * The type of the location
 */
  public Type: string;

  //CONSTRUCTORS
  constructor(private locationInfoService: LocationInfoService) {
    this.ShowFooter = new EventEmitter<boolean>();
    this.NewMapMarker = new EventEmitter<MapMarker>();
  }
  


  //LIFE CYCLE

  ngOnInit() {
    this.FormView = "basic";
  }

  ngOnChanges() {
    this.Marker = this.MarkerData.marker;
    console.log("marker = ", this.Marker);
    this.locationInfoService.SetPhoneNumberUrl(this.Marker);
    this.LinkedPhoneNumber = this.locationInfoService.GetPhoneNumberUrl();
    this.Type = this.locationInfoService.GetType(this.Marker);
    //console.log("Type = ", this.Type);
  }
  ngOnDestroy() {
  }
  //API METHODS

  /**
   * change FormView so more info is diplayed
   */
  public ShowMoreInfo():void {
    this.FormView = "moreInfo";
  }
  /**
   * Change FormView so basic info is diplayed
   */
  public ShowBasicInfo():void {
    this.FormView = "basic";
  }
  /**
   * Close the footer
   */
  public Close():void {
    this.ShowFooter.emit(false);
    this.FormView = 'basic';
  }
/**
 * Gets called from the child component
 * @param event 
 */
  public CloseFooter(event: boolean):void{
    if(event === false){
      this.Close();
    }
  }
/**
 * 
 * @param event Saves the new mapMarker by passing it to arent class where it is then passed to save
 */
  public SaveNewMapMarker(event: MapMarker):void{
    this.NewMapMarker.emit(event);
  }
  /**
   * Called when the user swiped down to go back to basic info
   */
  public SwipedDown():void {
    console.log("swipped down footer");    //console.log for confirmation of action
    this.ShowBasicInfo();
  }

  /**
   * Called when user swiped up to display more info
   */
  public SwipedUp():void {
    console.log("swipped up footer");  //console.log for confirmation of action
    this.ShowMoreInfo();
  }
  /**
   * Called when user swiped to the close the footer
   */
  public SwipeToClose():void {
    //console.log for confirmation of action
    console.log("swipped to close footer");
    this.Close();
  }
  //HELPERS
}
