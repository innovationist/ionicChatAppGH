import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LoginPage } from './../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoginProvider } from '../providers/login/login';
import { RegisterUserProvider } from '../providers/register-user/register-user';
import { AlertProvider } from '../providers/alert/alert';
import { GroupchatPage } from '../pages/groupchat/groupchat';
import { DashboardPage } from './../pages/dashboard/dashboard';


// socket io
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { OnlineuserlistPage } from '../pages/onlineuserlist/onlineuserlist';
import { PrivatechatdashPage } from '../pages/privatechatdash/privatechatdash';
import { PrivatechatPage } from '../pages/privatechat/privatechat';
import { AddfriendProvider } from '../providers/addfriend/addfriend';
import { GetfriendsProvider } from '../providers/getfriends/getfriends';
import { GetpreviousmessagesProvider } from '../providers/getpreviousmessages/getpreviousmessages';
const config: SocketIoConfig = { url: 'http://localhost:28080', options: {} };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    GroupchatPage,
    OnlineuserlistPage,
    PrivatechatdashPage,
    PrivatechatPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    
    
    
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    GroupchatPage,
    OnlineuserlistPage,
    PrivatechatdashPage,
    PrivatechatPage
    
      
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    RegisterUserProvider,
    AlertProvider,
    AddfriendProvider,
    GetfriendsProvider,
    GetpreviousmessagesProvider
  ]
})
export class AppModule {}
