import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MapMarker } from '../../../models/map-marker.model';

@Component({
  selector: 'lcu-basic-info-window',
  templateUrl: './basic-info-window.component.html',
  styleUrls: ['./basic-info-window.component.scss']
})
export class BasicInfoWindowComponent implements AfterViewInit {
  //FIELDS
  //PROPERTIES
  public BasicInfoData: MapMarker;
  //CONSTRUCTORS
 
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, 
  protected dialogRef: MatDialogRef<BasicInfoWindowComponent>) { 
    console.log("Constructor " , passedData);
  }
 
  //LIFE CYCLE

  ngAfterViewInit() {
    this.BasicInfoData = this.passedData;
    console.log("NgViewInit " , this.BasicInfoData);
  }



  //API METHODS

  public Close(): void {
    this.dialogRef.close();
  }



//HELPERS

 
}