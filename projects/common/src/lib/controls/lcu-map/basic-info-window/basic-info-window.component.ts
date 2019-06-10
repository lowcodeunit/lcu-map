import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MarkerInfo } from '../../../models/marker-info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapMarker } from '../../../models/map-marker.model';
import { MapConversions } from '../../../utils/conversions';
import * as uuid from 'uuid';

@Component({
  selector: 'lcu-basic-info-window',
  templateUrl: './basic-info-window.component.html',
  styleUrls: ['./basic-info-window.component.scss']
})
export class BasicInfoWindowComponent implements AfterViewInit, OnInit {

  // FIELDS

  // PROPERTIES

  /**
   * Gives an idea of the state of the expansion panel
   */
  public panelOpenState = "closed";

  public BasicInfoData: any;

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
   * The chosen icon for the current location marker
   */
  public ChosenIcon: MarkerInfo;

  // CONSTRUCTORS

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
    protected dialogRef: MatDialogRef<BasicInfoWindowComponent>,
    protected mapConversions: MapConversions) {
  }

  // LIFE CYCLE

  ngOnInit() {
    this.NewMarkerForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] })
    });
    this.NewMarker = {
      id: '',
      map_id: '0',
      title: '',
      iconName: '',
      lat: 0,
      lng: 0
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
    }, 50);
  }

  ngOnDestroy() {

  }

  // API METHODS

/**
 * Change position of the dialog box to the bottom 
 */
  public changePositionToRHS() {
    this.dialogRef.updatePosition({ right: '0px' });
}

/**
 * Change position of the dialog box to the center 
 */
public changePositionToCenter() {
  this.dialogRef.updatePosition({ top:'100px', bottom:'100px' });
}

/**
 * Change position of the dialog box to the bottom 
 */
public changePositionToFooter() {
  this.dialogRef.updatePosition({ top:'auto' });
  this.dialogRef.updateSize( '100vw' );
}
  /**
   * Closes the modal
   */
  public Close(): void {
    this.dialogRef.close();
  }

  /**
   * Sets the marker data to the user entered data
   */
  public SetMarkerData() {
    this.NewMarker.id = uuid.v4();
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

}