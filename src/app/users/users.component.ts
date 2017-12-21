import {Component} from "@angular/core";
import {WebService} from "../services/web.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  loggedInUsers;
  myExercises;

  constructor(private webService: WebService) {
    this.webService.getLoggedInUsers().subscribe(
      res => this.loggedInUsers = res
    );
    this.webService.getMyExercises().subscribe(
      res => this.myExercises = res
    )
  }
}
