import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EqSystemComponent } from './eq-system/eq-system.component';
import { SimplexSolverInputsComponent } from './simplex-solver-inputs/simplex-solver-inputs.component';

@NgModule({
  declarations: [
    AppComponent,
    EqSystemComponent,
    SimplexSolverInputsComponent
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
