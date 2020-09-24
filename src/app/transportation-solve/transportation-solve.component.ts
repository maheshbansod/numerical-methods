import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transportation-solve',
  templateUrl: './transportation-solve.component.html',
  styleUrls: ['./transportation-solve.component.css']
})
export class TransportationSolveComponent implements OnInit {

  constructor() { }

  table = [[2,7,4],[3,3,1],[5,4,7],[1,6,2]];
  demands = [7,9,18]
  supplys = [5,8,7,14];
  showsolution = false;
  solution = null;

  ngOnInit(): void {
  }

  findInitialSolution(method:String) {
    /**TODO: also check if problem is balanced */
    if(method == 'nwcr') {
      let demands = this.demands.map( (x)=>[x] );
      let supplys = this.supplys.map( (x)=>[x] );
      let weights = [...Array(this.table.length)].map( (x)=>Array(demands.length).fill(0) );

      console.log(weights);
      let i=0, j=0;
      while( i<supplys.length && j<demands.length) {
        if(supplys[i][0] < demands[j][0]) {
          weights[i][j]=supplys[i][0];
          demands[j].unshift(demands[j][0]-supplys[i][0]);
          supplys[i].unshift(0);
          i++;
        } else {
          weights[i][j] = demands[j][0];
          supplys[i].unshift(supplys[i][0]-demands[j][0]);
          demands[j].unshift(0);
          j++;
        }
      }
      this.solution = {weights:weights, supplys:supplys, demands:demands};
      this.showsolution = true;
      console.log("done",this.solution);
    }
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
