import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IndividualMap } from '@lcu-ide/dynamic-map-common/lcu.api';
import { MAT_DIALOG_DATA } from '@angular/material';

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
      locationList: []
    }
  }

  public SetMapData() {
    this.NewMap.title = this.NewMapForm.value.title;
    this.NewMap.zoom = this.passedData.map.zoom;
    this.NewMap.origin = { lat: this.passedData.map.latitude, lng: this.passedData.map.longitude };
    this.NewMap.locationList = this.passedData.locationMarkers;
  }

}
