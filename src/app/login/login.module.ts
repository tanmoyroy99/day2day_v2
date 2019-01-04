import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//import { CookieService, CookieOptions  } from 'angular2-cookie/services/cookies.service';
import { CookieService, CookieOptions  } from 'angular2-cookie';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule 
    ],
    providers: [CookieService ],
    declarations: [LoginComponent]
})
export class LoginModule {}
