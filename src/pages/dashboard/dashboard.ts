import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { GroupchatPage } from '../groupchat/groupchat';
import {Socket} from 'ng-socket-io';
import { Storage } from '@ionic/storage';
import { PrivatechatdashPage } from '../privatechatdash/privatechatdash';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage  {

 usernameFromDb = '';
  
  constructor(public navCtrl: NavController, private socket: Socket , public localStorage: Storage) {
  }
  

  onClickjoinGroupChat(){
    // connect to socket...
   this.socketIOConnectToGroup();
   // move to chat page
    this.navCtrl.push(GroupchatPage);
  }


  socketIOConnectToGroup(){
      // open connection to io socket server
    this.socket.connect();
  // send user name to socket server
    this.socket.emit('set-ion-username',{
      name: this.usernameFromDb
    });  
  }

  ionViewDidLoad(){
    // if page load get all data...
   this.localStorage.get('user').then((val) => {
     console.log(val);
     console.log('did get here');

     this.usernameFromDb = val.username;
   });  
  }



  openPrivateDashBoard(){
    this.navCtrl.push(PrivatechatdashPage);
  }
  
logout(){
  this.localStorage.clear();
  this.navCtrl.push(HomePage);

}

}
