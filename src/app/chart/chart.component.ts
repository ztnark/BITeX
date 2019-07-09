import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { TradeService } from './services/tradeservice';
import { Trade } from './domain/trade';


@Component({
    selector: 'app-chart',
    providers: [TradeService],
    template:
    ` <ejs-chart style='display:block;' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' >
        <e-series-collection>
            <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' name='SHIRPUR-G'> </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class ChartComponent implements OnInit {
    public primaryXAxis: Object;
    public title: string;
    public primaryYAxis: Object;
    public data = [];
    public enableSolidCandles: Object = { enable: true };

    constructor(private tradeService: TradeService) { }

    ngOnInit(): void {
        interval(1000)
            .pipe(
              startWith(0),
              switchMap(() => this.tradeService.getOrderBook())
            )
            .subscribe(trades => {
              console.log(trades);
              this.data = trades
            });
        // this.data = [
        //   { x: 'Jan', open: 120, high: 160, low: 100, close: 140 },
        //   { x: 'Feb', open: 150, high: 190, low: 130, close: 170 },
        //   { x: 'Mar', open: 130, high: 170, low: 110, close: 150 },
        //   { x: 'Apr', open: 160, high: 180, low: 120, close: 140 },
        //   { x: 'May', open: 150, high: 170, low: 110, close: 130 }
        //   ];
        this.primaryXAxis = {
            title: 'Date',
            valueType: 'Category',
            };
        this.primaryYAxis = {
            title: 'Price in Dollar'
            };
        this.title = 'Financial Analysis';
    }
}
