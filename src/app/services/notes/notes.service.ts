import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
//import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  currentUserId:string;
  public users:Observable<any>;
  public usersNoes:Observable<any>;
  constructor(
    public auth:Auth,
    private api:ApiService
  ) { }
  getUsers(){
    this.users=this.api.collectionDataQuery(
      'users',
      this.api.whereQuery('uid','!=',this.currentUserId)
    );
  }
  async createUserNote(theContent){
    try{
      const user=this.auth.currentUser;
      const usrNote=await this.api.getDocById(`userNotes/${user.uid}`);
      console.log(usrNote);
      return this.api.setDocument(`userNotes/${user.uid}`,{uid:user.uid,updatedAt: new Date(),content:theContent});
      
    }catch(e){
      console.log(e);
    }
  }

}
