import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.adminService.singin(loginForm.value).subscribe(
      (response: any) => {
        this.adminAuthService.setRoles(response.admin.role);
        this.adminAuthService.setToken(response.token);
        this.adminAuthService.setID(response.admin._id)
        
        this.adminAuthService.setRefreshToken(response.refreshToken);
        this.router.navigate([''])
        location.reload()
       
      },
      (error:any) => {
        console.log(error);
      }
    );
  }
}
