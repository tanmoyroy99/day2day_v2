import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,

    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule, 
    MatSlideToggleModule,  
    MatSnackBarModule,
    MatProgressBarModule
} from '@angular/material';

 

import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TranslateModule } from '@ngx-translate/core';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';

import { Day2dayinfoComponent } from './day2dayinfo/day2dayinfo.component';
import { Day2daytypeComponent } from './day2daytype/day2daytype.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        TranslateModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatAutocompleteModule,
        
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule, 
        MatSlideToggleModule,  
        MatSnackBarModule,
        MatProgressBarModule
    ],
    declarations: [LayoutComponent, NavComponent, TopnavComponent, SidebarComponent, Day2dayinfoComponent,Day2daytypeComponent]
})
export class LayoutModule {}
