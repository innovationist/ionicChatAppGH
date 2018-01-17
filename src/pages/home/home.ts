import { Component } from '@angular/core';
import { LoginPage } from './../login/login';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private localStorage: Storage){}

loginPage = LoginPage;

registerPage = RegisterPage;

ionViewDidLoad(){
 this.localStorage.clear();
}

}
