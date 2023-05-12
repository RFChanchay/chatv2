import { Component, OnInit } from '@angular/core';
import { YouTubePlayer } from "youtube-player";

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  player:any;
  videoTd:string="VBiNZcH27Y8";
  stopped:boolean=true;


  constructor(
    ) {}
  

  ngOnInit() {
  }
  play(){
    if(this.stopped){
      if(this.player==undefined){
        this.player=YouTubePlayer();
      }
      this.player.loadVideoById(this.videoTd).then(()=>{
        this.player.playVideo();
        this.stopped=false;
      });
    }
  }
  stop(){
    if(!this.stopped){
      this.player.stopVideo().then(()=>{
        this.stopped=true;
      })
    }
  }

}
