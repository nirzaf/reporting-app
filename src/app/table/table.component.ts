import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LogRegisterService } from '../shared/log-register.service';
import {MatDialog} from "@angular/material/dialog";
import {ItemsComponent} from "../items/items.component";

export interface TableItem {
  Name : string;
  ItemCategory: string;
  DefaultPriceConcessionID: number;
  DefaultPriceConcessionName: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;

  itemData: TableItem[]=[];
  displayedColumns = ['name', 'category', 'price', 'action'];
  dataSource = new MatTableDataSource<TableItem>(this.itemData);

  constructor(private http:HttpClient,
              private logger:LogRegisterService,
              private dialog:MatDialog) {}
  ngOnInit(): void {
    this.getItemDetails();
  }

  getItemDetails(){
    let url = environment.baseUrl + 'items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active';
    this.logger.print("Get data url:" + url);
    this.http.get(url)
      .subscribe( (items:any) => {
        this.dataSource.data = items.Data as TableItem[]
        for(let c in this.dataSource.data) {
          this.logger.print("Data Source:", this.dataSource.data[c]);
        }
      });
  }

  viewPriceDetails(row:any) {
    this.logger.print( this.constructor.name + "=> ViewUser => row : ", row);
    const dialogRef = this.dialog.open(ItemsComponent, {
      data: {
        ConcessionID: row.DefaultPriceConcessionID
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getItemDetails();
    });
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
}
