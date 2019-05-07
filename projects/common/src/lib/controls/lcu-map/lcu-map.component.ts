import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IndividualMap } from '../../models/individual-map.model';
import { AddMapMarkerComponent } from './add-map-marker/add-map-marker.component';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'lcu-map',
  templateUrl: './lcu-map.component.html',
  styleUrls: ['./lcu-map.component.scss']
})
export class LcuMapComponent implements OnInit {

  // FIELDS

  /**
   * The public map model converted from the passed IndividualMap input
   */
  public CurrentMapModel: IndividualMap;

  // PROPERTIES
  
  /**
   * Boolean that determines whether or not the user is in the middle of a double-click
   */
  private isDoubleClick: boolean = false;

  /**
   * The maximum amount of time in milliseconds the average person expects between clicks of a double-click
   */
  private expectedDoubleClickElapsedTime: number = 500;

  /**
   * The map model object (IndividualMap model) containing all the settings for the map to be displayed
   */
  @Input() mapModel?: IndividualMap = {
    title: 'Default Map',
    origin: { lat: 40.037757, lng: -105.278324 },
    zoom: 13,
    locationList: [
      // these image urls will not work as a default for projects that bring this in and don't have these exact names / icons
      { title: 'Favorite steak house', lat: 40.017557, lng: -105.278199, iconName: 'restaurant', iconImageUrl: './assets/restaurant.png' },
      { title: 'Favorite UNESCO', lat: 40.027657, lng: -105.288199, iconName: 'UNESCO', iconImageUrl: './assets/UNESCO.png' },
      { title: 'Nice museum', lat: 40.037757, lng: -105.298199, iconName: 'museum', iconImageUrl: './assets/museum.png' },
      { title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery', iconImageUrl: './assets/brewery.png' },
      { title: 'Favorite ski area', lat: 40.057557, lng: -105.288199, iconName: 'ski area', iconImageUrl: './assets/ski area.png' },
      { title: 'Favorite vineyard', lat: 40.060657, lng: -105.298199, iconName: 'vineyard', iconImageUrl: './assets/vineyard.png' },
      { title: 'Nice golf course', lat: 40.037757, lng: -105.258199, iconName: 'golf course', iconImageUrl: './assets/golf course.png' },
      { title: 'Good lodging', lat: 40.037757, lng: -105.278199, iconName: 'lodging', iconImageUrl: './assets/lodging.png' },
      { title: 'Nice national park', lat: 40.060657, lng: -105.278199, iconName: 'national park', iconImageUrl: './assets/national park.png' },
      { title: 'Good bar', lat: 40.017557, lng: -105.288199, iconName: 'bar', iconImageUrl: './assets/bar.png' }
    ]
  };

  // CONSTRUCTORS
  constructor(private dialog: MatDialog, private mapService: MapService) { }

  // LIFE CYCLE
  ngOnInit() {
    this.CurrentMapModel = this.mapModel;
    this.CurrentMapModel.locationList.forEach(loc => {
      loc.iconImageUrl = this.mapService.ConvertIconUrl(loc.iconImageUrl);
    });
  }

  // API METHODS

  /**
   * 
   * @param event The event passed in upon user clicking the map
   * 
   * Runs when user single-clicks location on map. Modal displays prompting user to enter info about custom location marker
   */
  public OnChoseLocation(event): void {
    setTimeout(x => { // set timeout to half a second to wait for possibility of double click (mimic Google Maps)
      if (!this.isDoubleClick) {
        const dialogRef = this.dialog.open(AddMapMarkerComponent, {
          data: {
            lat: event.coords.lat,
            lng: event.coords.lng,
            iconList: this.mapModel.locationList
          }
        });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.CurrentMapModel.locationList.push(res);
          }
        });
      }
    }, this.expectedDoubleClickElapsedTime);
  }

  /**
   * 
   * @param event The event passed in upon user double-clicking the map
   * 
   * Function that sets property 'isDoubleClicked' to true for a moment.
   * 
   * This is necessary because when the events 'mapClick' and 'mapDblClick' appear on the same component, both will be fired
   */
  public OnMapDoubleClicked(event) {
    this.isDoubleClick = true;
    console.log('double clicked');
    setTimeout(x => {
      this.isDoubleClick = false;
    },500); // about after enough time it takes to zoom, turn off the "double-clicked" flag
  }
  // HELPERS

}
