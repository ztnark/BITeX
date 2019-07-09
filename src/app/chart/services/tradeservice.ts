import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trade } from '../domain/trade';

@Injectable()
export class TradeService {

    constructor(private http: HttpClient) {}

    getOrderBook() {
        return this.http.get<any>('http://localhost:3000/history')
            .toPromise()
            .then(response => <Trade[]> response)
            .then(data => data);
    }
}
