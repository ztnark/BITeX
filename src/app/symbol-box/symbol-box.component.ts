import { Component, OnInit, Input } from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { TickerService } from './services/tickerservice';
import { Ticker } from './domain/ticker';


@Component({
  selector: 'app-symbol-box',
  templateUrl: './symbol-box.component.html',
  styleUrls: ['./symbol-box.component.scss']
})
export class SymbolBoxComponent implements OnInit {

  @Input() name: string;
  @Input() index: number;

  ticker: Ticker;

  active = false

  constructor(private tickerService: TickerService) { }

  ngOnInit() {
    if( this.index === 0){
      this.active = true
    }
      interval(1000)
        .pipe(
          startWith(0),
          switchMap(() => this.tickerService.getTicker(name))
        )
        .subscribe(ticker => this.ticker = ticker);

  }

}
