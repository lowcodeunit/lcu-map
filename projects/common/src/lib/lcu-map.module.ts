import { NgModule, InjectionToken } from '@angular/core';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { InfoWindowManager, MarkerManager, AgmCoreModule } from '@agm/core';
import { LcuMapComponent } from './controls/lcu-map/lcu-map.component';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatSelectModule } from '@angular/material/select';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatCardModule } from '@angular/material/card';
// import { MatToolbarModule } from '@angular/material/toolbar';
import { AddMapMarkerComponent } from './controls/lcu-map/add-map-marker/add-map-marker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveMapComponent } from './controls/lcu-map/save-map/save-map.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { InfoFooterComponent } from './controls/lcu-map/info-footer/info-footer.component';
import { LocationInfoFormComponent } from './controls/lcu-map/location-info-form/location-info-form.component';
import { LegendComponent } from './controls/legend/legend.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatTabsModule} from '@angular/material/tabs';
import { DeleteLocationsComponent } from './controls/legend/delete-locations/delete-locations.component'
import { SubString } from './utils/pipes/substring.pipe';
import { BasicInfoWindowRewriteComponent } from './controls/lcu-map/basic-info-window-rewrite/basic-info-window-rewrite.component';
import { MoreInfoWindowComponent } from './controls/lcu-map/more-info-window/more-info-window.component';
import { CheckBoxSubString } from './utils/pipes/checkbox-substring.pipe';
import { LcuProgressCircleModule } from '@lowcodeunit/lcu-progress-circle-common';
import { MapJourneyComponent } from './controls/map-journey/map-journey.component';
import { ActivityLocationWindowComponent, RemoveDashesPipe } from './controls/lcu-map/activity-location-window/activity-location-window.component';

// Need to do this, because .forRoot() fails when in the imports' array (just Angular 10?) - Shannon
export const AGMCoreExportModule =  AgmCoreModule.forRoot(
  { 
    apiKey: 'AIzaSyAsKh4_TXpYV57SBs7j3b6qFcJUG6fNHoU', 
    libraries: ['places'] 
  });

@NgModule({
  declarations: [
    LcuMapComponent,
    AddMapMarkerComponent,
    SaveMapComponent,
    InfoFooterComponent,
    LocationInfoFormComponent,
    LegendComponent,
    DeleteLocationsComponent,
    SubString,
    CheckBoxSubString,
    BasicInfoWindowRewriteComponent,
    MoreInfoWindowComponent,
    MapJourneyComponent,
    ActivityLocationWindowComponent,
    RemoveDashesPipe
    
  ],
  imports: [
    FathymSharedModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AGMCoreExportModule,
    HttpClientModule,
    DragDropModule,
    LcuProgressCircleModule
  ],
  providers: [
    GoogleMapsAPIWrapper,
    InfoWindowManager,
    MarkerManager
  ],
  exports: [
    LcuMapComponent,
    InfoFooterComponent,
    LocationInfoFormComponent,
    LegendComponent,
    DeleteLocationsComponent,
    BasicInfoWindowRewriteComponent,
    MoreInfoWindowComponent,
  ],
  entryComponents: [
    LcuMapComponent,
    AddMapMarkerComponent,
    SaveMapComponent,
    InfoFooterComponent,
    LocationInfoFormComponent,
    LegendComponent,
    DeleteLocationsComponent,
    BasicInfoWindowRewriteComponent,
    MoreInfoWindowComponent,
  ]
})
export class LcuMapModule { }
