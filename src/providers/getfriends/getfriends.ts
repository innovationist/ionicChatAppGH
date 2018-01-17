import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetfriendsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetfriendsProvider {


  friendslist: Observable<any>;

  constructor(public http: HttpClient) {
  }

  getUserList(){


    this.friendslist = this.http.get('http://localhost:28080/friendlist');

    return this.friendslist;
   
  }

}
