import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filtros: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.filtros = this.fb.group({
      inclusao: this.fb.group({
        inicio: [null],
        fim: [null]
      }),
      alteracao: this.fb.group({
        inicio: [null],
        fim: [null]
      }),
      status: [3]
    });
  }

  toggleFilter() {
    this.sharedService.filterToggle.next();
  }

  applyFilters() {
    this.sharedService.filterValue.next(JSON.stringify(this.filtros.value));
  }

  cleanFilters(){
    this.filtros.reset();
    this.filtros.markAsUntouched();
    this.sharedService.filterValue.next(null);
  }
}
