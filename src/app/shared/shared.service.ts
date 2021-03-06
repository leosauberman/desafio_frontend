import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  filterToggle = new Subject();
  filterString = new Subject<string>();
  filterValue = new Subject();
}
