import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimplexSolverService {

  constructor() { }

  costi = [8,5]; //Cost function coeffs
  otype = "max"; //maximization or minimization problem
  status = 'idle';

  constmat = [
              {type:'<',coeffs:[2,1],b:500 },
              {type:'<',coeffs:[1,0],b:150 },
              {type:'<',coeffs:[0,1],b:250}
            ]; //constraint matrix

  soff = -1; //slack variables offset
  sn = 0; //no. of slack variables
  aoff = -1; //artificial variables offset
  an = 0; //no. of artificial variables
  
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
    let off, n;
    if(vtype == 's') {
      off = this.soff;
      n = this.sn++;
    } else {
      off = this.aoff;
      n = this.an++;
    }
      if(off != -1) {
        this.costi.splice(off+n-1,0,(vtype=='s')?0:this.bigM);
        this.constmat.map( (c)=>c.coeffs.splice(off+n-1, 0,0) );
        // console.log('index:',off+n-1, vtype);
      } else {
        if(vtype == 's') {
          this.soff = this.costi.length;
          this.costi.push(0);
        }
        else {
          this.aoff = this.costi.length;
          this.costi.push(this.bigM);
        }
        this.constmat.map( (c)=>c.coeffs.push(0) );
      }
      return off+n-1;
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
    return {basis: basis, b: this.constmat.map( (c)=>c.b )};
  }
}
