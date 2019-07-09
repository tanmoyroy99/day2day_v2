import 'rxjs/add/operator/do';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataInterceptor implements HttpInterceptor {
    constructor(){}
    intercept(request: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) =>{
            if(event instanceof HttpResponse){

            }
        }, (err: any)=>{
                if(err instanceof HttpErrorResponse){
                    console.log('HttpErrorResponse',err);
                }
        });

    }
}