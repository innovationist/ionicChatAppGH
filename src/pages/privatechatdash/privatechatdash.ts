import { GetfriendsProvider } from './../../providers/getfriends/getfriends';
import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PrivatechatPage } from '../privatechat/privatechat';

/**
 * Generated class for the PrivatechatdashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privatechatdash',
  templateUrl: 'privatechatdash.html',
})
export class PrivatechatdashPage implements OnInit{

usernameFromDb:string  = '';
usernameFromImputField:string = '';
friendsList: any = '';
selectedfriend: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private localStorage: Storage,private socket:Socket,private friendprov: GetfriendsProvider) {
  }

  ngOnInit(){
   this.populateFriendList ();
    this.startUpDb();

  }

  startUpDb(){

    this.localStorage.get('user').then((val) => {
      console.log(val);
  
      this.usernameFromDb = val.username;
      });
  }

  onClickStartPrivateChat(){
    this.socketIOConnectToPrivate();
    this.navCtrl.push(PrivatechatPage);
  }

  populateFriendList (){

   this.friendprov.getUserList().subscribe(data =>{
     
    this.friendsList = data.friendnames;
    console.log(data);
   });

     
  }

  socketIOConnectToPrivate(){
    // open connection to io socket server
  this.socket.connect();
// send user name to socket server
let joinfriend:string =  '';
if(this.selectedfriend){

  joinfriend = this.selectedfriend
  console.log(joinfriend);
}else{
  joinfriend = this.usernameFromImputField;
  console.log(joinfriend + '2');

}

  this.socket.emit('this-room',{
    name:joinfriend,
    sendersName:this.usernameFromDb
  });  
}
 

}
