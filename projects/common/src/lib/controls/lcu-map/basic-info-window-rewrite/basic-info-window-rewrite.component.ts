import { Component, OnInit, Input } from '@angular/core';
import { MapMarker } from '../../../models/map-marker.model';

@Component({
  selector: 'lcu-basic-info-window-rewrite',
  templateUrl: './basic-info-window-rewrite.component.html',
  styleUrls: ['./basic-info-window-rewrite.component.scss']
})
export class BasicInfoWindowRewriteComponent implements OnInit {

  @Input('markerData') Marker: MapMarker;

  constructor() { }

  public ngOnInit() { }

}
