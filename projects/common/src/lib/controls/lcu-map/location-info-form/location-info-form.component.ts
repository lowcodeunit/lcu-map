import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapMarker } from '../../../models/map-marker.model';
import { MapConversions } from '../../../utils/conversions';
import { MarkerInfo } from '../../../models/marker-info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarkerData } from '../../../models/marker-data.model';
import * as uuid from 'uuid';


@Component({
  selector: 'lcu-location-info-form',
  templateUrl: './location-info-form.component.html',
  styleUrls: ['./location-info-form.component.scss']
})
export class LocationInfoFormComponent implements OnInit {
  //FIELDS
  @Input() MarkerData: MarkerData;
  @Input() FormView: string;
  /**
   * Output to info-footer
   */
  @Output('close-footer') 
  CloseFooter: EventEmitter<boolean>;

  @Output('new-MapMarker') 
  NewMapMarker: EventEmitter<MapMarker>;

  
  //PROPERTIES
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

  //public FormView: string;
  //CONSTRUCTORS

  constructor(protected mapConversions: MapConversions) {
    this.CloseFooter = new EventEmitter<boolean>();
    this.NewMapMarker = new EventEmitter<MapMarker>();

  }
  

  //LIFE CYCLE

  ngOnInit() {
    this.createFormGroup();
    if (this.IsEdit) {
      this.NewMarker = this.MarkerData.marker;
      //console.log("real marker ", this.NewMarker);
    } else {
      //console.log("blank marker");
      this.NewMarker = {
        id: '',
        map_id: '0',
        title: '',
        iconName: '',
        lat: 0,
        lng: 0
      }
    }
  }

  ngAfterViewInit() {
    
      this.Marker = this.MarkerData.marker;
      this.MarkerSet = this.MarkerData.mapMarkerSet;
      this.NewMarkerForm.patchValue({ title: this.Marker.title })
      this.NewMarker = this.MarkerData.marker;
      this.setChosenIconIfExists(this.NewMarker.iconName);
      //console.log("form group = ", this.NewMarkerForm);
  }

  ngOnChanges() {
    this.Marker = this.MarkerData.marker;
    this.createFormGroup();
    this.NewMarker = this.MarkerData.marker;
    this.IsEdit = this.MarkerData.isEdit;    
    this.NewMarkerForm.patchValue({ title: this.Marker.title })
  }
  //API METHODS

  /**
   * Change FormView so basic info is diplayed
   */
  public ShowBasicInfo() {
    this.FormView = "basic";
    //console.log("FormView =", this.FormView);
  }

  /**
   * Called when the user swiped down to go back to basic info
   */
  public SwipedDown() {
    //console.log("swipped down in form");
    this.ShowBasicInfo();
  }

  public Close(){
    //console.log("New Map Marker: ", this.NewMarker)
    this.CloseFooter.emit(false);
    this.NewMapMarker.emit(this.NewMarker);
  }

  /**
   * Sets the marker data to the user entered data
   */
  

  public SetMarkerData(): void {
    if (!this.IsEdit) {
      this.NewMarker.id = uuid.v4();
    }
    this.NewMarker.map_id = this.MarkerData.primaryMapId;
    this.NewMarker.title = this.NewMarkerForm.value.title;
    this.NewMarker.iconName = this.ChosenIcon.iconLookup;
    this.NewMarker.iconImageObject = this.mapConversions.ConvertIconObject(this.ChosenIcon.iconLookup, this.MarkerData.mapMarkerSet);
  }

  /**
   * 
   * @param icon The icon chosen by the user
   * 
   * Sets the current ChosenIcon to the icon the user selected
   */
  public SetIcon(icon) {
    if (this.ChosenIcon === icon) {
      this.ChosenIcon = null;
    } else {
      this.ChosenIcon = icon;
    }
  }

  // HELPERS

  /**
   * 
   * @param iconName The name of the current icon
   * 
   * Initially sets the current ChosenIcon to the associated marker for recognition of active status
   */
  protected setChosenIconIfExists(iconName: string) {
    this.MarkerSet.forEach(marker => {
      if (marker.iconLookup === iconName) {
        this.ChosenIcon = marker;
      }
    });
  }

  protected createFormGroup():void{
    this.NewMarkerForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] })
    });
  }
}
