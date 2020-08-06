import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from '../../services/map.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'lcu-map-journey',
  templateUrl: './map-journey.component.html',
  styleUrls: ['./map-journey.component.scss']
})
export class MapJourneyComponent implements OnInit {

  protected _journey: any;
  protected _amblOnLocationArray: any;

  public DropListArray: Array<string> = [];
  public PanToLocation: { lat: number, lng: number, zoom: number };

  @Input('journey')
  public set Journey(journey: any) { // TODO : bring in ItineraryModel and change this
    if (!journey) { return; }
    journey.ActivityGroups.forEach(ag => {
      ag.PanelOpenState = false;
    });
    this._journey = journey;
    this.addLocationData();
    this.assignDropListData();
    console.log(this.DropListArray)
  }
  public get Journey(): any {
    return this._journey;
  }

  @Input('ambl-on-location-array')
  public set AmblOnLocationArray(arr) {
    this._amblOnLocationArray = arr;
    this.addLocationData();
  }
  public get AmblOnLocationArray() {
    return this._amblOnLocationArray;
  }

  /* tslint:disable-next-line:no-output-rename */
  @Output('journey-changed')
  public JourneyChanged: EventEmitter<{ message: string, journey: any }> = new EventEmitter(); // TODO : bring in ItineraryModel and change this

  @Output('activity-location-clicked')
  public ActivityLocationClicked: EventEmitter<any> = new EventEmitter();

  @Output('legend-top-icon-clicked')
  public LegendTopIconClickedEvent: EventEmitter<string> = new EventEmitter();

  constructor(protected mapService: MapService) { }

  ngOnInit() {
  }

  public OnAGCheckChange(event, ag) {
    ag.Checked = event.checked;
    this.normalizeAndEmitJourney('activity group checked/unchecked', this.Journey);
  }

  public OnActivityCheckChange(event, activity) {
    activity.Checked = event.checked;
    this.normalizeAndEmitJourney('activity checked/unchecked', this.Journey);
  }

  public onFavoritedClick(activity) {
    activity.Favorited = !activity.Favorited;
    this.normalizeAndEmitJourney('activity favorited / unfavorited', this.Journey);
  }

  public onActivityClickToNavigate(activity) {
    this.ActivityLocationClicked.emit(activity);
  }

  public LegendTopIconClicked(icon: string) {
    this.LegendTopIconClickedEvent.emit(icon);
  }

  public DropGroup(event: CdkDragDrop<string[]>) {
    // console.log('DROP GROUP EVENT: ');
    // console.log(event);
    moveItemInArray(this.Journey.ActivityGroups, event.previousIndex, event.currentIndex);
  }

  public DropActivity(event: CdkDragDrop<string[]>) {
    // console.log('DROP ACTIVITY EVENT: ');
    // console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /**
   *
   * @param message the message to include as to what change was made to trigger the emit
   * @param journey the changed journey
   *
   * removes anything added to the journey that is specific to this map-journey component and emits a message and the changed journey
   */
  protected normalizeAndEmitJourney(message: string, journey: any) {
    const journeyToSend = JSON.parse(JSON.stringify(journey));
    journeyToSend.ActivityGroups.forEach(ag => {
      // DELETE ADDED GROUP PROPERTIES HERE
      delete ag.PanelOpenState;
      ag.Activities.forEach(act => {
        // DELETE ADDED ACTIVITY PROPERTIES HERE
        delete act.locationData;
      });
    });
    this.JourneyChanged.emit({ message, journey: journeyToSend });
  }

  protected assignDropListData() {
    this.Journey.ActivityGroups.forEach(ag => {
      this.DropListArray.push(ag.Title);
    });
  }

  protected addLocationData() {
    if (this.Journey && this.AmblOnLocationArray) {
      this.Journey.ActivityGroups.forEach(ag => {
        ag.Activities.forEach(act => {
          if (this.AmblOnLocationArray.find(loc => loc.ID === act.LocationID)) {
            act.locationData = this.AmblOnLocationArray.find(loc => loc.ID === act.LocationID);
            if (act.locationData.Country === 'United States') { act.locationData.Country = 'USA'; }
          }
        });
      });
      const firstActivityData = this.Journey.ActivityGroups[0].Activities[0].locationData;
      this.PanToLocation = {
        lat: firstActivityData.Latitude,
        lng: firstActivityData.Longitude,
        zoom: 6
      };
      this.mapService.ForcePan(this.PanToLocation);
    }
  }

}
