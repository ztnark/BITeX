import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';


import { OrderBookComponent } from './order-book.component';

@NgModule({
    declarations: [
        OrderBookComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
    ],
    providers: [],
    bootstrap: [OrderBookComponent]
})
export class OrderBookModule { }
