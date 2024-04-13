import { Component, ElementRef } from '@angular/core';
import { Notification } from 'projects/user/src/app/models/notification';
import { NotificationService } from 'projects/user/src/app/services/notification.service';
import { AdminAuthService } from './services/admin-auth.service';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service';
import { Admin } from './models/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  notifications:Notification[];
  newnotifs:Notification[];
notifCounter :number;
isConnected :boolean;
permission:string
forbidden:boolean
 admin="admin";
 connectedAdmin:Admin=new Admin();
 ID:string;
 submitButton : boolean=true;

  constructor(private notifserv: NotificationService,
    private elementRef :ElementRef,
    private adminAuthService: AdminAuthService,
    private adminService:AdminService,
    private router: Router,
     ) { };

  ngOnInit() {
    this.ListNotifs()
    this.JSCode()
    this.ID=localStorage.getItem("Id")|| '';
    this.LoadConnectedAdmin();


    setInterval(() => {
      if(localStorage.getItem("jwtToken")){
        this.permission =JSON.parse(localStorage.getItem("roles")|| '')
         if(window.location.href.includes("forbidden")){
          this.forbidden=true
         }else this.forbidden=false

        this.isConnected=true
      }else this.isConnected=false

    },600)
  }

  toggle(){
    const element =document.body as HTMLBodyElement
    element.classList.toggle("toggle-sidebar")
    console.log(JSON.parse(localStorage.getItem("roles")|| ''))
   console.log(this.forbidden)
  }



  ListNotifs() {
    return this.notifserv.LoadNotifications().subscribe(data =>{
   this.newnotifs = data
   .map((item) => ({ ...item, createdAt: new Date(item.createdAt) }))
  .filter((notif) => notif.NotificationChecking == false && notif.type=="order")
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

   this.notifCounter=this.newnotifs.length;

   this.notifications = data
  .filter((notif) => notif.NotificationChecking == true && notif.type=="order")
  .map((item) => ({ ...item, createdAt: new Date(item.createdAt) }))
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}),
      (err: any) => console.log(err)
  }

NotifChecked(){
  this.notifserv.LoadNotifications().subscribe(data =>{
    data.forEach(notif=>{
      notif.NotificationChecking=true;
      this.notifserv.UpdateNotification(notif._id,notif).subscribe(data =>{})
    })

  }),
    (err: any) => console.log(err)

}


  getTimeDifference(createdAt: string): string {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    let timeDiff = now.getTime() - createdAtDate.getTime();

    const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    timeDiff -= weeks * (1000 * 60 * 60 * 24 * 7);

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    timeDiff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff -= hours * (1000 * 60 * 60);

    const minutes = Math.round(timeDiff / (1000 * 60));

      if (weeks > 0) {
      return `${weeks}w`;
      } else if (days > 0) {
      return `${days}d`;
      } else if (hours > 0) {
      return `${hours}h`;
      } else {
      return `${minutes}m`;
      }
  }


JSCode(){
  var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
}

Logout(){
  this.adminAuthService.logout()
}

LoadConnectedAdmin() {
  return this.adminService.GetAdmin(this.ID).subscribe(data => this.connectedAdmin = data
  ),
    (err: any) => console.log(err)
}

}
