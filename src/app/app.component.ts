import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private sharedService: SharedService
  ){}

  ngOnInit() {
    this.sharedService.filterToggle.subscribe(() => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy(){
    this.sharedService.filterToggle.unsubscribe();
  }
}
