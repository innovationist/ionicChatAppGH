import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AddfriendProvider } from './../../providers/addfriend/addfriend';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';




/**
 * Generated class for the OnlineuserlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onlineuserlist',
  templateUrl: 'onlineuserlist.html',
})
export class OnlineuserlistPage {

  onlineUsers = [];
  friendId = "5a5e3001795fa5321bbc4c4c";
  constructor(public navParams: NavParams, public viewCtr: ViewController, private addfriendProv : AddfriendProvider, private toastNotify: ToastController) {
  }

  ionViewDidLoad(){
   
    this.onlineUsers = this.navParams.data;
    console.log(this.navParams.data);
    console.log(this.onlineUsers[0]);
    console.log(this.onlineUsers[0].username);


  }

  onClickAddToFriend(friendname:string, friendsId= this.friendId){

    this.addfriendProv.addfriend(friendname, friendsId).subscribe(
      data => {

        console.log(data);

        if(data.error === false ){

          this.toastNotification(data.message)
          this.clearModal()

        }else{

          this.toastNotification(data.message);
        }
        

      });
  }

 
  clearModal(){
    this.viewCtr.dismiss();
    console.log('its gone');
  }

  toastNotification(notificationMessage){
    let toast = this.toastNotify.create({
      message:notificationMessage,
      duration:3000,
      position:'middle'
    });
    toast.present();
  }

}
