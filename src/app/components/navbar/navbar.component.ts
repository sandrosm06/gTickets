import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogin:boolean;
  public username:string;
  public emailUser:string;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._authService.getAuth().subscribe( auth => {
      if(auth){
        this.isLogin = true;
        this.username = auth.displayName;
        this.emailUser = auth.email;
        
      }else{
        this.isLogin = false;
      }
    })

  }
  onClickLogOut(){
    this._authService.logout();
    
  }
}
