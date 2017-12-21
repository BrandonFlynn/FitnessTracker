import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { HomeComponent } from './home/home.component';
import { RouterModule} from '@angular/router';
import { WebService } from './services/web.service'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent} from "./login/login.component";
import { FormsModule} from "@angular/forms";
import { RegisterComponent} from "./register/register.component";
import { UsersComponent} from "./users/users.component";



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ExerciseComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot([
      {path: 'exercise', component: ExerciseComponent},
      {path: 'home', component: HomeComponent, pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'users', component: UsersComponent}

    ])
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
