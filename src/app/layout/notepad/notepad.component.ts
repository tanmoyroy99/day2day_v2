import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Http, Headers } from '@angular/http';

import {EnvironmentService} from '../../services/environment.service';


@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {
  action_url = 'https://daytoday27081989.herokuapp.com/api/notepad/'
  notepadDetails: FormGroup;
  constructor(
      private router: Router,
      private http: Http,
      public snackBar: MatSnackBar,
      public environment: EnvironmentService,
  ) {
    this.environment.loaderdata = 'inactive';
   }

  ngOnInit() {
    this.setNotepadForm();
    this.dataPopulated();
  }

  setNotepadForm(){
    this.notepadDetails= new FormGroup({
      notepadInfo: new FormControl('')
    })
  }
  dataPopulated(){
    this.environment.loaderdata = 'active';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('authData'));
    this.http.get(this.action_url+'view/',{ headers: headers }).subscribe(
      res =>{
        let info= res.json();
        this.notepadDetails.controls.notepadInfo.setValue(info[0].notepad);
      }
    );
    this.environment.loaderdata = 'inactive';
  }

  submitNotepadForm(){
    this.environment.loaderdata = 'active';
      let array_daya: any[];
      array_daya = [{
        'name': 'NotePad',
        'notepadInfo':this.notepadDetails.value.notepadInfo
      }];
    const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-token', localStorage.getItem('authData'));

      this.http.post(this.action_url+'add/',array_daya[0],{ headers: headers }).subscribe(
        res =>{ console.log(res);
          this.environment.loaderdata = 'inactive'; 
          if(res.status == 200){
            this.snackBar.open('Data Saved Sucessfully...', 'OK', { duration: 10000,});
          }
          this.environment.loaderdata = 'inactive';
        },
        error=>{
          this.environment.loaderdata = 'inactive'; 
          this.snackBar.open(error._body, 'OK', {
            duration: 10000,
          });
          this.environment.loaderdata = 'inactive';
        });
  }



}
