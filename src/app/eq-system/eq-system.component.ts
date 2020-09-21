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

  onChangeConstant(event) {
    let pos = Number(event.target.getAttribute('data-pos'));
    this.b[pos] = event.target.value;
  }

  onChangeCoeff(event) {
    let pos = event.target.getAttribute('data-pos');
    let [posi,posj]=pos.split(',');
    this.eqns[posi][posj]=Number(event.target.value);
  }

  ngOnInit(): void {
  }

  addEquation() {
    this.eqns.push(Array(this.eqns[0].length).fill(0));
    this.b.push(0);
  }

  addVariable() {
    this.eqns.map((eqn)=>{
      eqn.push(0);
    });
  }

  removeEquation() {
    /** TODO: add are you sure dialogue box? */
    this.eqns.pop();
    this.b.pop();
  }

  removeVariable() {
    /** TODO: add are you sure dialogue box? */
    this.eqns.map((eqn)=>{
      eqn.pop();
    });
  }

}
