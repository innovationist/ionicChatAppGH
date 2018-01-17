import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the RegisterUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterUserProvider {

 
  constructor(public http: HttpClient,private localStorage: Storage) {
    console.log('Hello RequestHandlerProvider Provider');
  }

  apiUrl = 'http://localhost:28080/addnewuser';
  _payload = {};




  registerNewUser2(username: string, email: string, password: any) {

    const dataLoad = {
      username: username,
      email: email,
      password: password
  };
    return this.http.post<any>('http://localhost:28080/addnewuser', dataLoad)
        .map(user => {
            // login successful if there's a jwt token in the response save it to local storage
            if(user){

              const toDb = {
                token: user.token,
                username: user.user_details.username
              }

              this.localStorage.set('user', toDb);
              
            }
          
            return user;
        });
}

registerNewUser(username: string, email: string, password: string) {

  const dataLoad = {
    username: username,
    email: email,
    password: password
};
  return this.http.post<any>('http://localhost:28080/addnewuser', dataLoad)
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
