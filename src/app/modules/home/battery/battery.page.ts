import { Component, OnInit } from '@angular/core';
import{BatteryStatus}from '@awesome-cordova-plugins/battery-status/ngx'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.page.html',
  styleUrls: ['./battery.page.scss'],
})
export class BatteryPage implements OnInit {
  estado:number;
  btlvl:any='...';
  btstat:any='...';
  subscription:any;
  
  constructor(
    public navCtrl:NavController,
    private batteryStatus:BatteryStatus
  ) { }
  

  ngOnInit() {
    
  }

  checkBatStatus(){
    console.log('aaaaaa')
    this.subscription=this.batteryStatus.onChange().subscribe((status)=>
      {
          console.log(status.level, status.isPlugged);
          this.btlvl=status.level;
          if (status.isPlugged==true) {
            this.btstat='Cargando';
          } else {
            this.btstat='Desconectado';
          }
      });
  }
  stpBatCheck(){
    console.log('eee');
    this.btstat='...';
    this.btlvl='...';
    this.subscription.unsubscribe();
  }
  checkToogle(isChecked: boolean) {
    if (isChecked) {
      this.checkBatStatus();
    } else {
      this.stpBatCheck();
    }
  }
  


}
