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
    this.JourneyChanged.emit({ message: 'activity group checked/unchecked', journey: { ...this.Journey } });
  }

  public OnActivityCheckChange(event, activity) {
    activity.Checked = event.checked;
    this.JourneyChanged.emit({ message: 'activity checked/unchecked', journey: { ...this.Journey } });
  }

}