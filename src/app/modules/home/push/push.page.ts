import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-push',
  templateUrl: './push.page.html',
  styleUrls: ['./push.page.scss'],
})
export class PushPage implements OnInit {
  token:string='';
  constructor(
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    const data: any= this.route.snapshot.queryParams;
    console.log('data',data);
    this.token=data.token;
  }
  printToken(){
    console.log('Token: ',this.token);
  }

}
