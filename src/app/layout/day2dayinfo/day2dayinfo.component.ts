import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Http, Headers } from '@angular/http';
import {EnvironmentService} from '../../services/environment.service';
import {Observable} from 'rxjs';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
  info: string;
  _id: string;
  datetime: any;
  user_note: string;
  day2dayPaymentType: string;
  day2day_info: string;
  day2day_amount: string;
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
  
  animal: string;
  name: string;

  constructor(
    private http: Http,
    public environment: EnvironmentService,
    public dialog: MatDialog
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



  openDialog(rowdatainfo) {
    console.log(rowdatainfo);
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        id      : rowdatainfo._id,
        datetime: rowdatainfo.datetime,
        day2dayPaymentType: rowdatainfo.day2dayPaymentType.type_name,
        day2day_amount    : rowdatainfo.day2day_amount,
        day2day_info      : rowdatainfo.day2day_info,
        user_note         : rowdatainfo.user_note,
        animal: 'unicorn',
        info  : 'Hi Tanmoy'
      }
    });
  }

  

}




@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {} 
}




