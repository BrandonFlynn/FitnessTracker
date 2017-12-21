import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.sass']
})
export class ExerciseComponent implements OnInit {

  currentExercise;
  exercises;
  constructor(public webService: WebService) {}


  ngOnInit(){
    this.webService.getExercises();
  }

  addTotypeAheadBox(exercises){
    this.exercises === exercises;

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
