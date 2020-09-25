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
    let demands = this.demands.map( (x)=>[x] );
    let supplys = this.supplys.map( (x)=>[x] );
    let weights = [...Array(this.table.length)].map( (x)=>Array(demands.length).fill(0) );
    /**TODO: also check if problem is balanced */
    if(method == 'nwcr') { //north west corner rule
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
      //console.log("done",this.solution);
    } else if(method == 'lcm') { //least cost method
      let i=0,j=0,mini, minj, min=Infinity;
      let table = this.table.map( (x)=>x.map(x=>x) );
      while(1) {
        min = Infinity;
        for(i=0;i<table.length;i++) {
          for(j=0;j<table[0].length;j++) {
            if(table[i][j] < min) {
              min = table[i][j];
              mini = i;
              minj = j;
            }
          }
        }
        if(!isFinite(min))
          break;
        i = mini;
        j = minj;
        if(supplys[i][0] < demands[j][0]) {
          weights[i][j]=supplys[i][0];
          demands[j].unshift(demands[j][0]-supplys[i][0]);
          supplys[i].unshift(0);
          for(i=0;i<table[0].length;i++)
            table[mini][i] = Infinity;
        } else {
          weights[i][j] = demands[j][0];
          supplys[i].unshift(supplys[i][0]-demands[j][0]);
          demands[j].unshift(0);
          for(i=0;i<table.length;i++)
            table[i][minj] = Infinity;
        }
      }

      this.solution = {weights:weights, supplys: supplys, demands:demands};
      this.showsolution = true;
    }
  }

  getCost(table, weights) {
    let cost = 0;
    for(let i=0;i<table.length;i++) {
      for(let j=0;j<table[0].length;j++) {
        cost += table[i][j]*weights[i][j];
      }
    }
    return cost;
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
