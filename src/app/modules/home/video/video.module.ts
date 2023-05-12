import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPageRoutingModule } from './video-routing.module';

import { VideoPage } from './video.page';
//import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player/ngx'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoPageRoutingModule
  ],
  declarations: [VideoPage],
  //providers: [YoutubeVideoPlayer]
})
export class VideoPageModule {}
