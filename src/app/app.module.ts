import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimplexSolverInputsComponent } from './simplex-solver-inputs/simplex-solver-inputs.component';
import { TransportationSolveComponent } from './transportation-solve/transportation-solve.component';

@NgModule({
  declarations: [
    AppComponent,
    SimplexSolverInputsComponent,
    TransportationSolveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
