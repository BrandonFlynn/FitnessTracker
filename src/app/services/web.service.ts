import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Headers} from "@angular/http";


const BASE_URL = 'http://localhost:3001/api';
//137.140.169.179
//192.168.0.22
//'http://localhost:3001'
const TOKEN_KEY = 'token';
const NAME_KEY = 'name';


@Injectable()
export class WebService {

  exercises;
  exercisesCompleted = [];

  constructor(private http: HttpClient, private router: Router) {
  }


  typeAheadBox(){
    this.http.get(BASE_URL + '/exercises').subscribe(exercises => {
      this.exercises = exercises;
  })}


  getExercises() {
    this.http.get(BASE_URL + '/exercises').subscribe(exercises => {
      this.exercises = exercises;
    })
  }

  getMyExercises() {
    return this.http.get(BASE_URL + '/myexercises', this.authTokenHeader);
  }

  get authTokenHeader() {
    let headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)});
    return {headers: headers};
  }

  postExercisesCompleted() {
    this.http.post(BASE_URL + '/exercisesCompleted', this.exercisesCompleted, this.authTokenHeader).subscribe(data => {
      this.exercisesCompleted = [];
    });
  }

  getLoggedInUsers() {
    return this.http.get(BASE_URL + '/users');
  }

  login(user) {
    this.http.post<ServerResponse>(BASE_URL + '/login', user).subscribe(
      res => {
        if (!res.token) return;
        this.authenticate(res);
        this.navigateHome();
      },
      error => console.log(error));
  }

  register(user) {
    this.http.post<ServerResponse>(BASE_URL + '/register', user).subscribe(
      res => {
        if (!res.token) return;
        this.authenticate(res);
        this.navigateHome();
      },
      error => console.log(error)
    );
  }

  get isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  get name() {
    return localStorage.getItem(NAME_KEY);
  }

  logout() {
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  private navigateHome() {
    this.router.navigate(['/home']);
  }

  private authenticate(res) {
    localStorage.setItem(NAME_KEY, res.name);
    localStorage.setItem(TOKEN_KEY, res.token);
  }
}

interface ServerResponse {
  status: string;
  message: string;
  token?: string;
  name?: string;
}
