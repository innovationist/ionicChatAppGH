import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AddfriendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddfriendProvider {

  constructor(public http: HttpClient) {
  }

  addfriend(friendsName:string, friendid: string){

    const dataLoad = {
      id: friendid,
      friendname: friendsName
     
  };

  return this.http.post<any>('http://localhost:28080/addfriend/', dataLoad)
  .map(user => {

    console.log(user.error);
      // login successful if there's a jwt token in the response save it to local storage
      if(user.error !== true){
       
        
      }else{
        console.log(user)
      }
    
      return user;
  });


  }
}
