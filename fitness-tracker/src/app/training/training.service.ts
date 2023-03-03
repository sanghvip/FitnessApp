import { Exercise } from "./exercise.model";
import  {Subject} from "rxjs";

export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    private availableExercises: Exercise[] = [
        {id:'crunches', name:'Crunches',duration:30,calories:8},
        {id:'touch-toes', name:'Touch Toes',duration:180,calories:1},
        {id:'side-lunges', name:'Side Lunges',duration:120,calories:8},
        {id:'burpees', name:'Burpees',duration:120,calories:8} 
    ];

    private runningExercise: Exercise;

    getAvailableExercises(){
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string){
        this.runningExercise = this.availableExercises.find(ex => ex.id===selectedId)!;
        this.exerciseChanged.next({...this.runningExercise});
    }
}