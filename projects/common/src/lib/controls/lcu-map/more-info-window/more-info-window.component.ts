import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MapMarker } from '../../../models/map-marker.model';
import { LocationInfoService } from '../../../services/location-info.service';

@Component({
  selector: 'lcu-more-info-window',
  templateUrl: './more-info-window.component.html',
  styleUrls: ['./more-info-window.component.scss']
})
export class MoreInfoWindowComponent implements OnInit {

  public marker: MapMarker;
  public linkedPhoneNumber: string;
  public rating: string;
  public instagramUrl: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    protected dialogRef: MatDialogRef<MoreInfoWindowComponent>,
    protected locationInfoService: LocationInfoService
  ) { }

  public ngOnInit(): void {
    console.log('ngOnInit', this.passedData);
    this.marker = this.passedData.marker;

    // this.instagramUrl = this.locationInfoService.BuildInstagramUrl(this.NewMarker);
    this.linkedPhoneNumber = this.locationInfoService.GetPhoneNumberUrl();
  }

  public SelectRating(rating: string): void {
    this.rating = (this.rating === rating) ? null : rating;
  }

  /**
   * Closes the modal
   */
  public Close(): void {
    this.locationInfoService.SetHighlightIcon(false);
    this.locationInfoService.SetSelectedLocation(undefined);
    this.dialogRef.close();
  }

}
