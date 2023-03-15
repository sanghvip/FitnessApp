import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from '../material.module';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,        
    AngularFirestoreModule,
    ]
})

export class SharedModule{}