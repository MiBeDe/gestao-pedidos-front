import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, computed, effect, ElementRef, forwardRef, HostListener, input, signal,ViewChild } from '@angular/core';
import { customDropdownImports } from './custom-dropdown.imports';

@Component({
  selector: 'app-custom-dropdown-component',
  imports: [...customDropdownImports],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ],
    templateUrl: './custom-dropdown.component.html',
    styleUrl: './custom-dropdown.component.scss'
})
export class CustomDropdownComponent implements ControlValueAccessor {

  data = input.required<any[]>();
  fieldLabel = input.required<string>();
  fieldValue = input.required<string>();
  fieldTrack = input.required<string>();
  inputWidth = input.required<string>();
  inputDisabled = input<boolean>(false);

  private onChangeValue = (value: string) => {};
  private onTouched = () => {};

  value = signal<any>(null);
  disabled = false;

  readonly search = signal('');
  readonly opened = signal(false);
  readonly highlightedIndex = signal(0);

  @ViewChild('container')
  container!: ElementRef<HTMLElement>;

  readonly filteredData = computed(() => {
      const text = this.search().trim().toLowerCase();
      if (!text)
          return this.data();
      return this.data().filter(item =>
          String(item[this.fieldLabel()])
              .toLowerCase()
              .includes(text)
      );
  });

  open() {
      this.opened.set(true);
  }

  close() {
      this.opened.set(false);
  }

  onSearch(value: string) {
      this.search.set(value);
      this.highlightedIndex.set(0);
      this.open();
  }

   select(item: any) {
    const value = item[this.fieldValue()];  
    this.value.set(value);  
    this.search.set(item[this.fieldLabel()]);   
    this.onChangeValue(value);  
    this.onTouched();   
    this.close();
   }

  onKeyDown(event: KeyboardEvent) {
      switch (event.key) {
          case 'ArrowDown':
              event.preventDefault();
              this.highlightedIndex.update(value =>
                  Math.min(
                      value + 1,
                      this.filteredData().length - 1
                  )
              );
              break;
          case 'ArrowUp':
              event.preventDefault();
              this.highlightedIndex.update(value =>
                  Math.max(value - 1, 0)
              );
              break;
          case 'Enter':
              event.preventDefault();
              const item = this.filteredData()[this.highlightedIndex()];
              if (item)
                  this.select(item);
              break;
          case 'Escape':
              this.close();
              break;
      }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.container.nativeElement.contains(target)) {
        this.close();
    }
  }

  writeValue(value: any): void {
    this.value.set(value);  
    if (value == null) {
        this.search.set('');
        return;
    }   
    const item = this.data().find(
        x => x[this.fieldValue()] === value
    );  
    if (item) {
        this.search.set(item[this.fieldLabel()]);
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeValue = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}