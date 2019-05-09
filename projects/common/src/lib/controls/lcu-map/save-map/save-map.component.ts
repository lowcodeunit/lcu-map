import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IndividualMap } from '../../../models/individual-map.model';
import { MarkerInfo } from '@lcu-ide/dynamic-map-common/lib/models/marker-info.model';

@Component({
  selector: 'lcu-save-map',
  templateUrl: './save-map.component.html',
  styleUrls: ['./save-map.component.scss']
})
export class SaveMapComponent implements OnInit {

  public NewMapForm: FormGroup;

  public NewMap: IndividualMap;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    this.NewMapForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] })
    });
    this.NewMap = {
      title: '',
      origin: { lat: 0, lng: 0 },
      zoom: 0,
      locationList: [],
      mapMarkerSet: new Array<MarkerInfo>()
    }
  }

  public SetMapData() {
    this.NewMap.title = this.NewMapForm.value.title;
    this.NewMap.zoom = this.passedData.map.zoom;
    this.NewMap.origin = { lat: this.passedData.map.latitude, lng: this.passedData.map.longitude };
    this.NewMap.locationList = this.passedData.locationMarkers;
    this.NewMap.mapMarkerSet = this.passedData.mapMarkerSet;
  }

}
