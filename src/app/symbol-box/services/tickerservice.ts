import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../domain/order';

@Injectable()
export class OrderService {

    constructor(private http: HttpClient) {}

    getOrderBook() {
        return this.http.get<any>('http://localhost:3000/')
            .toPromise()
            .then(response => <Order[]> response.data)
            .then(data => data);
    }
}
