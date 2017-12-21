import {Component} from "@angular/core";
import {WebService} from "../services/web.service";


@Component({
  selector: 'app-register',
  templateUrl: "./register.component.html"

})
export class RegisterComponent {
  user: UserRegistration = {
    email:'',
    firstName: '',
    lastName: '',
    password: ''
  };

  constructor(private webService:WebService){

  }

  register(){
    this.webService.register(this.user);
  }
}
interface UserRegistration{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
