import { Component, OnInit, Input, SimpleChanges, SimpleChange} from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { DataService } from "../data.service";


@Component({
  selector: 'app-symbol-box',
  templateUrl: './symbol-box.component.html',
  styleUrls: ['./symbol-box.component.scss']
})
export class SymbolBoxComponent implements OnInit {

    @Input() name: string;
    @Input() index: number;

    public asset: string;
    public ticker: number;
    public active = false;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        if( this.index === 0){
            this.active = true
        }
        interval(1000)
        .pipe(
            startWith(0),
            switchMap(() => this.dataService.getTicker(this.name))
        )
        .subscribe(ticker => this.ticker = ticker.last)

        this.dataService.currentAsset.subscribe(asset =>{ 
            if(asset !== this.name){ this.active = false}
            this.asset = asset 
        })
    }

    onClick() {
        this.active = true
        this.dataService.changeMessage(this.name)
    }
}
