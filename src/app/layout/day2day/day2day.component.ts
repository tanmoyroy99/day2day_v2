import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { error } from 'protractor';
import {MatSnackBar} from '@angular/material';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';

import {EnvironmentService} from '../../services/environment.service';


export interface User {
  name: string;
}

export interface UserData {
  _id: string;
  user_id: string;
  datetime: any;
  status: string;
  system_note: string;
  user_note: string;
  day2dayPaymentType: string;
  day2day_info: string;
  day2day_amount: string;
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

        public daytwoday_form: FormGroup;
        action_url = 'https://daytoday27081989.herokuapp.com/api/day2day/';

        public daytwoday_type : Applications[];

        public userData : UserData[];


        day2day_info = new FormControl();
        
        options: any[]=[];


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
        
        this.http.get(this.action_url+'type/all/',{ headers: headers }).subscribe(
          res =>{ this.daytwoday_type = res.json() as Applications[]; this.environment.loaderdata = 'inactive'; }
        );

      }
       

      filteredOptions: Observable<any[]>;

     
 
    ngOnInit() {


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
     console.log(this.daytwoday_form);


      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-auth-token', localStorage.getItem('authData'));

      this.http.get(this.action_url+'info/alljoin/',{ headers: headers }).subscribe(
        res =>{ 
          this.userData = res.json() as UserData[];
          this.options=this.userData.map(o=>{return o.day2day_info});

        }
      );
      


      this.filteredOptions = this.daytwoday_form.controls['day2day_info'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
        
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


     

      private _filter(value: any): any[] {
        console.log(value);
        const filterValue = value.toLowerCase();
        
        //return this.options.filter(option => option.toLowerCase().includes(filterValue));
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
      }
  
 
}