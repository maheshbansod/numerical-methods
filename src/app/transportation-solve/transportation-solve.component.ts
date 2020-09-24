import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transportation-solve',
  templateUrl: './transportation-solve.component.html',
  styleUrls: ['./transportation-solve.component.css']
})
export class TransportationSolveComponent implements OnInit {

  constructor() { }

  table = [[0,0],[0,0]];
  demands = [0,0]
  supplys = [0,0];

  ngOnInit(): void {
  }

  addSource() {
    this.table.push(Array(this.demands.length).fill(0));
    this.supplys.push(0);
  }
  addDestination() {
    this.table.map( (x)=>x.push(0) );
    this.demands.push(0);
  }

  removeSource() {
    this.table.pop();
    this.supplys.pop();
  }

  removeDestination() {
    this.table.map( (x)=>x.pop() );
    this.demands.pop();
  }

  trackBy(index: any, item: any) {
    return index;
  }

}
