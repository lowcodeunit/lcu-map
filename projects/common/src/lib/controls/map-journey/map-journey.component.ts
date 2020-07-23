import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-map-journey',
  templateUrl: './map-journey.component.html',
  styleUrls: ['./map-journey.component.scss']
})
export class MapJourneyComponent implements OnInit {

  protected _journey: any;

  @Input('journey')
  public set Journey(journey: any) { // TODO : bring in ItineraryModel and change this
    journey.ActivityGroups.forEach(ag => {
      ag.PanelOpenState = false;
    });
    this._journey = journey;
    console.log('JOURNEY: ', this._journey);
  }
  public get Journey(): any {
    return this._journey;
  }

  /* tslint:disable-next-line:no-output-rename */
  @Output('journey-changed')
  public JourneyChanged: EventEmitter<{message: string, journey: any}> = new EventEmitter(); // TODO : bring in ItineraryModel and change this

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
      delete ag.PanelOpenState;
      // DELETE ADDED PROPERTIES HERE
    });
    this.JourneyChanged.emit({message, journey: journeyToSend});
  }

}
