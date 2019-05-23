import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'lcu-basic-info-window',
  templateUrl: './basic-info-window.component.html',
  styleUrls: ['./basic-info-window.component.scss']
})
export class BasicInfoWindowComponent implements AfterViewInit {
  //FIELDS
  //PROPERTIES
  public BasicInfoData: any;
  //CONSTRUCTORS

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
    protected dialogRef: MatDialogRef<BasicInfoWindowComponent>) {
  }

  //LIFE CYCLE

  ngAfterViewInit() {
    //TODO: Change so we don't use set timeout.
    setTimeout(() => {
      this.BasicInfoData = this.passedData.marker;
    }, 50);
  }

  ngOnDestroy() {

  }

  //API METHODS

  public Close(): void {
    this.dialogRef.close();
  }



  //HELPERS


}