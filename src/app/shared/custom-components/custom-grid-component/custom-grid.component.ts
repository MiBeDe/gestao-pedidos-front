import { Component, input, OnInit, output } from '@angular/core';
import { CustomGridImports } from './custom-grid.imports';
import { TableColumns } from '../../../models';
import { PageEvent } from '@angular/material/paginator';
import { NgxMaskPipe } from 'ngx-mask';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-custom-grid-component',
  imports: [...CustomGridImports, NgxMaskPipe, CurrencyPipe],
  templateUrl: './custom-grid.component.html',
  styleUrl: './custom-grid.component.scss',
})
export class CustomGridComponent<T> implements OnInit{


  data = input.required<T[]>();
  keyFieldTrack = input.required<string>();
  columns = input.required<TableColumns<T>[]>();

  totalRegistros = input.required<number>();
  tamanhoPagina = input.required<number>();
  pageIndex = input.required<number>();

  page = output<PageEvent>();
  
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
   
  }

}
