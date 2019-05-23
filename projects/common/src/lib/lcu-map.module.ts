import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu-ide/common';
import { AgmCoreModule } from '@agm/core';
import { LcuMapComponent } from './controls/lcu-map/lcu-map.component';
import { MatIconModule, MatSelectModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatMenuModule, MatCheckboxModule, MatRadioModule, MatDividerModule, MatTooltipModule } from '@angular/material';
import { AddMapMarkerComponent } from './controls/lcu-map/add-map-marker/add-map-marker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SaveMapComponent } from './controls/lcu-map/save-map/save-map.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { BasicInfoWindowComponent } from './controls/lcu-map/basic-info-window/basic-info-window.component';

@NgModule({
  declarations: [LcuMapComponent, AddMapMarkerComponent, SaveMapComponent, BasicInfoWindowComponent],
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
    HttpClientModule
  ],
  providers: [GoogleMapsAPIWrapper],
  exports: [LcuMapComponent, BasicInfoWindowComponent],
  entryComponents: [LcuMapComponent, AddMapMarkerComponent, SaveMapComponent, BasicInfoWindowComponent]
})
export class LcuMapModule { }
