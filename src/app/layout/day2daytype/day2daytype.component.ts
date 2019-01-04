import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Http, Headers } from '@angular/http';

import {EnvironmentService} from '../../services/environment.service';



@Component({
  selector: 'app-day2daytype',
  templateUrl: './day2daytype.component.html',
  styleUrls: ['./day2daytype.component.scss']
})
export class Day2daytypeComponent implements OnInit {
  daytwoday_formtype: FormGroup;
  action_url = 'https://daytoday27081989.herokuapp.com/api/day2day/';
  

  constructor(
    private router: Router,
     private http: Http,
     public snackBar: MatSnackBar,
     public environment: EnvironmentService,
  ) { }

  ngOnInit() {
    this.environment.loaderdata = 'inactive';
    this.daytwoday_formtype = new FormGroup ({
      day2day_typename: new FormControl('',  [Validators.required,
                                    Validators.minLength(4),Validators.maxLength(20),
                                  ]),
        
      day2day_typedesc: new FormControl('', [Validators.required,
                                      Validators.minLength(6), Validators.maxLength(30),]),                           
    });
  }


  day2daytypeFormSubmit(formdata){
    this.environment.loaderdata = 'active';
    let array_daya: any[];

    array_daya = [{
      'type_name': formdata.day2day_typename,
      'user_note': formdata.day2day_typedesc,
    }];
    
      console.log(array_daya[0]);

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-auth-token', localStorage.getItem('authData'));

        this.http.post(this.action_url+'type/',array_daya[0],{ headers: headers }).subscribe(
          res =>{ console.log(res);
            this.environment.loaderdata = 'inactive';
            if(res.status == 200){
              
              this.snackBar.open('Data Saved Sucessfully...', 'OK', {
                duration: 10000,
              });
              this.router.navigate(['/day2dayinfo']);
            }

          },
          error=>{
            this.environment.loaderdata = 'inactive';
            console.log(error);
            this.snackBar.open(error._body, 'OK', {
              duration: 10000,
            });
          }
        );
  }




}
