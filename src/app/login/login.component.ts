import {Component} from "@angular/core";
import {WebService} from "../services/web.service";

@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html"

})
export class LoginComponent {
  user: User = {
    email:'',
    password: ''
  };

  constructor(private webService:WebService){

  }


  loggingIn(){
    this.webService.login(this.user);
  }

}
interface User{
  email: string;
  password: string;

}
