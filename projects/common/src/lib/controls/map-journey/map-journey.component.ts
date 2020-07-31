import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-map-journey',
  templateUrl: './map-journey.component.html',
  styleUrls: ['./map-journey.component.scss']
})
export class MapJourneyComponent implements OnInit {

  protected _journey: any;
  protected _amblOnLocationArray: any;

  @Input('journey')
  public set Journey(journey: any) { // TODO : bring in ItineraryModel and change this
    if (!journey) { return; }
    journey.ActivityGroups.forEach(ag => {
      ag.PanelOpenState = false;
    });
    this._journey = journey;
    this.addLocationData();
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

  constructor() { }

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

  protected addLocationData() {
    if (this.Journey && this.AmblOnLocationArray) {
      this.Journey.ActivityGroups.forEach(ag => {
        ag.Activities.forEach(act => {
          if (this.AmblOnLocationArray.find(loc => loc.ID === act.LocationID)) {
            act.locationData = this.AmblOnLocationArray.find(loc => loc.ID === act.LocationID);
            if (act.locationData.Country === 'United States') {act.locationData.Country = 'USA';}
          }
        });
      });
    }
  }

}
