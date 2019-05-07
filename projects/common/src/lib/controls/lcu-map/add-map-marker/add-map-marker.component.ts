import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapMarker } from '../../../models/map-marker.model';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'lcu-add-map-marker',
  templateUrl: './add-map-marker.component.html',
  styleUrls: ['./add-map-marker.component.css']
})
export class AddMapMarkerComponent implements OnInit {
  // FIELDS

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

  // PROPERTIES
  
  // CONSTRUCTORS
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, private mapService: MapService) { }
  
  // LIFE CYCLE
  ngOnInit() {
    this.NewMarkerForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      icon: new FormControl('', { validators: [Validators.required] })
    });

    this.NewMarker = {
      title: '',
      iconName: null,
      iconImageUrl: '',
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
    this.NewMarker.iconImageUrl = this.mapService.ConvertIconUrl(this.NewMarkerForm.value.icon.iconImageUrl.url);

  }
  // HELPERS
}
