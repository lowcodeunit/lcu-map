import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapMarker } from '../../../models/map-marker.model';
import { MapService } from '../../../services/map.service';
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

    this.NewMarker = {
      title: '',
      iconName: null,
      lat: 0,
      lng: 0
    }

    this.IconList = this.passedData.iconList;
  }

  // API METHODS

  /**
   * Converts data from the form to an icon to be placed on the map
   */
  public SetMarkerData(): void {
    this.NewMarker.title = this.NewMarkerForm.value.title;
    this.NewMarker.iconName = this.NewMarkerForm.value.icon.iconName;
    this.NewMarker.lat = this.passedData.lat;
    this.NewMarker.lng = this.passedData.lng;
    this.NewMarker.iconImageObject = this.mapConverions.ConvertIconObject(this.NewMarkerForm.value.icon.iconLookup, this.passedData.iconList);
  }
  
  /**
   * Closes the mat dialog box
   */
  public Close(): void {
    this.dialogRef.close();
  }

  // HELPERS

}
