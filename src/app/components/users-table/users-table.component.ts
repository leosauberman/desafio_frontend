import { Component, EventEmitter, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy {
  columns: string[] = ['checkbox', 'user', 'email', 'dtInclusion', 'dtModified', 'rules', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();
  selected = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private service: UserService,
    private renderer: Renderer2,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.loadData();

    this.sharedService.filterString
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: string) => {
        this.dataSource.filterPredicate = (row: User, filter: string) => row.user.toLowerCase().includes(filter);
        this.dataSource.filter = value;
      });

    this.sharedService.filterValue
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((filtros: string) => {
        this.dataSource.filterPredicate = this.filterPredicate();
        this.dataSource.filter = filtros;
      });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadData() {
    this.service.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: User[]) => {
        this.dataSource.data = data;
        this.dataSource.data.forEach((u: User) => {
          this.selected.push(false);
        });
    });
  }

  filterPredicate(){
    return (row: User, filters: string) => {
      const filtros = JSON.parse(filters);
      const dtInclusion = moment(row.dtInclusion, 'DD-MM-YYYY');
      const dtModified = moment(row.dtModified, 'DD-MM-YYYY');
      const status = StatusEnum[row.status.toLowerCase()];

      const matchFilter = [];

      matchFilter.push(dtInclusion.isBetween(moment(filtros.inclusao.inicio), moment(filtros.inclusao.fim)));
      matchFilter.push(dtModified.isBetween(moment(filtros.alteracao.inicio), moment(filtros.alteracao.fim)));
      matchFilter.push(filtros.status === status || filtros.status === '3');

      return matchFilter.some(Boolean);
    };
  }

  showActions(event: any, row){
    let tr: HTMLElement = event.path[4];
    let td: HTMLElement = event.path[3];
    let tdArray = Array.from(td.children);

    if(tr.classList.contains('actions')){
      this.renderer.removeClass(tr, 'actions');
      this.renderer.removeStyle(td.children.item(td.children.length - 1), 'opacity');
    }
    else{
      this.renderer.addClass(tr, 'actions');
      this.renderer.setStyle(td.children.item(td.children.length - 1), 'opacity', 0.12);
    }

    this.selected[row.id - 1] = !this.selected[row.id - 1];
  }
}

enum StatusEnum {
  ativo = 1,
  inativo = 2
}
