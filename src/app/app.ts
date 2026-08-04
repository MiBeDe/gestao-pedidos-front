import { Component, signal } from '@angular/core';
import { appImports } from './app.imports';

@Component({
  selector: 'app-root',
  imports: [...appImports],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gestao-pedidos');
}
