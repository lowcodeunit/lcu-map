import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MarkerInfo } from '../../../models/marker-info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapMarker } from '../../../models/map-marker.model';
import { MapConversions } from '../../../utils/conversions';

@Component({
  selector: 'lcu-basic-info-window',
  templateUrl: './basic-info-window.component.html',
  styleUrls: ['./basic-info-window.component.scss']
})
export class BasicInfoWindowComponent implements AfterViewInit, OnInit {

  // FIELDS

  // PROPERTIES

  public BasicInfoData: any;

  public MarkerSet: Array<MarkerInfo>;

  public NewMarkerForm: FormGroup;

  public NewMarker: MapMarker;

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
      // icon: new FormControl('', { validators: [Validators.required] })
    });
    this.NewMarker = {
      title: '',
      iconName: '',
      lat: 0,
      lng: 0
    }
  }

  ngAfterViewInit() {
    // TODO: Change so we don't use setTimeout in basic-info-window.components.ts waiting for state setTimeout also in lcu-map.component.ts DisplayInfoMarker()
    setTimeout(() => {
      console.log(this.passedData.marker)
      this.BasicInfoData = this.passedData.marker;
      this.MarkerSet = this.passedData.markerSet;
      this.NewMarkerForm.patchValue({ title: this.BasicInfoData.title })
      this.NewMarker = this.passedData.marker;
      this.setChosenIconIfExists(this.NewMarker.iconName);
    }, 50);
  }

  ngOnDestroy() {

  }

  // API METHODS

  public Close(): void {
    this.dialogRef.close();
  }

  public SetMarkerData() {
    this.NewMarker = this.passedData.marker;
    this.NewMarker.title = this.NewMarkerForm.value.title;
    this.NewMarker.iconName = this.ChosenIcon.iconLookup;
    this.NewMarker.iconImageObject = this.mapConversions.ConvertIconObject(this.ChosenIcon.iconLookup, this.passedData.markerSet);
  }

  public SetIcon(icon) {
    if (this.ChosenIcon === icon) {
      this.ChosenIcon = null;
    } else {
      this.ChosenIcon = icon;
    }
  }

  // HELPERS

  protected setChosenIconIfExists(iconName: string) {
    this.MarkerSet.forEach(marker => {
      if (marker.iconLookup === iconName) {
        this.ChosenIcon = marker;
      }
    });
  }

}