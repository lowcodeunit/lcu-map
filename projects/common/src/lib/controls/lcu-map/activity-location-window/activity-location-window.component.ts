import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { AgmInfoWindow, InfoWindowManager } from '@agm/core';
import { LocationInfoService } from '../../../services/location-info.service';
import { IconImageObject } from '../../../models/icon-image-object.model';
import { MapConversions } from '../../../utils/conversions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lcu-activity-location-window',
  templateUrl: './activity-location-window.component.html',
  styleUrls: ['./activity-location-window.component.scss']
})
export class ActivityLocationWindowComponent implements OnInit, OnDestroy {

  public infoWindow: AgmInfoWindow;
  public _belongsToJourney: boolean = false;
  public mapMarkerClickedSubscription: Subscription;

  @Input() public marker: ActivityModel;

  @Input('belongs-to-journey')
  public set BelongsToJourney(val: boolean) {
    this._belongsToJourney = val;
  }
  public get BelongsToJourney() {
    return this._belongsToJourney;
  }

  @Input('default-marker')
  public DefaultMarker: IconImageObject;

  constructor(
    protected infoWindowManager: InfoWindowManager,
    protected locationInfoService: LocationInfoService,
    protected mapConversions: MapConversions,
    protected mapService: MapService
  ) { }

  /**
   * Angular lifecycle hook that gets called on initialization.
   */
  public ngOnInit(): void {
    console.log('MARKER: ', this.marker)
    console.log(this.marker)

    this.mapMarkerClickedSubscription = this.mapService.MapMarkerClicked.subscribe(
      (infoWindow: AgmInfoWindow) => {
        this.infoWindow = infoWindow;
      }
    );

  }

  /**
   * Angular lifecycle hook that gets called after the view has finished initializing.
   */
  public ngAfterViewInit(): void {
    // if (!this.DefaultMarker) {
    //   this.DefaultMarker = { name: "lcu-map-default-marker", url: "./assets/lcu-map-default-marker.png", scaledSize: { width: 40, height: 40 } };
    // }
  }

  /**
   * Angular lifecycle hook that will get called when the marker changes, otherwise data for info blocks
   * will stay the same when user navigates to new location from google search
   */
  public ngOnChanges(): void {
    
  }

  /**
   * Angular lifecycle hook that gets called when a view is removed from the DOM.
   */
  public ngOnDestroy(): void {
    this.marker = null;
    this.mapMarkerClickedSubscription.unsubscribe();
  }

  /**
   * Emits an event back to the map to close the info window.
   */
  public Close(): void {
    this.mapService.InfoWindowClosedEvent();
    this.locationInfoService.SetSelectedMarker(undefined);
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

}


import { Pipe, PipeTransform } from '@angular/core';
import { ActivityModel } from '../../../models/activity.model';
@Pipe({ name: 'RemoveDashes' })
export class RemoveDashesPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value ? value.replace(/-/g, '') : '';
  }
}
