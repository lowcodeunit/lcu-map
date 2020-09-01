import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { MapMarker } from '../../../models/map-marker.model';
import { MapConversions } from '../../../utils/conversions';
import { MarkerInfo } from '../../../models/marker-info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarkerData } from '../../../models/marker-data.model';
import { LocationInfoService } from '../../../services/location-info.service';
import { IconImageObject } from '../../../models/icon-image-object.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'lcu-location-info-form',
  templateUrl: './location-info-form.component.html',
  styleUrls: ['./location-info-form.component.scss']
})

export class LocationInfoFormComponent implements OnInit, OnChanges, AfterViewInit {
  // FIELDS
  /**
   * Incomming MarkerData to display
   */
  @Input() MarkerData: MarkerData;

  /**
   * Incomming form view
   */
  @Input() FormView: string;

  @Input('default-marker')
  public DefaultMarker: IconImageObject;

  /**
   * Output to info-footer
   */
  @Output('close-footer')
  CloseFooter: EventEmitter<boolean>;

  /**
   * Outgoing MapMarker
   */
  @Output('new-MapMarker')
  NewMapMarker: EventEmitter<MapMarker>;


  // PROPERTIES
  /**
   * The set of available marker icons and paths to those icons
   */
  public MarkerSet: Array<MarkerInfo>;


  /**
   * The form used to get data from user and set the location's data to it
   */
  public NewMarkerForm: FormGroup;

  /**
   * The marker whose data will be set and created
   */
  public NewMarker: MapMarker;

  /**
   * The marker that is displaying the info
   */
  public Marker: MapMarker;


  /**
   * The chosen icon for the current location marker
   */
  public ChosenIcon: MarkerInfo;


  /**
   * Reflects whether the incoming location marker exists or not (if it exists, IsEdit is true)
   */
  public IsEdit: boolean = false;

  /**
   * The url to the locations instagram page
   */
  public InstagramUrl: string;


  /**
   * The url for the phone number
   */
  public LinkedPhoneNumber: string;
  /**
   * The type of location
   */
  public Type: string;

  // public FormView: string;
  // CONSTRUCTORS

  constructor(
    protected mapConversions: MapConversions,
    private locationInfoService: LocationInfoService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.CloseFooter = new EventEmitter<boolean>();
    this.NewMapMarker = new EventEmitter<MapMarker>();
    this.matIconRegistry.addSvgIcon(
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/instagram.svg')
    );
  }


  // LIFE CYCLE

  ngOnInit() {
    this.createFormGroup();
    if (this.IsEdit) {
      this.NewMarker = new MapMarker(this.MarkerData.marker);
      // console.log("real marker ", this.NewMarker);
    } else {
      //  console.log("blank marker");
      this.NewMarker.ID = '';
      // this.NewMarker.LayerID = '0';
      this.NewMarker.Title = '';
      this.NewMarker.Icon = '';
      this.NewMarker.Latitude = 0;
      this.NewMarker.Longitude = 0;
    }
  }

  ngAfterViewInit() {

    // this.Marker = this.MarkerData.marker;
    this.MarkerSet = this.MarkerData.mapMarkerSet;
    this.NewMarkerForm.patchValue({ title: this.Marker.Title });
    this.NewMarker = new MapMarker(this.MarkerData.marker);
    this.setChosenIconIfExists(this.NewMarker.Icon);
    // console.log("form group = ", this.NewMarkerForm);
  }

  ngOnChanges() {
    this.Marker = new MapMarker(this.MarkerData.marker);
    // console.log("location info: ", this.Marker);
    this.locationInfoService.SetPhoneNumberUrl(this.Marker);
    this.LinkedPhoneNumber = this.locationInfoService.GetPhoneNumberUrl();
    this.createFormGroup();
    this.NewMarker = new MapMarker(this.MarkerData.marker);
    this.InstagramUrl = this.locationInfoService.BuildInstagramUrl(this.NewMarker);
    this.Type = this.locationInfoService.GetType(this.NewMarker);
    this.IsEdit = this.MarkerData.isEdit;
    this.NewMarkerForm.patchValue({ title: this.Marker.Title });
  }
  // API METHODS

  /**
   * Change FormView so basic info is diplayed
   */
  public ShowBasicInfo(): void {
    this.FormView = 'basic';
  }

  /**
   * Called when the user swiped down to go back to basic info
   */
  public SwipedDown(): void {
    this.ShowBasicInfo();
  }

  public Close(): void {
    this.CloseFooter.emit(false);
    this.NewMapMarker.emit(this.NewMarker);
  }

  /**
   * Sets the marker data to the user entered data
   */
  public SetMarkerData(): void {
    if (!this.IsEdit) {
      this.NewMarker.ID = '';
    }
    // this.NewMarker.LayerID = this.MarkerData.primaryMapId;
    this.NewMarker.Title = this.NewMarkerForm.value.title;
    if (this.ChosenIcon) {
      this.NewMarker.Icon = this.ChosenIcon.IconLookup;
      this.NewMarker.IconImageObject = this.mapConversions.ConvertIconObject(this.ChosenIcon.IconLookup, this.MarkerData.mapMarkerSet);
    } else {
      this.NewMarker.Icon = this.DefaultMarker.name;
      this.NewMarker.IconImageObject = this.DefaultMarker;
    }
  }

  /**
   *
   * @param icon The icon chosen by the user
   *
   * Sets the current ChosenIcon to the icon the user selected
   */
  public SetIcon(icon): void {
    if (this.ChosenIcon === icon) {
      this.ChosenIcon = null;
    } else {
      this.ChosenIcon = icon;
    }
  }

  // HELPERS

  // public BuildInstagramUrl(marker: MapMarker): void{
  //   if(marker.Instagram){
  //     let tempInsta = marker.Instagram.slice(1);
  //     this.InstagramUrl = "https://www.instagram.com/"+tempInsta+"/";
  //   }
  // }

  /**
   *
   * @param iconName The name of the current icon
   *
   * Initially sets the current ChosenIcon to the associated marker for recognition of active status
   */
  protected setChosenIconIfExists(iconName: string): void {
    this.MarkerSet.forEach(marker => {
      if (marker.IconLookup === iconName) {
        this.ChosenIcon = marker;
      }
    });
  }

  protected createFormGroup(): void {
    this.NewMarkerForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] })
    });
  }
}
