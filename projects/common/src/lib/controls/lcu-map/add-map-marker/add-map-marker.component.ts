import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapMarker } from '../../../models/map-marker.model';
import { MapConversions } from '../../../utils/conversions';

@Component({
  selector: 'lcu-add-map-marker',
  templateUrl: './add-map-marker.component.html',
  styleUrls: ['./add-map-marker.component.css']
})
export class AddMapMarkerComponent implements OnInit {

  // FIELDS

  // PROPERTIES

  /**
   * The form used to input data about map marker
   */
  public NewMarkerForm: FormGroup;

  /**
   * The object containing all data about the map marker
   */
  public NewMarker: MapMarker;

  /**
   * The list of available icons to display as map marker
   */
  public IconList: string[];

  // CONSTRUCTORS

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, private mapConverions: MapConversions, private dialogRef: MatDialogRef<AddMapMarkerComponent>) { }

  // LIFE CYCLE

  ngOnInit() {
    this.NewMarkerForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      icon: new FormControl('', { validators: [Validators.required] })
    });

    this.NewMarker.ID = '';
    this.NewMarker.LayerID = '0';
    this.NewMarker.Title = '';
    this.NewMarker.Icon = '';
    this.NewMarker.Latitude = 0;
    this.NewMarker.Longitude = 0;

    this.IconList = this.passedData.iconList;
  }

  // API METHODS

  /**
   * Converts data from the form to an icon to be placed on the map
   */
  public SetMarkerData(): void {
    this.NewMarker.ID = '';
    this.NewMarker.Title = this.NewMarkerForm.value.Title;
    this.NewMarker.Icon = this.NewMarkerForm.value.icon.Icon;
    this.NewMarker.Latitude = this.passedData.Latitude;
    this.NewMarker.Longitude = this.passedData.Longitude;
    this.NewMarker.LayerID = this.passedData.primary_map_id,
    this.NewMarker.IconImageObject = this.mapConverions.ConvertIconObject(this.NewMarkerForm.value.icon.IconLookup, this.passedData.iconList);
  }
  
  /**
   * Closes the mat dialog box
   */
  public Close(): void {
    this.dialogRef.close();
  }

  // HELPERS

}
