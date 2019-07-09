import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {

  asset = 'BTC/USD';

  @Output() change: EventEmitter<string> = new EventEmitter();

  changeAsset(asset) {
    this.change.emit(asset);
  }
  
  constructor(private http: HttpClient) {}

  getOrderBook() {
    return this.http.get<any>('http://localhost:3000/')
      .toPromise()
      .then(response => response.data)
      .then(data => data);
  }

  getTrades() {
    return this.http.get<any>('http://localhost:3000/history')
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