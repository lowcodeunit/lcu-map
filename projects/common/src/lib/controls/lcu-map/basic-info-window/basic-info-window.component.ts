import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MarkerInfo } from '../../../models/marker-info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapMarker } from '../../../models/map-marker.model';
import { MapConversions } from '../../../utils/conversions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuid from 'uuid';
import { LocationInfoService } from '../../../services/location-info.service';

@Component({
  selector: 'lcu-basic-info-window',
  templateUrl: './basic-info-window.component.html',
  styleUrls: ['./basic-info-window.component.scss']
})
export class BasicInfoWindowComponent implements AfterViewInit, OnInit {

  // FIELDS

  

  // PROPERTIES

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  /**
   * determine what state the modal is in
   * 
   * basic = basic info
   * 
   * addToMap = able to edit the location
   */
  public ModalState = "basic";

  public BasicInfoData: any;

  /**
   * The set of available marker icons and paths to those icons
   */
  public MarkerSet: Array<MarkerInfo>;

  /**
   * Reflects whether the incoming location marker exists or not (if it exists, IsEdit is true)
   */
  public IsEdit: boolean = false;

  /**
   * The form used to get data from user and set the location's data to it
   */
  public NewMarkerForm: FormGroup;

  /**
   * The marker whose data will be set and created
   */
  public NewMarker: MapMarker;

  /**
   * The chosen icon for the current location marker
   */
  public ChosenIcon: MarkerInfo;

  public InstagramUrl: string;

  public LinkedPhoneNumber: string; 

  public Type: string;

  // CONSTRUCTORS

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
    protected dialogRef: MatDialogRef<BasicInfoWindowComponent>,
    protected mapConversions: MapConversions,
    protected breakpointObserver: BreakpointObserver,
    private locationInfoService: LocationInfoService) {
    this.IsEdit = this.passedData.isEdit;
  }

  // LIFE CYCLE

  ngOnInit() {
    this.NewMarkerForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] })
    });
    if (this.IsEdit) {
      this.NewMarker = this.passedData.marker;
    } else {
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
    // TODO: Change so we don't use setTimeout in basic-info-window.components.ts waiting for state setTimeout also in lcu-map.component.ts DisplayInfoMarker()
    setTimeout(() => {
      this.BasicInfoData = this.passedData.marker;
      this.MarkerSet = this.passedData.markerSet;
      this.NewMarkerForm.patchValue({ title: this.BasicInfoData.title })
      this.NewMarker = { ...this.passedData.marker };
      this.setChosenIconIfExists(this.NewMarker.iconName);
      this.InstagramUrl = this.locationInfoService.BuildInstagramUrl(this.NewMarker);
      this.locationInfoService.SetPhoneNumberUrl(this.NewMarker);
      this.LinkedPhoneNumber = this.locationInfoService.GetPhoneNumberUrl();
      this.Type = this.locationInfoService.GetType(this.NewMarker);
    }, 50);
    this.changePositionToCenter(false);
  }

  ngOnDestroy() {
    this.locationInfoService.SetHighlightIcon(false);
  }

  // API METHODS
/**
 * Changes the position of the modal to the right hand side of the screen
 */
  public changePositionToRHS() {
    this.dialogRef.updatePosition({ right: '10px' });
    //console.log("component instance",this.dialogRef.componentInstance);
        this.locationInfoService.SetHighlightIcon(true);
    //console.log(this.ModalState);
}

/**
 * Change position of the dialog box to the center 
 */
public changePositionToCenter(highlight: boolean) {
  this.dialogRef.updatePosition({ top:'100px' });
  this.locationInfoService.SetHighlightIcon(highlight);
  // console.log("move to center",this.ModalState);
}

public changePositionTopOfCenter() {
  this.dialogRef.updatePosition({ top:'25px' });
  this.locationInfoService.SetHighlightIcon(false);
  // console.log("move to center",this.ModalState);
}

  /**
   * Closes the modal
   */
  public Close(): void {
    this.locationInfoService.SetHighlightIcon(false);
    this.dialogRef.close();
  }

  /**
   * Sets the marker data to the user entered data
   */
  public SetMarkerData(): void {
    if (!this.IsEdit) {
      this.NewMarker.id = uuid.v4();
    }
    this.NewMarker.map_id = this.passedData.primary_map_id;
    this.NewMarker.title = this.NewMarkerForm.value.title;
    this.NewMarker.iconName = this.ChosenIcon.iconLookup;
    this.NewMarker.iconImageObject = this.mapConversions.ConvertIconObject(this.ChosenIcon.iconLookup, this.passedData.markerSet);
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


  /**
   * 
   * @param iconName The name of the current icon
   * 
   * Initially sets the current ChosenIcon to the associated marker for recognition of active status
   */
  protected setChosenIconIfExists(iconName: string): void {
    this.MarkerSet.forEach(marker => {
      if (marker.iconLookup === iconName) {
        this.ChosenIcon = marker;
      }
    });
  }

}