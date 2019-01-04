import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
base_url= 'https://daytoday27081989.herokuapp.com/api/auth/';
loaderdata: string = 'active';

  constructor() {

   }
}
