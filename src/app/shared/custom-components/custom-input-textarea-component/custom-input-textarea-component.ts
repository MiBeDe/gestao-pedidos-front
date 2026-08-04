import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input-textarea-component',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputTextareaComponent),
      multi: true
    }
  ],
  templateUrl: './custom-input-textarea-component.html',
  styleUrl: './custom-input-textarea-component.scss',
})
export class CustomInputTextareaComponent implements ControlValueAccessor{
  placeholder = input<string>('');
  inputWidth = input<string>('');
  inputHeight = input<string>('');

  value = '';

  disabled = false;

  // Funções que o Angular registra automaticamente
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value == value || '';
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

    this.value = input.value;

    //Atualiza o FormControl
    this.onChange(this.value);

  }

  onBlur(): void{
    const input = event.target as HTMLInputElement;

    this.value = input.value;

    //Atualiza o FormControl
    this.onChange(this.value);
  }
}
