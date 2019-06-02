import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
constructor(
    public snackBar: MatSnackBar,
) {}
base_url= 'https://daytoday27081989.herokuapp.com/api/auth/';
loaderdata: string = 'active';

  snackBarError(massage, acion='Ok'){
    this.snackBar.open(massage, acion, {
      duration: 1000000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass:'errorMessage'
    });
  }

  snackBarSucess(massage, acion='Ok'){
    this.snackBar.open(massage, acion, {
      duration: 10000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass:'sucessMessage'
    });
  }
}
