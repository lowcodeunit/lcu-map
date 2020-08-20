import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from '../../services/map.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivityGroupModel } from '../../models/activity-group.model';


@Component({
  selector: 'lcu-map-journey',
  templateUrl: './map-journey.component.html',
  styleUrls: ['./map-journey.component.scss']
})
export class MapJourneyComponent implements OnInit {

  protected _amblOnLocationArray: any;
  protected _journey: any;
  protected _openPanels: Array<number> = [0];

  public ClickedActivityId: string;
  public DropListArray: Array<string> = [];
  public PanToLocation: { lat: number, lng: number, zoom: number };
  public DisplayedActivityGroups: Array<ActivityGroupModel>;

  @Input('clicked-activity')
  public set ClickedActivity(activity: any) {
    if (activity) {
      this.ClickedActivityId = activity.ID;
    }
    else {
      this.ClickedActivityId = null;
    }
  }

  @Input('journey')
  public set Journey(journey: any) { // TODO : bring in ItineraryModel and change this
    if (!journey) { return; }
    journey.ActivityGroups.forEach(ag => {
      ag.PanelOpenState = false;
    });
    this._journey = journey;
    this.addLocationData();
    this.assignDropListData();
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

  @Input('open-panel-indexes')
  public set OpenPanels(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
      this._openPanels = [...new Set(arr)];
    } else {
      this._openPanels = [0];
    }
  }
  public get OpenPanels() {
    return this._openPanels;
  }

  /* tslint:disable-next-line:no-output-rename */
  @Output('journey-changed')
  public JourneyChanged: EventEmitter<{ message: string, journey: any, additional?: any }> = new EventEmitter(); // TODO : bring in ItineraryModel and change this

  @Output('activity-location-clicked')
  public ActivityLocationClicked: EventEmitter<any> = new EventEmitter();

  @Output('legend-top-icon-clicked')
  public LegendTopIconClickedEvent: EventEmitter<string> = new EventEmitter();

  @Output('activity-groups-changed')
  public ActivityGroupsChanged: EventEmitter<any> = new EventEmitter();

  @Output('current-panel-open-state')
  public CurrentPanelOpenState: EventEmitter<Array<number>> = new EventEmitter();

  constructor(protected mapService: MapService) {
    this.DisplayedActivityGroups = new Array<ActivityGroupModel>();
  }

  ngOnInit() {
    
  }

  public OnAGCheckChange(event, ag) {
    ag.Checked = event.checked;
    this.normalizeAndEmitJourney('activity group checked/unchecked', this.Journey, { group: ag });
  }

  public OnActivityCheckChange(event, activity) {
    activity.Checked = event.checked;
    this.normalizeAndEmitJourney('activity checked/unchecked', this.Journey, { activity });
  }

  public onFavoritedClick(activity) {
    activity.Favorited = !activity.Favorited;
    this.normalizeAndEmitJourney('activity favorited / unfavorited', this.Journey, { activity });
  }

  public onActivityClickToNavigate(activity) {
    this.ActivityLocationClicked.emit(activity);
    if (activity.locationData) {
      this.ClickedActivityId = activity.ID;
    } else {
      this.ClickedActivityId = null;
    }
  }

  public LegendTopIconClicked(icon: string) {
    this.LegendTopIconClickedEvent.emit(icon);
  }

  public PanelOpened(activityGroup: any, idx: number) {
    if(!this.DisplayedActivityGroups.includes(activityGroup)){
      this.DisplayedActivityGroups.push(activityGroup);
      this.ActivityGroupsChanged.emit(this.DisplayedActivityGroups);
    }
    
    if (!this.OpenPanels.includes(idx)) {
      this.OpenPanels.push(idx);
    }
    this.emitPanelOpenState();
  }

  public PanelClosed(activityGroup: any, idx: number) {
    this.DisplayedActivityGroups.forEach(ag => {
      if (ag.ID === activityGroup.ID) {
        this.DisplayedActivityGroups.splice(this.DisplayedActivityGroups.indexOf(ag), 1);
      }
    });
    this.ActivityGroupsChanged.emit(this.DisplayedActivityGroups);
    this.OpenPanels.splice(this.OpenPanels.indexOf(idx), 1);
    this.emitPanelOpenState();
  }

  public DropGroup(event: CdkDragDrop<string[]>) {
    // console.log('DROP GROUP EVENT: ');
    // console.log(event);
    moveItemInArray(this.Journey.ActivityGroups, event.previousIndex, event.currentIndex);
    // console.log('Journy after moving items: ', this.Journey);
    this.reCalibrateDays();
    this.reOrderGroupsAndActivities();
    // console.log(this.Journey);
    this.normalizeAndEmitJourney('moved group', this.Journey);
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
    this.reOrderGroupsAndActivities();
    const newGroupTitle = event.container.id;
    const newGroupIndex = this.Journey.ActivityGroups.findIndex(j => j.Title === newGroupTitle);
    const movedActivity = this.Journey.ActivityGroups[newGroupIndex].Activities[event.currentIndex];
    this.normalizeAndEmitJourney('moved activity', this.Journey, { movedActivity });
  }

  /**
   *
   * @param message the message to include as to what change was made to trigger the emit
   * @param journey the changed journey
   *
   * removes anything added to the journey that is specific to this map-journey component and emits a message and the changed journey
   */
  protected normalizeAndEmitJourney(message: string, journey: any, additional?: any) {
    const journeyToSend = JSON.parse(JSON.stringify(journey));
    journeyToSend.ActivityGroups.forEach(ag => {
      // DELETE ADDED GROUP PROPERTIES HERE
      delete ag.PanelOpenState;
      ag.Activities.forEach(act => {
        // DELETE ADDED ACTIVITY PROPERTIES HERE
        delete act.locationData;
      });
    });
    this.JourneyChanged.emit({ message, journey: journeyToSend, additional });
  }

  protected emitPanelOpenState() {
    this.CurrentPanelOpenState.emit(this.OpenPanels);
  }

  protected assignDropListData() {
    this.DropListArray = [];
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

  protected reOrderGroupsAndActivities() {
    this.Journey.ActivityGroups.forEach((ag, gIdx) => {
      ag.Activities.forEach((act, aIdx) => {
        act.Order = aIdx;
      });
      ag.Order = gIdx;
    });
  }

  protected reCalibrateDays() {
    let dayCounter = 1;
    this.Journey.ActivityGroups.forEach(ag => {
      if (ag.GroupType === 'day') {
        ag.Title = `Day ${dayCounter++}`;
      }
    });
  }

}
