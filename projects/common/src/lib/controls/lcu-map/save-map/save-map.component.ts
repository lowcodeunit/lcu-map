import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserMap } from '../../../models/user-map.model';

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
  // public NewMap: UserMap;
  public NewMap: UserMap;

  // CONSTRUCTORS

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, private dialogRef: MatDialogRef<SaveMapComponent>) { }

  // LIFE CYCLE

  ngOnInit() {
    this.NewMapForm = new FormGroup({
      Title: new FormControl('', { validators: [Validators.required] })
    });
    this.NewMap = {
      ID: '',
      Title: '',
      Zoom: 0,
      Coordinates: [1,2,3,4],
      Primary: true,
      Shared: true,
      Deletable: true,
      DefaultLayerID: '',
      Latitude: 0,
      Longitude: 0
    };
  }

  // API METHODS

  /**
   * Sets entered map data to this.NewMap, which is then returned upon closing modal with affirmative button
   */
  public SetMapData(): void {
    // this.NewMap.ID = uuid.v4();
    // this.NewMap.Title = this.NewMapForm.value.Title;
    // this.NewMap.zoom = this.passedData.map.zoom;
    // this.NewMap.origin = { lat: this.passedData.map.latitude, lng: this.passedData.map.longitude };
    // this.NewMap.locationList = this.passedData.locationMarkers;
    // this.NewMap.locationList.forEach(loc => {
    //   loc.LayerID = this.NewMap.ID;
    // });
    // New data to send to back end for state API:
    const coords = this.passedData.coordinates;
    this.NewMap.ID = '';
    this.NewMap.Title = this.NewMapForm.value.Title;
    this.NewMap.Zoom = this.passedData.map.zoom;
    this.NewMap.Coordinates = [coords.neLat, coords.neLng, coords.swLat, coords.swLng];
    this.NewMap.Primary = true;
    this.NewMap.Shared = true;
    this.NewMap.Deletable = true;
    this.NewMap.DefaultLayerID = this.passedData.userLayer.ID;
    // the below adds visible secondary location markers as well as primary
    // this.passedData.secondaryMarkers.forEach(loc => {
    //   if (loc.showMarker === true) {
    //     this.NewMap.locationList.push(loc);
    //   }
    // });
  }

  /**
   * Closes the mat dialog box
   */
  public Close(): void {
    this.dialogRef.close();
  }

  // HELPERS

}
