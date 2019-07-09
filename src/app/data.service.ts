import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('BTC/USD');

  currentAsset = this.messageSource.asObservable();

  constructor(private http: HttpClient) {}

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  getOrderBook(symbol) {
    return this.http.get<any>('http://localhost:3000/orderbook?symbol=' + symbol)
      .toPromise()
      .then(response => response.data)
      .then(data => data);
  }

  getTrades(symbol) {
    return this.http.get<any>('http://localhost:3000/history?symbol=' + symbol)
      .toPromise()
      .then(response =>  response)
      .then(data => data);
  }

  getTicker(symbol: string) {
    return this.http.get<any>('http://localhost:3000/ticker?symbol=' + symbol)
      .toPromise()
      .then(response => response)
      .then(data => data);
  }
}