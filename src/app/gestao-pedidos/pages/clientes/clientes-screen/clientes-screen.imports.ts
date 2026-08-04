import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CustomGridComponent } from '../../../../shared/';
import { RouterModule } from '@angular/router';


export const clientesScreenImports = [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    CustomGridComponent,
    RouterModule
]