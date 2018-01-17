import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DashboardPage } from '../dashboard/dashboard';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string;
  error: boolean;
  message:string;
  constructor(private loginPro: LoginProvider,private alertCtr: AlertController, private navCtr: NavController) {
  }

  onSubmit(form:NgForm){

    const email = form.value.email;
    const password = form.value.password;

    console.log(email + password);

    this.loginPro.login(email,password).subscribe(  
      data => {

        this.error = data.error;
        this.message = data.message;

        if(this.error !== true){
          this.username = data.user_details.username;

          this.alertNotification('Goto Dash Board', `welcome back ${this.username}`, 'Start Chatting', DashboardPage);

      }else{

        this.alertNotification('Failed',this.message, 'Login',null,'Create Account',RegisterPage);
      }
      }, err =>{

        if(err.statusText === "Unknown Error"){

          this.alertNotification('Sever Inactive','plesase make sure server is Up and Running', 'Ok');
       }
       });
     } 


  alertNotification(alertTitle:string , alertMessage:string , _button ?:string, pushPage?: any, _button2 ?:string, pushPage2?:any){

    if(_button2 === null || _button2 === ' ' || _button2 === undefined){

      let alert = this.alertCtr.create({
        title:alertTitle,
        message:alertMessage,
        buttons:[
          {
          text: _button,
          handler: () => {
            if(pushPage){

              this.navCtr.push(pushPage);

            }else{
              alert.dismiss;
            }
            
          }}
        ]
        
      });
      alert.present();
    }else{

      if(_button2){
        
        const _alert = this.alertCtr.create({
          title: alertTitle,
          message: alertMessage,
          buttons:[
            {
            text: _button,
            handler: () => {
              _alert.dismiss;
            }
          },
            {
              text: _button2,
              handler: () => {
                this.navCtr.push(pushPage2);
              }
            }
          ]
          
        });
     

        _alert.present();
      }
    }
   
  }
}


