import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { CustomGridComponent } from "../../../../shared/custom-components/custom-grid-component";
import { RouterModule } from "@angular/router";

export const produtoScreenImports = [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    CustomGridComponent,
    RouterModule
]