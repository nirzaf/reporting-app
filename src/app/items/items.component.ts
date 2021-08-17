import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {TableItem} from "../table/table.component";
import {HttpClient} from "@angular/common/http";
import {LogRegisterService} from "../shared/log-register.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  constructor(private http:HttpClient,
              private logger:LogRegisterService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
  }

//   getPriceDetails(ConcessionID:any){
//     let url = environment.baseUrl + 'items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active';
//     this.logger.print("Get data url:" + url);
//     this.http.get(url)
//       .subscribe( (items:any) => {
//         this.dataSource.data = items.Data as TableItem[]
//         for(let c in this.dataSource.data) {
//           this.logger.print("Data Source:", this.dataSource.data[c]);
//         }
//       });
//   }
}
