import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
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
        //console.log(auth.uid);
        this.isLogin = true;
        this.username = auth.displayName;
        this.emailUser = auth.email;
        
      }else{
        this.isLogin = false;
      }
    });

  }

}
