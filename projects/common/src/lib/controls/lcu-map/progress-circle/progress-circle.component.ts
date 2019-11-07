import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'lcu-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent implements OnInit {

  protected progressCircle: any;

  protected pCircumference: number;


  @Input('percentage')
  public Percentage: number;

  @Input('percentage-color')
  public PercentageColor: string;

  @Input('circle-background-color')
  public CircleBackgroundColor: string;

  @Input('height')
  public Height: any;

  @Input('width')
  public Width: any;

  @Input('stroke-width')
  public StrokeWidth: any;

  @ViewChild('progressCircle', { static: false }) set content(elRef: ElementRef) {
    this.progressCircle = elRef.nativeElement;
  }


  constructor(protected renderer: Renderer2) {
    
   }

  ngOnInit() {
    this.SetDefaultTheme(); 
  }

  public ngAfterViewInit(): void {
       

    this.initProgressCircle();
  }
/**
   * Initializes the SVG progress circle to get and set the necessary values for displaying a rating.
   */
  public initProgressCircle(): void {
    if (this.progressCircle) {
      const radius = this.progressCircle.r.baseVal.value;
      this.pCircumference = radius * 2 * Math.PI;
      this.progressCircle.style.strokeDasharray = `${this.pCircumference} ${this.pCircumference}`;
      this.progressCircle.style.strokeDashoffset = `${this.pCircumference}`;
      

      if (this.Percentage) {
        this.initRatingInfo(this.Percentage);
      }
    }
  }

/**
   * Triggers an CSS animation to offset the progress circle based on the value given.
   *
   * @param percent The percent of total ratings for a given location.
   */
  public initRatingInfo(percent: number): void {
    const offset = this.pCircumference - (percent / 100 * this.pCircumference);

    setTimeout(() => {
      this.renderer.setStyle(this.progressCircle, 'stroke-dashoffset', offset);
    }, 200);
  }

  protected SetDefaultTheme(): void{
    if(!this.CircleBackgroundColor){
      this.CircleBackgroundColor = "#F1F4F6";
    }
    console.log("percentage color = ", this.PercentageColor)
    if(!this.PercentageColor){
      this.PercentageColor = "#67C7C5";
    }
    if(!this.Width){
      this.Width = "80";
    }
    if(!this.Height){
      this.Height = "80";
    }
    if(!this.StrokeWidth){
      this.StrokeWidth = "4";
    }
    if(!this.Percentage){
      this.Percentage = Math.round(Math.random() * 100); // Setting random number until backend is ready
    }
  }

}
