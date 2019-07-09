import { Component, OnInit, Input } from '@angular/core';
import { Order } from './domain/order';
import { DataService } from '../data.service';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";

export class OrderBook implements Order {
    constructor(public buyQty?, public buyPrice?, public sellQty?, public sellPrice?) {}
}

@Component({
    selector: 'app-order-book',
    templateUrl: './order-book.component.html',
    styleUrls: ['./order-book.component.css'],
    providers: [DataService]
})
export class OrderBookComponent implements OnInit {

    public asset: string;

    displayDialog: boolean;

    displayDetailsDialog: boolean;

    order: Order = new OrderBook();

    selectedOrder: Order;

    newOrder: boolean;

    orders: Order[];

    cols: any[];

    orderType: string = 'buy';

    constructor(private dataService: DataService) { }

    ngOnInit() {
        interval(1000)
          .pipe(
            startWith(0),
            switchMap(() => this.dataService.getOrderBook())
          )
          .subscribe(orders => this.orders = orders);
          
        this.dataService.currentAsset.subscribe(asset => this.asset = asset)

        this.cols = [
            { field: 'buyQty', header: 'Buy Qty' },
            { field: 'buyPrice', header: 'Buy Price' },
            { field: 'sellQty', header: 'Sell Qty' },
            { field: 'sellPrice', header: 'Sell Price' }
        ];

      }

    showDialogToAdd() {
        this.newOrder = true;
        this.order = new OrderBook();
        this.displayDialog = true;
    }

    save() {
        const orders = [...this.orders];
        if (this.newOrder) {
            orders.push(this.order);
        } else {
            orders[this.findSelectedOrderIndex()] = this.order;
        }
        this.orders = orders;
        this.order = null;
        this.displayDialog = false;
        this.displayDetailsDialog = false;
    }

    onRowSelect(event) {
        this.newOrder = false;
        this.order = {...event.data};
        this.displayDetailsDialog = true;
    }

    findSelectedOrderIndex(): number {
        return this.orders.indexOf(this.selectedOrder);
    }
}
