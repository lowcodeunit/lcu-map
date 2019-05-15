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

@NgModule({
  declarations: [LcuMapComponent, AddMapMarkerComponent, SaveMapComponent],
  imports: [
    FathymSharedModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCvvqYY9pMUpRSKl721rPEiN4KlKIpCImg' }),
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
    MatTooltipModule
  ],
  providers: [GoogleMapsAPIWrapper],
  exports: [LcuMapComponent],
  entryComponents: [LcuMapComponent, AddMapMarkerComponent, SaveMapComponent]
})
export class LcuMapModule { }
