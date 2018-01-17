import { Socket } from 'ng-socket-io';
import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { GetpreviousmessagesProvider } from '../../providers/getpreviousmessages/getpreviousmessages';


/**
 * Generated class for the PrivatechatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privatechat',
  templateUrl: 'privatechat.html',
})
export class PrivatechatPage implements OnInit {

  messages =[];
  username = '';
  singleMessage:string = '';
  oldPrivateChatMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private socket: Socket, private localStorage:Storage, private getOldPrivateChat: GetpreviousmessagesProvider) {
  }

  ngOnInit(){


    this.startUpDb();
   
    this.getMessageFromSocketClientServer().subscribe(message =>{
      console.log('page loaded');
      this.messages.push(message);
    });
  }


 
  onClickGetPreviousPrivateMessage(){

    this.getOldPrivateChat.GetOldPrivateMessage().subscribe(data =>{

      console.log(data);

      this.oldPrivateChatMessage = data.privateUsers;
    });
  }

  startUpDb(){

    this.localStorage.get('user').then((val) => {
      console.log(val);
  
      this.username = val.username;
      });
  }

  getMessageFromSocketClientServer(){

    console.log('we are here in obsarvables');
    let observable =  new Observable(observer =>{
      this.socket.on('new-message-to-both', (data) =>{
        observer.next(data);
      });
      
    });

    return observable;
  }


  onClickSend(){
    this.socket.emit('private-message', {text: this.singleMessage});
    this.singleMessage = '';
  }

}
