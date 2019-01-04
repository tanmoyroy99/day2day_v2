import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Http, Headers } from '@angular/http';

import {EnvironmentService} from '../../services/environment.service';

import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators'
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";
 

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

 

@Component({
  selector: 'app-day2dayinfo',
  templateUrl: './day2dayinfo.component.html',
  styleUrls: ['./day2dayinfo.component.scss']
})
export class Day2dayinfoComponent implements OnInit {

 
  displayedColumns: string[] = ['id', 'date','name', 'amount', 'type'];
  dataSource: MatTableDataSource<UserData>;

  public daytwoday_type : UserData[];
  public data$: Observable<UserData[]>;

  test: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  action_url = 'https://daytoday27081989.herokuapp.com/api/day2day/';
  
  constructor(
    private http: Http,
    public environment: EnvironmentService,
  ) {
    
  }


  ngOnInit() {

    this.environment.loaderdata = 'active'; 
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('authData'));

    this.http.get(this.action_url+'info/alljoin/',{ headers: headers }).subscribe(
      res =>{
        this.daytwoday_type = res.json() as UserData[];
        
        var users = this.daytwoday_type.sort( (a,b) =>{
            return b.datetime - a.datetime;
            
        });
        

        this.dataSource = new MatTableDataSource(this.daytwoday_type);
        
        //console.log(this.daytwoday_type);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.environment.loaderdata = 'inactive'; 
      }
    );


    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    
  }

 


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  

}




