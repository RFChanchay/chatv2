import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private router:Router,
    private userService:UserService,
    private alertController:AlertController
  ) { }

  ngOnInit() {
  }
  nada(){}
  changeUserData(form){
    this.userService.changeUserInfo(form.value).then((data:any)=>{
      console.log(data);
      this.router.navigateByUrl('/home');
    })
    .catch(e=>{
      console.log(e);
      let msg:string='No se pudo actualizar datos, intentelo mas tarde';
      this.showAlert(msg);
    })
  }


  async showAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      //subHeader: 'Important message',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
