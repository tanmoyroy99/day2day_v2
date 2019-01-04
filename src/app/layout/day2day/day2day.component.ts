import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { error } from 'protractor';
import {MatSnackBar} from '@angular/material';

import {EnvironmentService} from '../../services/environment.service';


export interface User {
  name: string;
}

interface Applications {
  _id: string;
  user_id: string;
  datetime: string;
  status: string;
  system_note: string;
  type_name: string;
  user_note: string;
  }

@Component({
  selector: 'app-day2day',
  templateUrl: './day2day.component.html',
  styleUrls: ['./day2day.component.scss']
})
export class Day2dayComponent implements OnInit {

        daytwoday_form: FormGroup;
        action_url = 'https://daytoday27081989.herokuapp.com/api/day2day/';

        public daytwoday_type : Applications[];
        constructor(
          private router: Router,
          private http: Http,
          public snackBar: MatSnackBar,
          public environment: EnvironmentService,
      ) {
        this.environment.loaderdata = 'active'; 
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-token', localStorage.getItem('authData'));
        console.log(headers);
        this.http.get(this.action_url+'type/all/',{ headers: headers }).subscribe(
          res =>{ this.daytwoday_type = res.json() as Applications[]; this.environment.loaderdata = 'inactive'; }
        );
      }
      
    
      day2day_info = new FormControl();
      options: User[] = [
        {name: 'Mary' },
        {name: '7Igor'},
      ];
      filteredOptions: Observable<User[]>;
 
    ngOnInit() {
//console.log(localStorage.getItem('authData'));

        this.daytwoday_form = new FormGroup ({
           day2day_info: new FormControl('',  [Validators.required,
                                        Validators.minLength(3),Validators.maxLength(20),
                                      ]),
            day2day_amount: new FormControl('', [Validators.required,
                                          Validators.minLength(2),Validators.maxLength(10),Validators.pattern("^[0-9.]{1,8}$") ]),
            user_note: new FormControl('', [Validators.required,
                                          Validators.minLength(6), Validators.maxLength(160),]),
            day2day_type: new FormControl('', [Validators.required,]), 
            datapicker: new FormControl((new Date()).toISOString(), [Validators.required,]),
                                          
                                          
        });

        this.filteredOptions = this.day2day_info.valueChanges
          .pipe(
            startWith<string | User>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.options.slice())
          );

    }

    day2dayFormSubmit(formdata){
      this.environment.loaderdata = 'active'; 
      console.log(formdata);
      let array_daya: any[];

      var day2day_info_new =  formdata.day2day_info.name !== undefined? formdata.day2day_info.name : formdata.day2day_info ;
      var datetime= new Date(formdata.datapicker).getTime();

      array_daya = [{
        'day2day_info': day2day_info_new,
        'day2day_amount': formdata.day2day_amount,
        'day2dayPaymentType': formdata.day2day_type,
        'user_note': formdata.user_note,
        'datetime': datetime.toString(),
      }];
      
      console.log(array_daya[0]);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-token', localStorage.getItem('authData'));

      this.http.post(this.action_url+'info/',array_daya[0],{ headers: headers }).subscribe(
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
          this.snackBar.open(error._body, 'OK', {
            duration: 10000,
          });
          console.log(error);
        }
      );



    }


      displayFn(user?: User): string | undefined {
        return user ? user.name : undefined;
      }

      private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();
          console.log(filterValue);
        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
      }
  
 
}