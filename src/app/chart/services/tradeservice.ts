import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TradeService {

    constructor(private http: HttpClient) {}

    getOrderBook() {
        return this.http.get<any>('http://localhost:3000/history')
            .toPromise()
            .then(response =>  response)
            .then(data => data);
    }
}
