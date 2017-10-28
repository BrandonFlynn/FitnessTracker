import * as $ from 'jquery';

export class Exercises{
    exercise: string;

    constructor(exercise:string){
        this.exercise=exercise;
    }

}


export class ExerciseTracker{
    listOfExercises: Exercises[]= 
    [ 
        new Exercises("Cardio"),
        new Exercises("Bicep Curls"),
        new Exercises("Tricep Extensions"),
        new Exercises("Squats"),
        new Exercises("Vertical Rows"),
        new Exercises("Crunches")
    

    ];
    myExerciseList: Exercises[]=[];
    
    init() {
        return $.when(
            $.getJSON("/fitnessTrackerObject/exercises").done( data =>{
                this.listOfExercises = [new Exercises(data)];
            })
        );
    }


    drawExercises(){
        $("#exerciseList").html(
            this.listOfExercises.map( x => `<button class="list-group-item">${x.exercise}</button>` ).join("")
        );
    }
    drawMyExcercises() {
        $("#myExercises").html(
            this.myExerciseList.map(x=> `<li class="list-group-item">${x.exercise}</li>`).join("")
        );
    }
}
const exerciseTracker = new ExerciseTracker();

exerciseTracker.drawExercises();
let empty: boolean=true;

$('.list-group-item').click(function(e) {
    e.preventDefault();

    const chosenExercise = e.target.textContent;
    if(empty) {
        document.getElementById('default-message').remove();
        empty = false;
    }
    const completedExercise = new Exercises(chosenExercise);
    exerciseTracker.myExerciseList.push(completedExercise);
    exerciseTracker.drawMyExcercises();
});


    
