import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry } from '@angular/material';
import { MapMarker } from '../../../models/map-marker.model';
import { LocationInfoService } from '../../../services/location-info.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationRating } from '../../../models/location-rating-model';

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
  public FormattedAccolades: Array<string>;
  public ColorRed: string;
  public ColorYellow: string;
  public ColorGreen: string;
  public AmblRating: LocationRating;
  public FriendsRating: LocationRating;
  public SimilarRating: LocationRating;
  public Ratings: Array<LocationRating>

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    protected dialogRef: MatDialogRef<MoreInfoWindowComponent>,
    protected locationInfoService: LocationInfoService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {this.matIconRegistry.addSvgIcon(
    "instagram",
    this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/instagram.svg")
  ); 
    this.ColorRed = "#FF0000";
    this.ColorYellow = '#FFFF00';
    this.ColorGreen = '#008000';
    const ratingMin = 1;
    const ratingMax = 100;
    this.AmblRating = new LocationRating('Ambl_on', Math.floor(Math.random() * (ratingMax - ratingMin + 1)) + ratingMin, Math.floor(Math.random() * 1000) + 1 );
    this.FriendsRating = new LocationRating('Friends', Math.floor(Math.random() * (ratingMax - ratingMin + 1)) + ratingMin, Math.floor(Math.random() * 100) + 1 );
    this.SimilarRating = new LocationRating('Similar', Math.floor(Math.random() * (ratingMax - ratingMin + 1)) + ratingMin, Math.floor(Math.random() * 50) + 1 );
    this.Ratings = new Array<LocationRating>();


}

  public ngOnInit(): void {
    console.log('ngOnInit', this.passedData);
    this.marker = this.passedData.marker;
    this.instagramUrl = this.locationInfoService.BuildInstagramUrl(this.marker);
    this.linkedPhoneNumber = this.locationInfoService.GetPhoneNumberUrl();
    this.formatAccolades();
    this.BuildRatings();
  }

  public SelectRating(rating: string): void {
    this.rating = (this.rating === rating) ? null : rating;
  }

  /**
   * Closes the modal
   */
  public Close(): void {
    this.locationInfoService.SetHighlightIcon(false);
    this.locationInfoService.SetSelectedMarker(undefined);
    this.dialogRef.close();
  }

  protected BuildRatings():void{
    if(!this.marker.Rating){
      
      this.Ratings.push(this.AmblRating, this.FriendsRating, this.SimilarRating);
    }
    else{
      this.Ratings = this.marker.Rating;
    }
    this.Ratings.forEach(x =>{
      if(x.rating > 50){
        x.color = this.ColorGreen;
      }
      else if(x.rating<= 50 && x.rating >25){
        x.color = this.ColorYellow
      }
      else{
        x.color = this.ColorRed
      }
    })
  }

  protected formatAccolades(): void{
    this.FormattedAccolades = new Array<string>();
    if(this.marker.Accolades){
    this.marker.Accolades.forEach(acc =>{
      let temp: string;

      if(acc.Title ==="Michelin"){
        temp = acc.Title+': '+acc.Rank+' stars';
        if(acc.Year){
          temp+=' ('+acc.Year+')';
        }
      }
      else{
        temp = acc.Title+': '+acc.Rank;
        if(acc.Year){
          temp+=' ('+acc.Year+')';
        }
      }
      this.FormattedAccolades.push(temp);
    })
  }
  }
}
