import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatButtonModule, MatSnackBarModule
} from '@angular/material';

import { Day2dayRoutingModule } from './day2day-routing.module'
import { Day2dayComponent } from './day2day.component';

@NgModule({
  imports: [ 
    CommonModule,
    HttpModule,
    Day2dayRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule, 
    MatCardModule, 
    MatCheckboxModule, 
    MatDatepickerModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatNativeDateModule, 
    MatRadioModule, 
    MatSelectModule,
    MatSliderModule, 
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule
  ],

  declarations: [Day2dayComponent] 
})
export class Day2dayModule { }
