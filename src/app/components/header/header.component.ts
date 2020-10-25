import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar>
      <div class="container" id="left">
        <img src="../../../assets/symbol.svg" id="logo"/>
        <mat-divider vertical style="height: 24px; color: $dark-grey"></mat-divider>
        <mat-button-toggle-group class="mat-elevation-z4">
          <mat-button-toggle class="toggle" value="security">
            <mat-icon [inline]="true">security</mat-icon>
          </mat-button-toggle>
          <mat-button-toggle class="toggle" value="user" [checked]="true">
            <mat-icon [inline]="true">person</mat-icon>
          </mat-button-toggle>
        </mat-button-toggle-group>
        <mat-form-field>
          <mat-label><i>Pesquisar...</i></mat-label>
          <input matInput />
          <mat-icon matSuffix [inline]="true">search</mat-icon>
        </mat-form-field>
      </div>

      <div class="container" id="right">
        <button mat-icon-button (click)="toggleFilter()"
          class="filter mat-elevation-z4 button-white">
          <mat-icon [inline]="true">tune</mat-icon>
        </button>
        <button mat-flat-button class="add-user button-pink"><mat-icon [inline]="true">person</mat-icon>INCLUIR USUÁRIO</button>
        <mat-divider vertical style="height: 24px; color: $dark-grey; margin-right: 4px"></mat-divider>
        <div class="system">
          <button mat-icon-button><mat-icon [inline]="true">home</mat-icon></button>
          <button mat-icon-button><mat-icon [inline]="true">settings</mat-icon></button>
          <button mat-icon-button><mat-icon [inline]="true">power_settings_new</mat-icon></button>
        </div>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  toggleFilter(){
    this.sharedService.filterToggle.next();
  }

}
