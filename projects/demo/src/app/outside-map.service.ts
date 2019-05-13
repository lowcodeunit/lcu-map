import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutsideMapService {

  latLngChange = new Subject<{}>();

  constructor() {
    setTimeout(x => {
      this.latLngChange.next({ lat: 0, lng: 100 });
    }, 2000)
  }

  ngOnInit() {
  }


}
