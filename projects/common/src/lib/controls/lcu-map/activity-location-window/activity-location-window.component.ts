import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ViewChild, ElementRef, OnChanges, isDevMode } from '@angular/core';
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
export class ActivityLocationWindowComponent implements OnInit, OnDestroy, OnChanges {

  // public IsDevModeEnv: boolean;

  /**
   * Indicates whether or not the journey being displayed belongs to a journey
   */
  protected _belongsToJourney: boolean = false;

  /**
   * The Agm Info Window
   */
  public infoWindow: AgmInfoWindow;

  public mapMarkerClickedSubscription: Subscription;

  /**
   * The collection of icons (Angular Material Icons) to be displayed as choices for the activity
   */
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

  /**
   * Indicates whether or not the user is selecting an icon for the activity
   */
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
  ) { 
    // if (isDevMode()) {
    //   this.IsDevModeEnv = true;
    // } else {
    //   this.IsDevModeEnv = false;
    // }
  }

  /**
   * Angular lifecycle hook that gets called on initialization.
   */
  public ngOnInit(): void {
    this.mapMarkerClickedSubscription = this.mapService.MapMarkerClicked.subscribe(
      (infoWindow: AgmInfoWindow) => {
        this.infoWindow = infoWindow;
      }
    );
      console.log("MARKER", this.marker.locationData)
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

  /**
   * Sets the id of the activity whose text box was focused
   */
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

  /**
   *
   * @param notesText the notes the user has saved
   *
   * Runs when a user clicks off or tabs off a notes text area - saves the notes
   */
  public SaveNotes(notesText) {
    this.NotesSaved.emit(notesText.value);
    this.locationInfoService.setHighlightedNotesLocationId(null);
  }

  /**
   * Runs when user clicks the 'add' icon to add a location to the journey
   */
  public addIconClicked() {
    this.AddIconClicked.emit();
    this.BelongsToJourney = true;
  }

  /**
   * Shows the widget icon selection so user can choose new icon for activity
   */
  public ShowWidgetIconSelection() {
    this.IsSelectingIcon = true;
  }

  /**
   *
   * @param icon the string of the new icon the user has chosen for the activity
   *
   * Saves the newly chosen icon as the activity's icon
   */
  public OnChoseIcon(icon: string) {
    this.IsSelectingIcon = false;
    this.UserChoseIcon.emit(icon);
    console.log("icon: ", this.marker.WidgetIcon)
    this.marker.WidgetIcon = icon;
    console.log("icon sstring: ", icon)
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
