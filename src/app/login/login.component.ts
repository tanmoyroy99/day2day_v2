import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { tokenKey } from '@angular/core/src/view';
import {MatSnackBar} from '@angular/material';
import { CookieService } from 'angular2-cookie/core';
import {EnvironmentService} from '../services/environment.service';
import {action_URL} from '../services/constant'



  
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(
        private router: Router,
        private http: Http,
        public snackBar: MatSnackBar,
        private _cookieService:CookieService,
        public environment: EnvironmentService,
    ) {}
    loginform: FormGroup;
    login_url= action_URL.login_url;
    token_value: any;
    datausername : any;

 
    ngOnInit() {
        this.environment.loaderdata = 'inactive';
        
        this.datausername = this._cookieService.get('username');

        this.loginform = new FormGroup ({
            user_name: new FormControl(this.datausername,  [Validators.required,
                                        Validators.minLength(4),
                                      ]),
            password: new FormControl('', [Validators.required,
                                          Validators.minLength(4)]),
			remember_me: new FormControl('true'),
        });

    }

    onLogin(user_details) {
        this.environment.loaderdata = 'active';
        console.log(user_details);
        let post_request = '{"emailId:"'+user_details.user_name+'","password":"'+user_details.password+'"}';
        
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        this.http.post(this.login_url,'{"emailId":"'+user_details.user_name+'","password":"'+user_details.password+'"}',{ headers: headers }).subscribe(
            res=>{
                this.environment.loaderdata = 'inactive';
                //console.log(res);
                if(res.status == 200){
                    //console.log(res.); 
                    if(user_details.remember_me){
                        this._cookieService.put('username', user_details.user_name);
                    }
                    this.token_value= res;
                    localStorage.setItem('authData',this.token_value._body); 
                    localStorage.setItem('isLoggedin', 'true'); 
                    this.router.navigate(['/dashboard']);
                    
                }else if(res.status == 400){
                    
                    console.log(res.text);
                }else{
                    
                    console.log(res.status, res.text);
                }
            },
            error=>{
                this.environment.loaderdata = 'inactive';
                if(error.status == 400){
                    this.environment.snackBarError(error._body, 'Ok');
                    
                }else{
                    this.environment.snackBarError('OOPS! something went wrong Day2daY', 'Ok');
                }
               console.log(error);
        });



    }


     



}
