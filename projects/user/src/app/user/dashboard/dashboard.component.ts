import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  userUID: string;
  user: User = new User();
  submitButton : boolean=true;

  constructor(public authService: AuthService,
    private userserv: UserService,
    private router: Router,
    private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getuserID()
    this.GetUserByID()

  }


  getuserID() {
    this.userUID = JSON.parse(localStorage.getItem('user')!).uid;
  }

  GetUserByID() {
    return this.userserv.LoadUsers().subscribe(data => {
      let x = data.find(y => y.uid == this.userUID);
      if (x) {
        this.user = x;
      }

    }),
      (err: any) => console.log(err)
  }

  async onFileChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.submitButton = false;
      const path = `users/${file.name}-${Math.random()}`
      const uploadTask = await this.fireStorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url)
      this.user.photoURL = url;
      this.submitButton = true;
    }

  }


  updateuser() {

    return this.userserv.UpdateUser(this.user._id, this.user).subscribe(data => {
      this.router.navigate(['dashboard']);
      document.location.reload();

    });


  }



}
