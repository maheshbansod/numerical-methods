import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

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
    } else if(method == 'vam') { //vogel's approximation method
      let penaltys = [];
      let penaltyd = [];
      let table = this.table.map( (x)=>x.map(x=>x) );
      let i=0,j=0, it=0,fm, sm, dops=true, dopd=true;
      while(1) {
        penaltys.push([]);
        if(dops) {
          for(i=0;i<supplys.length;i++) {
            [fm, sm] = table[i].slice().sort( (a,b)=>a-b).slice(0,2);
            if(isFinite(fm) && isFinite(sm))
              penaltys[it].push( sm - fm );
            else if(isFinite(fm)) {
              penaltys[it].push(fm);
            } else {
              penaltys[it].push(-Infinity);
            }
          }
        }

        penaltyd.push([]);
        if(dopd) {
          for(i=0;i<demands.length;i++) {
            [fm, sm] = table.map( (r)=>r[i] ).sort( (a,b)=>a-b ).slice(0,2);
            if(isFinite(fm) && isFinite(sm))
              penaltyd[it].push( sm - fm );
            else if(isFinite(fm)) {
              penaltyd[it].push(fm);
            } else
              penaltyd[it].push(-Infinity);
          }
        }

        let maxps = Math.max(...penaltys[it]);
        let maxpd = Math.max(...penaltyd[it]);

        if(!isFinite(-maxps) && !isFinite(-maxpd))
          break;
        let mini = 0; //index of cost of minimum
        if(maxps < maxpd) {
          let pi = penaltyd[it].indexOf(maxpd);
          for(i=1;i<supplys.length;i++)
            if(table[i][pi] < table[mini][pi]) {
              mini = i;
            }
          i=mini;
          j=pi;
        } else {
          let pi = penaltys[it].indexOf(maxps);
          for(i=1;i<demands.length;i++)
            if(table[pi][i] < table[pi][mini]) {
              mini = i;
            }
          i = pi;
          j = mini;
        }
        if(supplys[i][0] < demands[j][0]) {
          weights[i][j]=supplys[i][0];
          demands[j].unshift(demands[j][0]-supplys[i][0]);
          supplys[i].unshift(0);
          mini = i;
          dopd = true; dops = false;
          for(i=0;i<table[0].length;i++)
            table[mini][i] = Infinity;
        } else {
          weights[i][j] = demands[j][0];
          supplys[i].unshift(supplys[i][0]-demands[j][0]);
          demands[j].unshift(0);
          mini = j;
          dopd = false; dops = true;
          for(i=0;i<table.length;i++)
            table[i][mini] = Infinity;
        }

        it++;
      }
      console.log(penaltys, penaltyd);
      penaltys = penaltys.filter((x)=>x.length >0).map( (r)=>r.map( (x)=>(x==-Infinity)?"-":x) );
      penaltyd = penaltyd.filter((x)=>x.length >0).map( (r)=>r.map( (x)=>(x==-Infinity)?"-":x) );

      this.solution = {weights:weights, supplys:supplys, demands: demands, 
        penaltys:penaltys, penaltyd: penaltyd
      };
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
