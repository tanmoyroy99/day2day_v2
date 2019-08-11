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
  }

  setNotepadForm(){
  this.notepadDetails= new FormGroup({
    notepadInfo: new FormControl('')
  })

  }

}
