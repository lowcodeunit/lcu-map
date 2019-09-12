import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MarkerInfo } from '../../../models/marker-info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapMarker } from '../../../models/map-marker.model';
import { MapConversions } from '../../../utils/conversions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationInfoService } from '../../../services/location-info.service';


@Component({
  selector: 'lcu-basic-info-window',
  templateUrl: './basic-info-window.component.html',
  styleUrls: ['./basic-info-window.component.scss']
})
export class BasicInfoWindowComponent implements AfterViewInit, OnInit {

  // FIELDS



  // PROPERTIES

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  /**
   * determine what state the modal is in
   * 
   * basic = basic info
   * 
   * addToMap = able to edit the location
   */
  public ModalState = "basic";

  public BasicInfoData: any;


  /**
   * boolean that indicates whether the expanded list of icons is showing or the truncated version
   */
  public IconSetExpanded: boolean;

  /**
   * the marker set that will be displayed to the user
   */
  public DisplayMarkerSet: Array<MarkerInfo>;

  /**
   * The set of marker icons coming in to the modal
   */
  public MarkerSet: Array<MarkerInfo>;

  /**
   * Reflects whether the incoming location marker exists or not (if it exists, IsEdit is true)
   */
  public IsEdit: boolean = false;

  /**
   * The form used to get data from user and set the location's data to it
   */
  public NewMarkerForm: FormGroup;

  /**
   * The marker whose data will be set and created
   */
  public NewMarker: MapMarker;

  /**
   * The chosen icon for the current location marker
   */
  public ChosenIcon: MarkerInfo;

  public InstagramUrl: string;

  public LinkedPhoneNumber: string;

  public Type: string;

  public Title: string;

  public TitleEllipsis: boolean;

  // CONSTRUCTORS

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    protected dialogRef: MatDialogRef<BasicInfoWindowComponent>,
    protected mapConversions: MapConversions,
    protected breakpointObserver: BreakpointObserver,
    private locationInfoService: LocationInfoService) {
    this.IsEdit = this.passedData.isEdit;
    this.IconSetExpanded = false;
  }

  // LIFE CYCLE

  ngOnInit() {
    this.NewMarkerForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] })
    });
    if (this.IsEdit) {
      this.NewMarker = this.passedData.marker;
    } else {
      this.NewMarker = {
        ID: '',
        LayerID: '0',
        Title: '',
        Icon: '',
        Latitude: 0,
        Longitude: 0
      }
    }
  }

  ngAfterViewInit() {
    // TODO: Change so we don't use setTimeout in basic-info-window.components.ts waiting for state setTimeout also in lcu-map.component.ts DisplayInfoMarker()
    setTimeout(() => {
      this.BasicInfoData = this.passedData.marker;
      this.CheckTitleLength(this.passedData.marker.Title);
      this.MarkerSet = this.passedData.markerSet;
      this.DisplayMarkerSet = this.truncateArray(this.MarkerSet, 7);
      this.NewMarkerForm.patchValue({ title: this.BasicInfoData.Title });
      this.NewMarker = { ...this.passedData.marker };
      this.setChosenIconIfExists(this.NewMarker.Icon);
      this.InstagramUrl = this.locationInfoService.BuildInstagramUrl(this.NewMarker);
      this.locationInfoService.SetPhoneNumberUrl(this.NewMarker);
      this.LinkedPhoneNumber = this.locationInfoService.GetPhoneNumberUrl();
      this.Type = this.locationInfoService.GetType(this.NewMarker);
    }, 50);
    this.changePositionToCenter(false);
  }

  ngOnDestroy() {
    this.locationInfoService.SetHighlightIcon(false);
  }

  // API METHODS
  public CheckTitleLength(title: string): void {
    if (title.length > 25) {
      this.Title = title.substr(0, 20) + '...';
      this.TitleEllipsis = true;
    }
    else {
      this.Title = title;
      this.TitleEllipsis = false;
    }
    //console.log("Title = ", this.Title);
  }


  /**
   * Changes the position of the modal to the right hand side of the screen for more info state
   */
  public changePositionToRHS() {
    this.dialogRef.updatePosition({ right: '10px', top: '35px', bottom: '35px' });
    //width x height
    this.dialogRef.updateSize("30vw", "88vh");
    this.locationInfoService.SetHighlightIcon(true);
  }

  /**
   * Change position of the dialog box to the center when modal is in basic state
   */
  public changePositionToCenter(highlight: boolean) {
    this.dialogRef.updatePosition({ top: '40px' });
    //width x height
    this.dialogRef.updateSize("300px", "210px");
    this.locationInfoService.SetHighlightIcon(highlight);
  }
  /**
   * Called when the modal is displaying editable content
   */
  public changePositionTopOfCenter() {
    this.dialogRef.updatePosition({ top: '0px' });
    this.locationInfoService.SetHighlightIcon(false);
    //width x height
    this.dialogRef.updateSize("500px", "250px");
  }

  /**
   * Closes the modal
   */
  public Close(): void {
    this.locationInfoService.SetHighlightIcon(false);
    this.dialogRef.close();
  }

  /**
   * Sets the marker data to the user entered data
   */
  public SetMarkerData(): void {
    if (!this.IsEdit) {
      this.NewMarker.ID = '';
    }
    this.NewMarker.LayerID = this.passedData.layerID;
    this.NewMarker.Title = this.NewMarkerForm.value.title;
    this.NewMarker.Icon = this.ChosenIcon.IconLookup;
    this.NewMarker.IconImageObject = this.mapConversions.ConvertIconObject(this.ChosenIcon.IconLookup, this.passedData.markerSet);
  }

  /**
   * toggles the visible selectable icon display between 7 and the max number of icons
   */
  public ToggleVisibleIcons() {
    if (!this.IconSetExpanded) {
      this.IconSetExpanded = true;
      this.DisplayMarkerSet = this.truncateArray(this.MarkerSet);
    } else {
      this.IconSetExpanded = false;
      this.DisplayMarkerSet = this.truncateArray(this.MarkerSet, 7);
    }
  }

  /**
   * 
   * @param icon The icon chosen by the user
   * 
   * Sets the current ChosenIcon to the icon the user selected
   */
  public SetIcon(icon): void {
    if (this.ChosenIcon === icon) {
      this.ChosenIcon = null;
    } else {
      this.ChosenIcon = icon;
    }
  }

  // HELPERS

  /**
   *
   * @param arr the array to truncate
   *
   * @param num the index of the last element to show in the returned array
   *
   * returns the passed array after being truncated as indicated by the number passed
   */
  protected truncateArray(arr: Array<any>, num?: number) {
    return num ? [...arr.slice(0, num)] : [...arr];
  }

  /**
   * 
   * @param iconName The name of the current icon
   * 
   * Initially sets the current ChosenIcon to the associated marker for recognition of active status
   */
  protected setChosenIconIfExists(iconName: string): void {
    this.MarkerSet.forEach(marker => {
      if (marker.IconLookup === iconName) {
        this.ChosenIcon = marker;
      }
    });
  }

}
