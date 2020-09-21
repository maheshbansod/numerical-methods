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

  onCostChange(event) {
    let pos = Number(event.target.getAttribute('data-pos'));
    this.costi[pos] = Number(event.target.value);
  }

  onConstraintCoeffChange(event) {
    let pos = event.target.getAttribute('data-pos');
    let [i,j] = pos.split(',');
    this.constmat[i].coeffs[j]=Number(event.target.value);
  }

  onConstraintConstChange(event) {
    let pos = event.target.getAttribute('data-pos');
    this.constmat[pos].b = Number(event.target.value);
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

}
