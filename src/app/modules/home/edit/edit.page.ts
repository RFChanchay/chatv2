import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild("inpName") inpName:ElementRef;
  @ViewChild("inpInfo") inpInfo:ElementRef;

  editForm: FormGroup;
  profile = null;

  constructor(
    private router:Router,
    private userService:UserService,
    private alertController:AlertController
  ) { 
    this.userService.getUserProfile().subscribe((data) => {
			this.profile = data;
      console.log(this.profile);

		});
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.editForm = new FormGroup({
      name: new FormControl('', 
        {validators: [Validators.required]}
      ),
      info: new FormControl('', 
        {validators: [Validators.required]}
      ),
    });
  }
  onSubmit() {
    if(!this.editForm.valid){
      this.showAlert("Complete TODOS los campos");
      return;
    } 
    console.log(this.editForm.value);
    this.changeUserData(this.editForm);
  }
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
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
