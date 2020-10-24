import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  columns: string[] = ['checkbox', 'user', 'email', 'dtInclusion', 'dtModified', 'rules', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getUsers().subscribe((data: User[]) => {
      this.dataSource.data = data;
    });
  }
}
