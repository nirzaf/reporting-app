import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogRegisterService } from './log-register.service';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(private http: HttpClient, private logger: LogRegisterService) {}

  commonMethod(url: string, data: any, method?: string): any {
    method = method ? method : 'POST';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    let endPoint = environment.baseUrl + url;
    if (data != null) {
      this.logger.print(
        'Method Name : Common Method : API Request End Point => ' + endPoint,
        data
      );
    } else {
      this.logger.print(
        'Method Name : Common Method : API Request End Point => ',
        endPoint
      );
    }
    if (method == 'POST') {
      this.logger.print('POST URL :' + endPoint, data);
      return this.http.post(endPoint, data, { headers });
    } else if (method == 'GET') {
      this.logger.print('GET URL :' + endPoint, headers);
      return this.http.get(endPoint, { headers });
    } else if (method == 'PUT') {
      this.logger.print('PUT URL :' + endPoint, data);
      return this.http.put(endPoint, data, { headers });
    } else if (method == 'DELETE') {
      const options = {
        headers: headers,
        body: data,
      };
      this.logger.print('DELETE URL :' + endPoint, data);
      return this.http.delete(endPoint, options);
    }
  }

  baseURL(): string {
    return environment.baseUrl;
  }
}
