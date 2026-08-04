import { CommonModule } from "@angular/common";
import { CustomDropdownComponent, CustomInputComponent } from "../../../../shared";
import { FormsModule } from "@angular/forms";
import { MatDividerModule } from '@angular/material/divider';

export const novoPedidoScreenImports = [
    CommonModule,
    FormsModule,
    MatDividerModule,
    CustomDropdownComponent,
    CustomInputComponent
]