import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/common';
import { AgmCoreModule, InfoWindowManager, MarkerManager } from '@agm/core';
import { LcuMapComponent } from './controls/lcu-map/lcu-map.component';
import { MatIconModule,
         MatSelectModule,
         MatDialogModule,
         MatButtonModule,
         MatInputModule,
         MatFormFieldModule,
         MatMenuModule,
         MatCheckboxModule,
         MatRadioModule,
         MatDividerModule,
         MatTooltipModule,
         MatExpansionModule,
         MatAutocompleteModule,
         MatCardModule,
         MatToolbarModule } from '@angular/material';
import { AddMapMarkerComponent } from './controls/lcu-map/add-map-marker/add-map-marker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SaveMapComponent } from './controls/lcu-map/save-map/save-map.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { InfoFooterComponent } from './controls/lcu-map/info-footer/info-footer.component';
import { LocationInfoFormComponent } from './controls/lcu-map/location-info-form/location-info-form.component';
import { LegendComponent } from './controls/legend/legend.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import { DeleteLocationsComponent } from './controls/legend/delete-locations/delete-locations.component'
import { SubString } from './utils/pipes/substring.pipe';
import { BasicInfoWindowRewriteComponent } from './controls/lcu-map/basic-info-window-rewrite/basic-info-window-rewrite.component';
import { MoreInfoWindowComponent } from './controls/lcu-map/more-info-window/more-info-window.component';
import { CheckBoxSubString } from './utils/pipes/checkbox-substring.pipe';

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
    MoreInfoWindowComponent
  ],
  imports: [
    FathymSharedModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAsKh4_TXpYV57SBs7j3b6qFcJUG6fNHoU', libraries: ['places'] }),
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatTooltipModule,
    MatToolbarModule,
    HttpClientModule,
    MatExpansionModule,
    MatCardModule,
    MatAutocompleteModule,
    DragDropModule,
    MatSidenavModule,
    MatTabsModule
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
    MoreInfoWindowComponent
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
    MoreInfoWindowComponent
  ]
})
export class LcuMapModule { }
