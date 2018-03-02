import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public email:string;
  public password: string;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onSubmitAddUser(){
    this._authService.registerUser(this.email, this.password)
    .then( (res) =>{
      this._flashMessage.show('Usuario Creado Correctamente', {cssClass: 'alert-success', timeout: 4000});
      this._router.navigate(['/private']);
    }).catch( (err) =>{
      this._flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      //console.log(err);
    });
  }
}
