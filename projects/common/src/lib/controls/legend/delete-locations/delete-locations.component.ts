import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'lcu-delete-locations',
  templateUrl: './delete-locations.component.html',
  styleUrls: ['./delete-locations.component.scss']
})
export class DeleteLocationsComponent implements OnInit {

  // PROPERTIES

  /**
   * the title of the map to delete passed in by parent
   */
  public LocationsLength: number;

  /**
   * the boolean that reflects the user's confirmation to delete the map or not
   */
  public UserConfirmed: boolean;

  // CONSTRUCTORS

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    public dialogRef: MatDialogRef<DeleteLocationsComponent>
  ) {
    this.LocationsLength = this.passedData.locationsLength;
    this.UserConfirmed = false;
  }

  // LIFECYCLE

  ngOnInit() {
  }

  // API METHODS

  /**
   * closes the mat dialog box and passes back user's response
   */
  public Close(): void {
    this.dialogRef.close(this.UserConfirmed);
  }

  /**
   *
   * @param value boolean that reflects whether or not the user wants to delete the chosen map
   */
  public SetUserConfirmed(value: boolean) {
    this.UserConfirmed = value;
    this.Close();
  }

}



