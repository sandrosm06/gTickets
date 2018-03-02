import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  
  onSubmitLogin(){
    this._authService.loginEmail(this.email, this.password)
    .then( (res) => {
      this._flashMessage.show('El Usuario ha Ingresado Correctamente', {cssClass: 'alert-success', timeout: 4000});
      this._router.navigate(['/private']);
    }).catch( (err) => {
      console.log(err);
      this._flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      this._router.navigate(['/login']);
    });
  }

}
