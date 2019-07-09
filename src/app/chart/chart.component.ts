import { Component, OnInit, Input } from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { DataService } from '../data.service';

@Component({
    selector: 'app-chart',
    template:
    ` <ejs-chart style='display:block;' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='asset' >
        <e-series-collection>
            <e-series [dataSource]='trades' type='Candle' xName='x' high='high' low='low' open='open' close='close' name='SHIRPUR-G'> </e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class ChartComponent implements OnInit {

    public asset: string;
    public primaryXAxis: Object;
    public title: string;
    public primaryYAxis: Object;
    public trades = [];
    public enableSolidCandles: Object = { enable: true };

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        interval(1000)
            .pipe(
              startWith(0),
              switchMap(() => this.dataService.getTrades())
            )
            .subscribe(trades => this.trades = trades);
        
          this.dataService.change.subscribe(asset => {
            this.asset = asset;
          });

        this.primaryXAxis = {
            title: 'Date',
            valueType: 'Category',
            };
        this.primaryYAxis = {
            title: '$'
            };
    }
}
