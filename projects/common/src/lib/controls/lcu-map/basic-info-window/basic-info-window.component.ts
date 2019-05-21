import { Component, OnInit, Inject } from '@angular/core';
import { MapMarker } from '../../../models/map-marker.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'lcu-basic-info-window',
  templateUrl: './basic-info-window.component.html',
  styleUrls: ['./basic-info-window.component.scss']
})
export class BasicInfoWindowComponent implements OnInit {
  //FIELDS
  //PROPERTIES

  //@Input('marker') markerInfo: MapMarker;

  //CONSTRUCTORS
 
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, private dialogRef: MatDialogRef<BasicInfoWindowComponent>) { }
 
  //LIFE CYCLE

  ngOnInit() {
    console.log("Hello " + this.passedData.marker.title);
  }

  public Close(): void {
    this.dialogRef.close();
  }
}
//API METHODS
  //HELPERS