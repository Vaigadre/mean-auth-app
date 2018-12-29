import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
      const user= {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      }

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all required fields', {cssClass: 'alert-info', timeout:3000});
      return false;
    }

   // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter a valid email address', {cssClass: 'alert-warning', timeout:5000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('User registered successfully. Please Login now.', {cssClass: 'alert-success', timeout:5000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Oops! Something went wrong. Please try again.', {cssClass: 'alert-danger', timeout:5000});
        this.router.navigate(['/register']);
      }
    });

 }

}
