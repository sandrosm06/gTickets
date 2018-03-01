import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email:string;
  public password: string;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  
  onSubmitLogin(){
    this._authService.loginEmail(this.email, this.password)
    .then( (res) => {
      this._router.navigate(['/private']);
    }).catch( (err) => {
      console.log(err);
      this._router.navigate(['/login']);
    });
  }

}
