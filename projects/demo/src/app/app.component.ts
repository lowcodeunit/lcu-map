import { Component, OnInit } from '@angular/core';
import { IndividualMap } from '@lcu-ide/dynamic-map-common/lcu.api';
import { MarkerInfo } from '@lcu-ide/dynamic-map-common/lib/models/marker-info.model';
import { OutsideMapService } from './outside-map.service';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public OutsideMapService: OutsideMapService) {}
  
  public MapConfig: IndividualMap;

  public IconSet: MarkerInfo[];

  ngOnInit() {
    this.MapConfig = {
      title: 'Default Map',
      origin: { lat: 40.037757, lng: -105.278324 },
      zoom: 13,
      locationList: [
        { title: 'Favorite UNESCO', lat: 40.027657, lng: -105.288199, iconName: 'UNESCO' },
        { title: 'Nice museum', lat: 40.037757, lng: -105.298199, iconName: 'museum' },
        { title: 'Good lodging', lat: 40.037757, lng: -105.278199, iconName: 'lodging' },
        { title: 'Nice national park', lat: 40.060657, lng: -105.278199, iconName: 'national park' }
      ]
    };

    this.IconSet = [ // this should be calling a service here
      { iconLookup: 'restaurant', iconName: 'Restaurant', iconUrl: './assets/restaurant.png'},
      { iconLookup: 'UNESCO', iconName: 'UNESCO', iconUrl: './assets/UNESCO.png'},
      { iconLookup: 'museum', iconName: 'Museum', iconUrl: './assets/museum.png'},
      { iconLookup: 'brewery', iconName: 'Brewery', iconUrl: './assets/brewery.png'},
      { iconLookup: 'ski area', iconName: 'Ski Area', iconUrl: './assets/ski area.png'},
      { iconLookup: 'vineyard', iconName: 'Vineyard', iconUrl: './assets/vineyard.png'},
      { iconLookup: 'golf course', iconName: 'Golf Course', iconUrl: './assets/golf course.png'},
      { iconLookup: 'lodging', iconName: 'Lodging', iconUrl: './assets/lodging.png'},
      { iconLookup: 'national park', iconName: 'National Park', iconUrl: './assets/national park.png'},
      { iconLookup: 'bar', iconName: 'Bar', iconUrl: './assets/bar.png'}
    ]
  }

  public MapSaved(map) {
    console.log(map);
  }
}
