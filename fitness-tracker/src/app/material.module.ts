import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
/** 
 * Module file to manage the import from Angular material
 * */ 
@NgModule({
    imports:[MatButtonModule,MatIconModule, MatFormFieldModule,MatInputModule],
    exports:[MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule]
})
export class MaterialModule {

}
