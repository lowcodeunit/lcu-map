import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'lcu-basic-info-window',
  templateUrl: './basic-info-window.component.html',
  styleUrls: ['./basic-info-window.component.scss']
})
export class BasicInfoWindowComponent implements OnInit {
  //FIELDS
  //PROPERTIES

  //CONSTRUCTORS
 
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, 
  protected dialogRef: MatDialogRef<BasicInfoWindowComponent>, 
  protected changeDetector: ChangeDetectorRef) { 
    this.forceChangeDetection();
  }
 
  //LIFE CYCLE

  ngOnInit() {
    this.forceChangeDetection();
  }



  //API METHODS

  public Close(): void {
    this.dialogRef.close();
  }



//HELPERS

/**
  * Force change detection, using this to reset items under *ngIf
  */
 protected forceChangeDetection(): void {
  this.changeDetector.detectChanges();
 }
}