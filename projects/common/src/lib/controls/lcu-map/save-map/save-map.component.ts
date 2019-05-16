import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IndividualMap } from '../../../models/individual-map.model';

@Component({
  selector: 'lcu-save-map',
  templateUrl: './save-map.component.html',
  styleUrls: ['./save-map.component.scss']
})
export class SaveMapComponent implements OnInit {

  // FIELDS

  // PROPERTIES

  /**
   * Reactive form to accept data from user about map to be saved
   */
  public NewMapForm: FormGroup;

  /**
   * The new map that will be constructed and passed back to be saved
   */
  public NewMap: IndividualMap;

  // CONSTRUCTORS

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, private dialogRef: MatDialogRef<SaveMapComponent>) { }

  // LIFE CYCLE

  ngOnInit() {
    this.NewMapForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] })
    });
    this.NewMap = {
      title: '',
      origin: { lat: 0, lng: 0 },
      zoom: 0,
      locationList: []
    }
  }

  // API METHODS

  /**
   * Sets entered map data to this.NewMap, which is then returned upon closing modal with affirmative button
   */
  public SetMapData(): void {
    this.NewMap.title = this.NewMapForm.value.title;
    this.NewMap.zoom = this.passedData.map.zoom;
    this.NewMap.origin = { lat: this.passedData.map.latitude, lng: this.passedData.map.longitude };
    this.NewMap.locationList = this.passedData.locationMarkers;
    // the below adds visible secondary location markers as well as primary
    this.passedData.secondaryMarkers.forEach(loc => {
      if (loc.showMarker === true) {
        this.NewMap.locationList.push(loc);
      }
    });
  }

  /**
   * Closes the mat dialog box
   */
  public Close(): void {
    this.dialogRef.close();
  }

  // HELPERS

}
