import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http:HttpClient) { }

   //fetch data from api
   getItemDetails():Observable<any[]> {
      return this.http.get( environment.baseUrl +'items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active')
      .pipe(
        map((items:any)=>{
          return items;
        }),catchError(error=>{
          return throwError(error);
        }
      )
   }

}
