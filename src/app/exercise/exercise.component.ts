import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.sass']
})
export class ExerciseComponent implements OnInit {

  currentExercise;
  exercises;
  searchBox = '';
  recommendedExercises;

  constructor(public webService: WebService) {}


  ngOnInit(){
    this.webService.getExercises();
  }

  searchExercises() {
    let observable = this.webService.postRecommendedExercises(this.searchBox);
    observable.subscribe(res => {

      this.recommendedExercises = res;
      if(!this.searchBox) this.recommendedExercises = [];
    })
  }



  addToExercisesCompleted(exercise) {
    this.currentExercise = exercise;
    this.webService.exercisesCompleted.push(exercise);
  }

  isClicked(exercise) {
    return this.currentExercise === exercise;
  }

  postToServer() {
    this.webService.postExercisesCompleted();
  }
}
