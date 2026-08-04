import { Component, forwardRef, input, OnInit, signal } from '@angular/core';
import { customInputCurrencyImports } from './custom-input-currency.imports';
import { NgxMaskDirective } from 'ngx-mask';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input-currency-component',
  standalone: true,
  imports: [...customInputCurrencyImports, NgxMaskDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputCurrencyComponent),
      multi: true
    }
  ],
  templateUrl: './custom-input-currency-component.html',
  styleUrl: './custom-input-currency-component.scss',
})
export class CustomInputCurrencyComponent implements OnInit {
  placeholder = input<string>('');
  inputWidth = input<string>('');
  inputHeight = input<string>('');

  value = signal('');

  disabled = false;

  // Funções que o Angular registra automaticamente
  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    
  }

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
