import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eq-system',
  templateUrl: './eq-system.component.html',
  styleUrls: ['./eq-system.component.css']
})
export class EqSystemComponent implements OnInit {

  /**
   * I'll represent the set of equations as a 2D array
   * eqns[i][j] : ith equation's jth coefficient
   */
  eqns = [[0,0],[0,0]];
  /**
   * constant vector
   */
  b = [0, 0];

  constructor() { }

  ngOnInit(): void {
  }

  addEquation() {
    this.eqns.push(Array(this.eqns[0].length).fill(0));
  }

  addVariable() {
    this.eqns.map((eqn)=>{
      eqn.push(0);
    });
  }

}
