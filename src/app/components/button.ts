import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'button-component',
  template: `
    <button (click)="startCounter('+')" class="bg-red-500 p-2 rounded-md cursor-pointer">
      {{ text }}
    </button>
    <button (click)="startCounter('-')" class="bg-blue-500 p-2 rounded-md cursor-pointer">
      {{ text }}
    </button>
    <p>{{ counter() }}</p>
  `,
})
export class ButtonComponent {
  @Input()
  text!: string;

  counter = signal<number>(0);

  startCounter(operator: string) {
    if (operator === '+') {
      this.counter.set(this.counter() + 1);
    }
    if (operator === '-') {
      this.counter.set(this.counter() - 1);
    }
  }
}
