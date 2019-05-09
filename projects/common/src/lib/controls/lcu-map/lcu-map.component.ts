import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IndividualMap } from '../../models/individual-map.model';
import { AddMapMarkerComponent } from './add-map-marker/add-map-marker.component';
import { MapService } from '../../services/map.service';
import { SaveMapComponent } from './save-map/save-map.component';

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
      { title: 'Favorite steak house', lat: 40.017557, lng: -105.278199, iconName: 'restaurant' },
      { title: 'Favorite UNESCO', lat: 40.027657, lng: -105.288199, iconName: 'UNESCO' },
      { title: 'Nice museum', lat: 40.037757, lng: -105.298199, iconName: 'museum' },
      { title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery' },
      { title: 'Favorite ski area', lat: 40.057557, lng: -105.288199, iconName: 'ski area' },
      { title: 'Favorite vineyard', lat: 40.060657, lng: -105.298199, iconName: 'vineyard' },
      { title: 'Nice golf course', lat: 40.037757, lng: -105.258199, iconName: 'golf course' },
      { title: 'Good lodging', lat: 40.037757, lng: -105.278199, iconName: 'lodging' },
      { title: 'Nice national park', lat: 40.060657, lng: -105.278199, iconName: 'national park' },
      { title: 'Good bar', lat: 40.017557, lng: -105.288199, iconName: 'bar' }
    ],
    mapMarkerSet: [ // right now, this is part of a map - later break it out into its own piece in ambl_on app
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
  };

  @Output('MapSaved')
  public MapSaved: EventEmitter<IndividualMap>;

  // CONSTRUCTORS
  constructor(private dialog: MatDialog, private mapService: MapService) {
    this.MapSaved = new EventEmitter;
  }

  // LIFE CYCLE
  ngOnInit() {
    this.CurrentMapModel = this.mapModel;
    this.CurrentMapModel.locationList.forEach(loc => {
      loc.iconImageObject = this.mapService.ConvertIconObject(loc.iconName, this.CurrentMapModel.mapMarkerSet);
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
            iconList: this.CurrentMapModel.mapMarkerSet
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
    setTimeout(x => {
      this.isDoubleClick = false;
    },500); // about after enough time it takes to zoom, turn off the "double-clicked" flag
  }

  public ActivateSaveMapDialog(map) {
    const dialogRef = this.dialog.open(SaveMapComponent, {
      data: {
        map: map,
        locationMarkers: this.CurrentMapModel.locationList,
        mapMarkerSet: this.CurrentMapModel.mapMarkerSet
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (res) {
          this.MapSaved.emit(res);
        }
      }
    });
  }
  // HELPERS



}