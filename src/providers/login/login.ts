import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient, private localStorage: Storage) {
    console.log('Hello LoginProvider Provider');
  }

  login(email: string, password: string) {

    const dataLoad = {
      email: email,
      password: password
  };
    return this.http.post<any>('http://localhost:28080/login/', dataLoad)
        .map(user => {

          console.log('start server ' + user);
          console.log(user.error);
            // login successful if there's a jwt token in the response save it to local storage
            if(user.error !== true){

              const toDb = {
                token: user.token,
                username: user.user_details.username,
                userid: user.user_details._id
              }

              this.localStorage.set('user', toDb);
              
            }
          
            return user;
        });
}


}
