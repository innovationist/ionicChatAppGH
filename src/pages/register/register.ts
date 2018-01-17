import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RegisterUserProvider } from './../../providers/register-user/register-user';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

 
  error: boolean;

  constructor (public regProv :RegisterUserProvider, private alertCtr:AlertController, public navCtr: NavController ){}
 
  ionViewDidLoad() {
   
  }

  // ng register from
  onSubmit(form: NgForm){

    const _username = form.value.userName;
    const _email = form.value.email;
    const _password = form.value.password;


    
    this.regProv.registerNewUser(_username,_email,_password).subscribe((result) =>{


     
      this.error = result.error;
      let message = result.message;

      console.log(' tell me yes');

      
      if(this.error !== true){
        let username = result.user_details.username;


        this.alertNotification('Goto Dash Board', `welcome ${username}`, 'Start Chatting', DashboardPage);

      }else{
        this.alertNotification('Failed',message, 'Login',null,'Create Account',RegisterPage);

      }

    },err => {



      if(err.statusText === "Unknown Error"){

        this.alertNotification('Sever Inactive','plesase make sure server is Up and Running', 'Ok');
     }
    
    });
   
  }


  // alert notification builder

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



