import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimplexSolverService {

  constructor() { }

  costi = [-5,-10]; //Cost function coeffs
  otype = "max"; //maximization or minimization problem
  status = 'idle';

  constmat = [
              {type:'=',coeffs:[1,1],b:5 },
              {type:'<',coeffs:[1,0],b:4 },
              {type:'>',coeffs:[0,1],b:2}
            ]; //constraint matrix

  sstart = -1; // start of slack/surplus variables
  astart = -1; // start of artificial variables = also end of slack/surplus vars
  
  bigM = 999999;

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

  addVariable(vtype) {
    let i=-1;
    if(vtype == 's') {
      if(this.sstart == -1) {
        this.sstart = this.astart = i = this.costi.length;
        this.costi.push(0);
      } else {
        i = ++this.astart-1
        this.costi.splice(i,0,0);
      }
    } else {
      i = this.costi.length;
      this.costi.push(-this.bigM);
    }
    return i;//return index
  }

  solve() {
    //solve for max problem with all = constraints only with slack variables already added.
    //TODO: convert problem by adding slack variables, etc and changing all constraints to = whenvever necessary

    for(var i=0;i<this.constmat.length;i++) {
      if(this.constmat[i].type == '<') { //add slack
        let si = this.addVariable('s');
        this.constmat[i].type = '=';
        this.constmat[i].coeffs[si] = 1;
      } else if(this.constmat[i].type == '>' || this.constmat[i].type == '=') { //add slack and artificial
        let si = this.addVariable('s');
        let ai = this.addVariable('a');
        this.constmat[i].coeffs[ai] = 1;
        this.constmat[i].coeffs[si] = -1;
        if(this.constmat[i].type == '=') {
          console.log("ayy");
          this.constmat.push({type:'<',coeffs: this.constmat[i].coeffs.map((x)=>x), b:this.constmat[i].b});
        }
        this.constmat[i].type = '=';
      }
    }
    console.log(this.constmat);
    console.log(this.costi);
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
        let r;
        if(this.constmat[i].coeffs[ev] == 0)
          continue;
        r = this.constmat[i].b/this.constmat[i].coeffs[ev];
        if(r < 0)
          continue;
        if(minr > r) {
          minr = r;
          lv = i;
        }
      }
      //console.log(minr, lv)
      //if minr is infinity then stop

      //Pivot element is at ev,lv

      //console.log('pivot',ev,lv);

      basis[lv] = ev;
      this.constmat[lv].b /= this.constmat[lv].coeffs[ev];
      for(var i=0;i<this.costi.length;i++) {
        this.constmat[lv].coeffs[i] /= this.constmat[lv].coeffs[ev];
      }
      for(var i=0;i<this.constmat.length;i++) {
        if(i == lv)
          continue;
        let f = this.constmat[i].coeffs[ev];
        if(f == 0)
          continue;
        // console.log(this.constmat[i].b,'-',this.constmat[lv].b,'*',f);
        this.constmat[i].b -= this.constmat[lv].b*f;
        // console.log('=',this.constmat[i].b);
        for(var j=0;j<this.costi.length;j++) {
          // console.log(this.constmat[i].coeffs[j], '-', this.constmat[lv].coeffs[j],'*',f);
          this.constmat[i].coeffs[j] -= this.constmat[lv].coeffs[j]*f;
          // console.log(this.constmat[i].coeffs[j]);
        }
      }
      //console.log(basis);
      //console.log(this.constmat);
    }
    let soln = {basis: [],b:[]}
    
    basis.forEach((x,i)=>{
      if(x<this.sstart) {
        soln.basis.push(x);
        soln.b.push(this.constmat[i].b);
      }
    });
    return soln;
  }
}
