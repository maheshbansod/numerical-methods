import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimplexSolverService {

  constructor() { }

  costi = [8,5,0,0,0]; //Cost function coeffs
  otype = "max"; //maximization or minimization problem
  status = 'idle';

  constmat = [
              {type:'=',coeffs:[2,1,1,0,0],b:500 },
              {type:'=',coeffs:[1,0,0,1,0],b:150 },
              {type:'=',coeffs:[0,1,0,0,1],b:250}
            ]; //constraint matrix

  set(otype, costi, constmat) {
    this.otype = otype;
    this.costi = costi.map((x)=>x);
    this.constmat = constmat.map((x)=> {return {type:x.type,coeffs: x.coeffs.map((xx)=>xx),b:x.b}});
  }

  getCostCoeffs() {
    return this.costi;
  }
  
  getOptimizationType() {
    return this.otype;
  }

  getConstraintsMatrix() {
    return this.constmat;
  }

  getStatus() {
    return this.status;
  }

  solve() {
    //solve for max problem with all = constraints only with slack variables already added.
    //TODO: convert problem by adding slack variables, etc and changing all constraints to = whenvever necessary

    /*the last `n` variables are put in the basis first*/
    let basis = [...Array(this.constmat.length).keys()].map((x)=>x+this.costi.length - this.constmat.length);
    while(1) {
      let mind = Infinity;
      let ev = 0;
      for(var j=0;j<this.constmat[0].coeffs.length;j++) {
        let d = 0;
        for(var i=0;i<this.constmat.length;i++) {
          d += this.costi[basis[i]]*this.constmat[i].coeffs[j];
        }
        d -= this.costi[j];
        if(mind > d) {
          mind = d;
          ev = j;
        }
      }

      if(mind >= 0)
        break;
      
      let minr = Infinity,lv=0;
      for(var i=0;i<this.constmat.length;i++) {
        let r:Number;
        if(this.constmat[i].coeffs[ev] == 0)
          continue;
        r = this.constmat[i].b/this.constmat[i].coeffs[ev];
        if(r < 0)
          continue;
        if(minr > r) {
          r = minr;
          lv = i;
        }
      }
      //if minr is infinity then stop

      //Pivot element is at ev,lv

      console.log('pivot',ev,lv);

      basis[lv] = ev;
      for(var i=0;i<this.costi.length;i++) {
        this.constmat[lv].coeffs[i] /= this.constmat[lv][ev];
      }
      for(var i=0;i<this.constmat.length;i++) {
        if(i == lv)
          continue;
        let f = this.constmat[i].coeffs[ev];
        for(var j=0;j<this.costi.length;j++) {
          this.constmat[i].coeffs[j] -= this.constmat[lv].coeffs[j]*f;
        }
      }
      console.log(basis);
      console.log(this.constmat);
    }
  }
}
