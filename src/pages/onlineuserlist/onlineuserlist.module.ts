import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineuserlistPage } from './onlineuserlist';

@NgModule({
  declarations: [
    OnlineuserlistPage,
  ],
  imports: [
    IonicPageModule.forChild(OnlineuserlistPage),
  ],
})
export class OnlineuserlistPageModule {}
