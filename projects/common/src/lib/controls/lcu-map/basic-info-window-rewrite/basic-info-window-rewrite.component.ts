import { Component, OnInit, Input, OnDestroy, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MapMarker } from '../../../models/map-marker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarkerInfo } from '../../../models/marker-info.model';
import { MapService } from '../../../services/map.service';
import { AgmInfoWindow, InfoWindowManager } from '@agm/core';
import { LocationInfoService } from '../../../services/location-info.service';
import { IconImageObject } from '../../../models/icon-image-object.model';
import { MapConversions } from '../../../utils/conversions';
import { Subscription } from 'rxjs';

/**
 * Enum for holding the current state of the 'Basic Info' modal/popover.
 */
export enum ModalStateType {
  BASIC = 'BASIC',
  ADD_TO_MAP = 'ADD_TO_MAP'
}

/**
 * The BasicInfoWindowRewriteComponent
 *
 * A View for displaying the the basic information for a user's custom Map Marker.
 * This is utilized by the AGM Info Window and set into its content.
 */
@Component({
  selector: 'lcu-basic-info-window-rewrite',
  templateUrl: './basic-info-window-rewrite.component.html',
  styleUrls: ['./basic-info-window-rewrite.component.scss']
})
export class BasicInfoWindowRewriteComponent implements OnInit, OnDestroy, AfterViewInit {

  public basicInfoBlocks: string[];
  public chosenIcon: MarkerInfo;
  public currentState: ModalStateType;
  public displayMarkerSet: Array<MarkerInfo>;
  public iconSetExpanded: boolean = false;
  public infoWindow: AgmInfoWindow;
  public mapMarkerClickedSubscription: Subscription;
  public markerSet: Array<MarkerInfo>;
  public modalStateType = ModalStateType;
  public newMarker: MapMarker;
  public newMarkerForm: FormGroup;

  protected pCircumference: number;
  protected progressCircle: any;

  @Input() public isEdit: boolean;
  @Input() public mapMarkerSet: MarkerInfo[];
  @Input() public marker: MapMarker;

  @ViewChild('progressCircle', { static: false }) set content(elRef: ElementRef) {
    this.progressCircle = elRef.nativeElement;
  }

  constructor(
    protected infoWindowManager: InfoWindowManager,
    protected locationInfoService: LocationInfoService,
    protected mapConversions: MapConversions,
    protected mapService: MapService,
    protected renderer: Renderer2
  ) { }

  /**
   * Angular lifecycle hook that gets called on initialization.
   */
  public ngOnInit(): void {
    console.log('BASIC INFO COMPONENT - ngOnInit()');
    this.buildBasicInfoContent(this.marker);
    this.currentState = ModalStateType.BASIC;
    this.marker.Rating = Math.round(Math.random() * 100); // Setting random number until backend is ready
    this.markerSet = this.mapMarkerSet.slice(0, -1);
    this.displayMarkerSet = this.truncateArray(this.markerSet, 7);

    this.newMarkerForm = new FormGroup({
      title: new FormControl(this.marker.Title, { validators: [Validators.required] })
    });

    if (this.isEdit) {
      this.newMarker = this.marker;
    } else {
      this.newMarker = {
        ID: '',
        LayerID: '0',
        Title: '',
        Icon: '',
        Latitude: this.marker.Latitude,
        Longitude: this.marker.Longitude
      };
    }

    this.mapMarkerClickedSubscription = this.mapService.MapMarkerClicked.subscribe(
      (infoWindow: AgmInfoWindow) => {
        this.infoWindow = infoWindow;
      }
    );
  }

  /**
   * Angular lifecycle hook that gets called after the view has finished initializing.
   */
  public ngAfterViewInit(): void {
    console.log('BASIC INFO COMPONENT - ngAfterViewInit()');
    this.initProgressCircle();
  }
/**
 * Angular lifecycle hook that will get called when the marker changes, otherwise data for info blocks
 * will stay the same when user navigates to new location from google search
 */
  public ngOnChanges():void{
    this.buildBasicInfoContent(this.marker);
  }

  /**
   * Angular lifecycle hook that gets called when a view is removed from the DOM.
   */
  public ngOnDestroy(): void {
    this.marker = null;
    this.mapMarkerClickedSubscription.unsubscribe();
  }

  /**
   * Utility to parse the address information of a given MapMarker and only print non-null data.
   * Needed since a lot of the data could be null or undefined.
   *
   * @param marker The MapMarker to get the data from.
   */
  public buildBasicInfoContent(marker: MapMarker): void {
    const blocks: string[] = [];

    /* TEST DATA
    marker.Address = '123 Pearl street';
    marker.Telephone = '+1 800-423-0039';
    marker.Town = 'Boulder';
    marker.State = 'Colorado';
    marker.Country = 'United States of America';
    */

    let addrLine: string = marker.Town ? marker.Town : '';
    addrLine += marker.State ? marker.Town ? ', ' + marker.State : marker.State : '';

    blocks.push(marker.Address);
    blocks.push(addrLine ? addrLine : null);
    blocks.push(marker.Country);
    blocks.push(marker.Telephone);

    this.basicInfoBlocks = blocks.filter(val => val !== undefined && val !== null);
    console.log("basic info block: ", this.basicInfoBlocks);
  }

  /**
   * Initializes the SVG progress circle to get and set the necessary values for displaying a rating.
   */
  public initProgressCircle(): void {
    if (this.progressCircle) {
      const radius = this.progressCircle.r.baseVal.value;
      this.pCircumference = radius * 2 * Math.PI;
      this.progressCircle.style.strokeDasharray = `${this.pCircumference} ${this.pCircumference}`;
      this.progressCircle.style.strokeDashoffset = `${this.pCircumference}`;

      if (this.marker.Rating) {
        this.initRatingInfo(this.marker.Rating);
      }
    }
  }

  /**
   * Triggers an CSS animation to offset the progress circle based on the value given.
   *
   * @param percent The percent of total ratings for a given location.
   */
  public initRatingInfo(percent: number): void {
    console.log('BASIC INFO COMPONENT - initRatingInfo()', percent);
    const offset = this.pCircumference - (percent / 100 * this.pCircumference);

    setTimeout(() => {
      this.renderer.setStyle(this.progressCircle, 'stroke-dashoffset', offset);
    }, 200);
  }

  /**
   * Changes the current inner view of 'Basic Info' window based on a state.
   *
   * @param newState The new ModalStateType to change the view to.
   */
  public changeView(newState: ModalStateType): void {
    this.currentState = newState;
  }

  /**
   * Toggles the visible selectable icon display between 7 and the max number of icons.
   */
  public toggleVisibleIcons(): void {
    if (!this.iconSetExpanded) {
      this.iconSetExpanded = true;
      this.displayMarkerSet = this.truncateArray(this.markerSet);
    } else {
      this.iconSetExpanded = false;
      this.displayMarkerSet = this.truncateArray(this.markerSet, 7);
    }
  }

  /**
   * Returns the passed array after being truncated as indicated by the number passed.
   *
   * @param arr The array to truncate.
   * @param num The index of the last element to show in the returned array.
   */
  protected truncateArray(arr: Array<any>, num?: number) {
    return num ? [...arr.slice(0, num)] : [...arr];
  }

  /**
   * Sets the current ChosenIcon to the icon the user selected.
   *
   * @param icon The icon chosen by the user.
   */
  public setIcon(icon): void {
    if (this.chosenIcon === icon) {
      this.chosenIcon = null;
    } else {
      this.chosenIcon = icon;
    }
  }

  /**
   * Emits an event back to the map to open the 'More Info' dialog.
   */
  public openMoreInfo(): void {
    this.mapService.MoreInfoClickedEvent(this.marker);
    this.infoWindow.close();
  }

  /**
   * Sets the marker data to the user entered data
   */
  public setMarkerData(): void {
    if (!this.isEdit) {
      this.newMarker.ID = '';
    }
    this.newMarker.LayerID = this.marker.LayerID;
    this.newMarker.Title = this.newMarkerForm.value.title;
    if (this.chosenIcon) {
      this.newMarker.Icon = this.chosenIcon.IconLookup;
      this.newMarker.IconImageObject = this.mapConversions.ConvertIconObject(this.chosenIcon.IconLookup, this.markerSet);
    } else {
      this.newMarker.Icon = 'ambl_marker';
      this.newMarker.IconImageObject = new IconImageObject('./assets/ambl_marker.png', { width: 24, height: 40 });
    }
    this.mapService.MapMarkerSavedEvent(this.newMarker);
    this.Close();
  }


  /**
   * Emits an event back to the map to close the info window.
   */
  public Close(): void {
    this.mapService.InfoWindowClosedEvent();
    this.changeView(this.modalStateType.BASIC);
    this.locationInfoService.SetSelectedMarker(undefined);

    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

}
