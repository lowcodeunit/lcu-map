import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { MapMarker } from '../../../models/map-marker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarkerInfo } from '../../../models/marker-info.model';

export enum ModalStateType {
  BASIC = 'BASIC',
  ADD_TO_MAP = 'ADD_TO_MAP'
}

@Component({
  selector: 'lcu-basic-info-window-rewrite',
  templateUrl: './basic-info-window-rewrite.component.html',
  styleUrls: ['./basic-info-window-rewrite.component.scss']
})
export class BasicInfoWindowRewriteComponent implements OnInit, OnDestroy, AfterViewInit {

  public basicInfoBlocks: string[];
  public chosenIcon: MarkerInfo;
  public currentState: ModalStateType;
  public displayMarkerSet: Array<MarkerInfo>;
  public iconSetExpanded: boolean = false;
  public isEdit: boolean = false;
  public markerSet: Array<MarkerInfo>;
  public modalStateType = ModalStateType;
  public newMarkerForm: FormGroup;

  public circle: any;
  public radius: number;
  public circumference: number;

  @Input() public marker: MapMarker;

  @Input() public mapMarkerSet: MarkerInfo[];

  constructor() { }

  public ngOnInit(): void {
    console.log('ngOnInit', this.marker);
    this.buildBasicInfoContent(this.marker);
    this.currentState = ModalStateType.BASIC;

    this.newMarkerForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] })
    });
  }

  public ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.circle = document.querySelector(`#progress-ring-${this.marker.ID}`);
    this.radius = this.circle.r.baseVal.value;
    this.circumference = this.radius * 2 * Math.PI;
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = `${this.circumference}`;
    this.marker.Rating = Math.round(Math.random() * 100);
    this.initRatingInfo(this.marker.Rating);


    this.markerSet = this.mapMarkerSet.slice(0, -1);
    this.displayMarkerSet = this.truncateArray(this.markerSet, 7);
  }

  public ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.marker = null;
  }

  public buildBasicInfoContent(marker: MapMarker): void {
    const blocks: string[] = [];

    marker.Address = '123 Pearl street';
    marker.Telephone = '+1 800-423-0039';
    marker.Town = 'Boulder';
    marker.State = 'Colorado';
    marker.Country = 'United States of America';

    let addrLine: string = marker.Town ? marker.Town : '';
    addrLine += marker.State ? marker.Town ? ', ' + marker.State : marker.State : '';

    blocks.push(marker.Address);
    blocks.push(addrLine ? addrLine : null);
    blocks.push(marker.Country);
    blocks.push(marker.Telephone);

    this.basicInfoBlocks = blocks.filter(val => val !== undefined && val !== null);
  }

  public initRatingInfo(percent: number): void {
    console.log('initRatingInfo', percent);
    this.circle.style.strokeDashoffset = this.circumference;
    const offset = this.circumference - percent / 100 * this.circumference;
    this.circle.style.strokeDashoffset = offset;

    setTimeout(() => { // TODO: set this off of an 'opened' event of some kind
      this.circle.style.strokeDashoffset = offset;
    }, 1000);
  }

  public changeView(newState: ModalStateType): void {
    this.currentState = newState;
  }

  /**
   * Toggles the visible selectable icon display between 7 and the max number of icons
   */
  public toggleVisibleIcons() {
    if (!this.iconSetExpanded) {
      this.iconSetExpanded = true;
      this.displayMarkerSet = this.truncateArray(this.markerSet);
    } else {
      this.iconSetExpanded = false;
      this.displayMarkerSet = this.truncateArray(this.markerSet, 7);
    }
  }

  /**
   * Returns the passed array after being truncated as indicated by the number passed
   * @param arr the array to truncate
   * @param num the index of the last element to show in the returned array
   */
  protected truncateArray(arr: Array<any>, num?: number) {
    return num ? [...arr.slice(0, num)] : [...arr];
  }

  /**
   * Sets the current ChosenIcon to the icon the user selected
   * @param icon The icon chosen by the user
   */
  public setIcon(icon): void {
    if (this.chosenIcon === icon) {
      this.chosenIcon = null;
    } else {
      this.chosenIcon = icon;
    }
  }

  public openMoreInfo(): void {

  }

}
