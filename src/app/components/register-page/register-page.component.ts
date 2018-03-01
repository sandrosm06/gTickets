import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private _router: Router
  ) { }

  ngOnInit() {
  }
  onSubmitAddUser(){
    this._authService.registerUser(this.email, this.password)
    .then( (res) =>{
      this._router.navigate(['/private']);
    }).catch( (err) =>{
      console.log(err);
    });
  }
}
