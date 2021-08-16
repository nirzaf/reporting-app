import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { WebService } from '../shared/web.service';

export interface TableItem {
  Name : string;
  ItemCategory: string;
  DefaultPriceConcessionID: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  //dataSource: TableDataSource;
  itemData: TableItem[] = [];
  source:any ;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'category', 'price'];

  constructor(private webService: WebService) {
    this.getItemDetails();
  }

  getItemDetails(){
    this.webService.commonMethod('items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active',
      null, 'GET')
      .subscribe( (data:any) => {
        if(data.succeeded){
          this.itemData = data.Data;
          let i=0;
          let items = data.data.map(function(a:any) {
            a.select = false;
            i++;
            return a;
          })
          this.source = new MatTableDataSource<TableItem>(items);
        }
      })}

  ngAfterViewInit(): void {
    this.table.dataSource = this.source;
  }
}
