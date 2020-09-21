import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simplex-solver-inputs',
  templateUrl: './simplex-solver-inputs.component.html',
  styleUrls: ['./simplex-solver-inputs.component.css']
})
export class SimplexSolverInputsComponent implements OnInit {

  costi = [0,0]; //Cost function coeffs
  otype = "max"; //maximization or minimization problem

  constmat = [{type:'=',coeffs:[0,0],b:0 }]; //constraint matrix lhs

  constructor() { }

  ngOnInit(): void {
  }

  addVariable() {
    this.costi.push(0);

    this.constmat.map((eqn)=>{
      eqn.coeffs.push(0);
    });
  }

  addConstraint() {
    this.constmat.push({type:'=',coeffs: Array(this.costi.length).fill(0), b:0});
  }

  removeVariable() {
    this.costi.pop();

    this.constmat.map((eqn)=>{
      eqn.coeffs.pop();
    });
  }

  removeConstraint() {
    this.constmat.pop();
  }

  trackBy(index: any, item: any) {
    return index;
  }

}
