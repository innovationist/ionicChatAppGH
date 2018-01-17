/**
 * this page hold all the operations for the group chat */


import { Socket } from 'ng-socket-io';
import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { OnlineuserlistPage } from '../onlineuserlist/onlineuserlist';
import { GetpreviousmessagesProvider } from '../../providers/getpreviousmessages/getpreviousmessages';


/**
 * Generated class for the GroupchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage implements OnInit {

  // dclearing global variables...
  messages =[];
  username = '';
  singleMessage = '';
  onlineClients:string = '';
  onlineUsersToModal: any;
  oldGroupMessages: any;

  constructor(public navCtrl: NavController, private toastNotify: ToastController  ,private localStorage: Storage, private socket: Socket, private modalCtrl: ModalController, private getOldMsgProv: GetpreviousmessagesProvider) {}

  // page life cycle
  ngOnInit(){
    
    this.startUpDb();


    // subscribed to updates from group messaging socket
    this.getMessageFromSocketClientServer().subscribe(message =>{
      this.messages.push(message);
    });

    this.getSocketClientGroupUsers().subscribe(data => {

      if (data['status'] === 'not-ready') {
        this.toastNotification(`${data['text']}`);
      } else {
        this.toastNotification(`${data['text']}`);
      }
    });

    this.connectedClients().subscribe(data =>{
      this.onlineClients = data['values'].clients.length;
      this.onlineUsersToModal = data['values'].clients;
     
    });
  }



// start up db and get important userinfo..
  startUpDb(){

    this.localStorage.get('user').then((val) => {
      console.log(val);
  
      this.username = val.username;
      });
  }


// get list of online users, present them in a modan and let the user add to friends

  getSocketClientGroupUsers(){
    let observable =  new Observable(observer =>{
      this.socket.on('groupuser-status', (data) =>{
        observer.next(data);
        
      });
    });
    return observable;
  }

  getMessageFromSocketClientServer(){
    let observable =  new Observable(observer =>{
      this.socket.on('message-to-ion-user', (data) =>{
        observer.next(data);
      });
      
    });

    return observable;
  }

  // count connected client
  connectedClients(){
      let observable =  new Observable(observer =>{

        this.socket.on('user-list', (data) =>{
          observer.next(data);
          
        });
      });
  
      return observable;
    }
  
  


  onClickSend(){
    this.socket.emit('message-from-ionUser', {text: this.singleMessage});
    this.singleMessage = '';
  }

  // load previous message...
  onClickgetPreviousMessages(){

    this.getOldMsgProv.GetOldGroupMessage().subscribe(data => {

      this.oldGroupMessages = data.groupUsers;
      console.log(data);

    });
  }
  

  toastNotification(notificationMessage){
    let toast = this.toastNotify.create({
      message:notificationMessage,
      duration:3000,
      position:'top'
    });
    toast.present();
  }

  // if page leave disconnet from socket...

  ionViewDidLeave(){
    this.socket.disconnect();

  }

    // modal to checkk for online friends
    navBarModalClicked(){
      let val = this.onlineUsersToModal;
      const modal = this.modalCtrl.create(OnlineuserlistPage, val);
      modal.present();
    }

}
