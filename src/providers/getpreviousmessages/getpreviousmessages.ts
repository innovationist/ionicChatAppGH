import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

/*
  Generated class for the GetpreviousmessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetpreviousmessagesProvider {

  getOldGroupMessage: Observable<any>;
  getOldPrivateMessage : Observable<any>;

  headersTokenFromLogin:any  = '';
  

  
  constructor(public http: HttpClient, private localStorage: Storage) {
    this.getHeaderFromDb();
  }

  
  GetOldGroupMessage(){

    
    this.getOldGroupMessage = this.http.get('http://localhost:28080/getsavedgroupmessage');
    
    return this.getOldGroupMessage;
   
  }

  GetOldPrivateMessage(){

    console.log('header from db'+this.headersTokenFromLogin);
    
    let headers = new HttpHeaders();
    headers = headers.set('authorization',this.headersTokenFromLogin).set('Content-Type', 'application/x-www-form-urlencoded');
//authorization
   
    console.log(headers);

    this.getOldPrivateMessage = this.http.get('http://localhost:28080/getsavedprivatemessage',{headers:headers});

    return this.getOldPrivateMessage;
   
  }

  getHeaderFromDb(){
    this.localStorage.get('user').then((val) => {
      console.log(val);
  
      this.headersTokenFromLogin = val.token;
      });
  }
}
