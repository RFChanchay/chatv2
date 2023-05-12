import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  @ViewChild("inpNote") inpName:ElementRef;
  editForm:FormGroup;


  constructor(
    private noteService:NotesService,
    private alertController:AlertController,
    private router: Router

  ) { 

  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.editForm = new FormGroup({
      theContent: new FormControl('', 
        {validators: [Validators.required]}
      ),
    });
  }

  onSubmit() {
    if(!this.editForm.valid){
      this.showAlert("Ingrese un texto");
      return;
    } 
    console.log(this.editForm.value);
    this.changeUserNote(this.editForm);
  }

  async showAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }


  changeUserNote(form){
    this.noteService.createUserNote(form.value).then((data:any)=>{
      console.log(data);
      this.router.navigateByUrl('/home');
    })
    .catch(e=>{
      console.log(e);
      let msg:string='No se pudo enviar la nota, intentelo mas tarde';
      this.showAlert(msg);
    })
  }
}
