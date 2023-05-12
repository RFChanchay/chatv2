import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { Observable, of,  } from 'rxjs';
import {  take} from "rxjs/operators";
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import {UserService} from'src/app/services/user/user.service';
import { PushNotifications } from '@capacitor/push-notifications';
import { NotesService } from 'src/app/services/notes/notes.service';

//

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('new_chat') modal!: ModalController;
  @ViewChild('popover') popover: PopoverController;
  segment='chats';
  open_new_chat = false;
  users : Observable<any[]>;
  chatRooms : Observable<any[]>;
  profile = null;
  selectedImage: any;
  token:string='';
  usersNotes:Observable<any>;
  isModalOpen = false;
  noteContent:any;



  constructor(
    private router:Router,
    private authService:AuthService,
    private chatService:ChatService,
    private userService:UserService,
    private loadingController: LoadingController,
		private alertController: AlertController,
    private userNoteService:NotesService,
  ) { 
    this.userService.getUserProfile().subscribe((data) => {
			this.profile = data;
		});
  }

  ngOnInit() {
    this.getRooms();
    this.getNotes();
    
    PushNotifications.addListener("registration",
      (token)=>{
        this.token=token.value;
      }
    )
    PushNotifications.addListener("pushNotificationReceived",(notification)=>{
      alert(JSON.stringify(notification));
    })
    PushNotifications.register();
    
  }

  getRooms(){
    this.chatService.getChatRooms();
    this.chatRooms=this.chatService.chatRoms;
    console.log('chatrooms',this.chatRooms);
  }

  onSegmentChanged(event:any){
    console.log(event);
    this.segment=event.detail.value;
  }
  async logout() {
    try {
      await this.authService.logout().then(() => {
        this.segment='chats';
        this.router.navigateByUrl('/login',{replaceUrl:true});
        
        console.log(this.authService._uid);
      });
    } catch (e) {
      console.log(e);
    }
    
  }
  newChat(){
    this.open_new_chat = true;
    if(!this.users) this.getUsers();
  }


  getUsers(){
    this.chatService.getUsers();
    this.users =this.chatService.users;
  }

  onWillDismiss(event: any) {}
  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }
  async startChat(item){
    try{
      
      const room = await this.chatService.createChatRooms(item?.uid);
      console.log('room',room);
      this.cancel();
    
      const navData:NavigationExtras={
        queryParams:{
          name:item?.name
        }
      };
      this.router.navigate(['/','home','chat',room?.id],navData);
    }catch(e){
      console.log(e);
    }
  }

  async getPushToken(){
    const navData:NavigationExtras={
      queryParams:{
        token:this.token
      }
    };
    this.router.navigate(['/','home','push'],navData);
  }

  getChat(item){
    (item?.user).pipe(
      take(1)
    ).subscribe(user_data=>{
      console.log('data: ',user_data);
      const navData:NavigationExtras={
        queryParams:{
          name:user_data?.name
        }
      };
      this.router.navigate(['/','home','chat',item?.id],navData);
    });
  }
  getUser(user:any){
    console.log('the user: ',user);
    return user;
  }
  
  async changeImage() {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Base64,
			source: CameraSource.Photos // Camera, Photos or Prompt!
		});
    console.log(image);

		if (image) {
			const loading = await this.loadingController.create();
			await loading.present();

			const result = await this.userService.uploadImage(image);
			loading.dismiss();

			if (!result) {
				const alert = await this.alertController.create({
					header: 'Upload failed',
					message: 'There was a problem uploading your avatar.',
					buttons: ['OK']
				});
				await alert.present();
			}
		}
	}

  getNotes(){
    this.userNoteService.getNotes();
    this.usersNotes=this.userNoteService.usersNotes;
    console.log('notes', this.usersNotes);
  }


  
  setOpen(isOpen: boolean, content:string) {
    this.isModalOpen = isOpen;
    this.noteContent=content;

  }

}
