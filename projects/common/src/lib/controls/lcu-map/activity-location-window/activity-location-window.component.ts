import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
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
export class ActivityLocationWindowComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  protected _belongsToJourney: boolean = false;

  public infoWindow: AgmInfoWindow;
  public mapMarkerClickedSubscription: Subscription;
  public IconSelection: Array<string> = [
    'location_on',
    'hotel',
    'restaurant',
    'local_cafe',
    'local_bar',
    'local_see',
    'palette',
    'music_note',
    'terrain',
    'beach_access',
    'golf_course'
  ];
  public IsSelectingIcon: boolean = false;

  @ViewChild('notesText', { static: false })
  public NotesInput: ElementRef;

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

  @Output('add-icon-clicked')
  public AddIconClicked: EventEmitter<any> = new EventEmitter();

  @Output('user-chose-icon')
  public UserChoseIcon: EventEmitter<any> = new EventEmitter();

  @Output('notes-saved')
  public NotesSaved: EventEmitter<any> = new EventEmitter();

  @Output('favorited-changed')
  public FavoritedChanged: EventEmitter<boolean> = new EventEmitter();


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
    this.mapMarkerClickedSubscription = this.mapService.MapMarkerClicked.subscribe(
      (infoWindow: AgmInfoWindow) => {
        this.infoWindow = infoWindow;
      }
    );
      console.log("Activity = ", this.marker);
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
  public ngOnChanges(event): void {
    if (this.locationInfoService.getHighlightedNotesLocationId()) {
      setTimeout(() => {
        this.NotesInput.nativeElement.focus();
      }, 100);
    }
  }

  public SetFocused() {
    this.locationInfoService.setHighlightedNotesLocationId(this.marker.ID);
  }

  /**
   * Angular lifecycle hook that gets called when a view is removed from the DOM.
   */
  public ngOnDestroy(): void {
    this.marker = null;
    this.mapMarkerClickedSubscription.unsubscribe();
  }

  public SaveNotes(notesText) {
    this.NotesSaved.emit(notesText.value);
    this.locationInfoService.setHighlightedNotesLocationId(null);
  }

  public addIconClicked() {
    this.AddIconClicked.emit();
    this.BelongsToJourney = true;
  }

  public ShowWidgetIconSelection() {
    this.IsSelectingIcon = true;
  }

  public OnChoseIcon(icon: string) {
    this.IsSelectingIcon = false;
    this.UserChoseIcon.emit(icon);
  }

  public ToggleFavorited(){
    this.marker.Favorited = !this.marker.Favorited;
    this.FavoritedChanged.emit(this.marker.Favorited);
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
