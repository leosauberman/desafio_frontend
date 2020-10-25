import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  columns: string[] = ['checkbox', 'user', 'email', 'dtInclusion', 'dtModified', 'rules', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();
  selected = [];

  constructor(
    private service: UserService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getUsers().subscribe((data: User[]) => {
      this.dataSource.data = data;
      this.dataSource.data.forEach((u: User) => {
        this.selected.push(false);
      });
    });
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
