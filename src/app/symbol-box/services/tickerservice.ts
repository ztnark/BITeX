import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticker } from '../domain/ticker';

@Injectable()
export class TickerService {

    constructor(private http: HttpClient) {}

    getTicker(symbol: string) {
        return this.http.get<any>('http://localhost:3000/ticker?symbol=' + symbol)
            .toPromise()
            .then(response => response)
            .then(data => data);
    }
}
