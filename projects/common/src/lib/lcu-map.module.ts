import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/common';
import { AgmCoreModule } from '@agm/core';
import { LcuMapComponent } from './controls/lcu-map/lcu-map.component';
import { MatIconModule, MatSelectModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatMenuModule, MatCheckboxModule, MatRadioModule, MatDividerModule, MatTooltipModule, MatExpansionModule, MatAutocompleteModule, MatCardModule, MatToolbar, MatToolbarModule } from '@angular/material';
import { AddMapMarkerComponent } from './controls/lcu-map/add-map-marker/add-map-marker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SaveMapComponent } from './controls/lcu-map/save-map/save-map.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { BasicInfoWindowComponent } from './controls/lcu-map/basic-info-window/basic-info-window.component';
import { InfoFooterComponent } from './controls/lcu-map/info-footer/info-footer.component';
import { LocationInfoFormComponent } from './controls/lcu-map/location-info-form/location-info-form.component';
import { LegendComponent } from './controls/legend/legend.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs'



@NgModule({
  declarations: [LcuMapComponent, AddMapMarkerComponent, SaveMapComponent, BasicInfoWindowComponent, InfoFooterComponent, LocationInfoFormComponent, LegendComponent],
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
  providers: [GoogleMapsAPIWrapper],
  exports: [LcuMapComponent, BasicInfoWindowComponent, InfoFooterComponent, LocationInfoFormComponent, LegendComponent],
  entryComponents: [LcuMapComponent, AddMapMarkerComponent, SaveMapComponent, BasicInfoWindowComponent, InfoFooterComponent, LocationInfoFormComponent, LegendComponent]
})
export class LcuMapModule { }
