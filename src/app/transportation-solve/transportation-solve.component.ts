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

}
