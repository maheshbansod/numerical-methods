import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'numerical-methods';
  solver:String = 'transportation';
  
  setSolver(solver:String) {
    this.solver = solver;
  }
}
