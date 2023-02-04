import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import { MatIcon, MatIconModule } from "@angular/material/icon";

/** 
 * Module file to manage the import from Angular material
 * */ 
@NgModule({
    imports:[MatButtonModule,MatIconModule],
    exports:[MatButtonModule,MatIconModule]
})
export class MaterialModule {

}
