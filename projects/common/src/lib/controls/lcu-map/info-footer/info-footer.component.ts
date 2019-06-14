import { Component, OnInit, Input, OnDestroy, OnChanges, DoCheck, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { MapMarker } from '../../../models/map-marker.model';
import { InfoDisplayService } from '../../../services/info-display.service';
import { MarkerData } from '../../../models/marker-data.model';

@Component({
  selector: 'lcu-info-footer',
  templateUrl: './info-footer.component.html',
  styleUrls: ['./info-footer.component.scss']
})
export class InfoFooterComponent implements OnInit, OnChanges, OnDestroy {

  //FIELDS


  //PROPERTIES


  /**
   * The view of the footer either basic or moreInfo
   */
  public FormView: string;


  public Marker: MapMarker;
  /**
   * boolean whether or not to display the footer
   */
  //public DisplayFooter: boolean;

  //CONSTRUCTORS
  constructor() {
    this.ShowFooter = new EventEmitter<boolean>();
    //this.Marker = this.MarkerData.marker;

  }
  /**
   * Incomming MapMarker with location info
   */
  @Input() MarkerData: MarkerData;
/**
 * Outgoing boolean to diplay footer
 */
  @Output('show-footer')
  ShowFooter: EventEmitter<boolean>;


  //LIFE CYCLE

  ngOnInit() {
    console.log("footer oninit = ", this.MarkerData.marker);
    this.Marker = this.MarkerData.marker;
    this.FormView = "basic";
    //this.DisplayFooter = this.infoDisplayService.ShowFooter;
    //console.log("Display footer oninit = ", this.DisplayFooter);
  }

  ngOnChanges() {
    //this.DisplayFooter = this.infoDisplayService.ShowFooter;
    console.log("The footer changed");
  }
  ngOnDestroy() {
    console.log("destroyed");
  }
  //API METHODS

  /**
   * change FormView so more info is diplayed
   */
  public ShowMoreInfo() {
    this.FormView = "moreInfo";
    //console.log("FormView =", this.FormView); 
  }
  /**
   * Change FormView so basic info is diplayed
   */
  public ShowBasicInfo() {
    this.FormView = "basic";
    //console.log("FormView =", this.FormView); 
  }
  /**
   * Close the footer
   */
  public Close() {
    //this.infoDisplayService.ShowFooter = false;
    this.ShowFooter.emit(false);
    this.FormView = 'basic';
    //this.ngOnDestroy();
  }
  /**
   * Called when the user swiped down to go back to basic info
   */
  public SwipedDown() {
    console.log("swipped down footer");
    this.ShowBasicInfo();
  }

  /**
   * Called when user swiped up to display more info
   */
  public SwipedUp() {
    console.log("swipped up footer");
    this.ShowMoreInfo();
  }
  /**
   * Called when user swiped to the close the footer
   */
  public SwipeToClose() {
    console.log("swiped to close footer");
    this.Close();
  }
  //HELPERS

}
