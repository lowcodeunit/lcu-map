import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lcu-map-journey',
  templateUrl: './map-journey.component.html',
  styleUrls: ['./map-journey.component.scss']
})
export class MapJourneyComponent implements OnInit {

  protected _journey: any;

  @Input('journey')
  public set Journey(journey: any) {
    journey.ActivityGroups.forEach(ag => {
      ag.PanelOpenState = false;
    });
    this._journey = journey;
  }
  public get Journey(): any {
    return this._journey;
  }

  constructor() { }

  ngOnInit() {
  }

}