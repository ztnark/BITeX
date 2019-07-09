import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  symbols = environment.symbols
  // asset = "BTC/USD"

  // constructor(private data: DataService) { }

  ngOnInit() {
  //   this.data.currentAsset.subscribe(asset => this.asset = asset)
  }

}
