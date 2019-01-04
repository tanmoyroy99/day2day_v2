import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthGuard implements CanActivate {
    action_url = 'https://daytoday27081989.herokuapp.com/api/users/me/';
    constructor(
        private router: Router,
        private http: Http,
    ) {}

    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-auth-token', localStorage.getItem('authData'));

            this.http.get(this.action_url,{ headers: headers }).toPromise().
            then(res=>{
                if(res.status != 200){
                    console.log(res);
                    return false;
                }
                    
                    //console.log(res.status);
            }).catch(
                err=>{
                    this.router.navigate(['/login']);
                    return false;
                }
            );
            return true;

        }
 
        this.router.navigate(['/login']);
        return false;
    }
}
