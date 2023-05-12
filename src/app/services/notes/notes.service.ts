import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {  Observable, of,  } from 'rxjs';
import {  map,switchMap} from "rxjs/operators";
import { ApiService } from '../api/api.service';
//import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  currentUserId:string;
  public users:Observable<any>;
  public usersNotes:Observable<any>;
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
  async createUserNote(formValue){
    try{
      const user=this.auth.currentUser;
      const usrNote=await this.api.getDocById(`userNotes/${user.uid}`);
      console.log(usrNote);
      return this.api.setDocument(`userNotes/${user.uid}`,{uid:user.uid,updatedAt: new Date(),content:formValue.theContent});
    }catch(e){
      console.log(e);
    }
  }
  getNotes(){
    const user=this.auth.currentUser;
    this.usersNotes=this.api.collectionDataQuery('userNotes',
      this.api.whereQuery('uid','!=',user.uid)).pipe(
        map((data:any[])=>{
          console.log('notes data: ',data);
          data.map((element)=>{
            const user_data=element.uid;
            console.log('haber',user_data);
            const user = this.api.docDataQuery(`users/${user_data}`,true);
            element.user=user;
          });
          return(data);
        }),
        switchMap(data=>{
          return of (data);
        })
      );
  }
  

}
