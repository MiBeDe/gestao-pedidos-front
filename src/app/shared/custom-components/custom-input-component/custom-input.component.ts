import { Component, forwardRef, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [NgxMaskDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
})
export class CustomInputComponent implements ControlValueAccessor{
  placeholder = input<string>('');
  type = input<string>('text');
  inputCategory = input<string>('text');
  textRefIcon = input<string>('');
  visibilityPassword = output<void>();
  inputWidth = input<string>('');
  inputHeight = input<string>('');
  inputDisabled = input<boolean>(false);
  mask? = input<string>();
  
  value = signal('');

  disabled = false;

  // Funções que o Angular registra automaticamente
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string | null | undefined): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void{
    const input = event.target as HTMLInputElement;

    this.value.set(input.value);
    this.onChange(input.value);
  }

  onBlur(): void{
    this.onTouched();
  }
  
}
