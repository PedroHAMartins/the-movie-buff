import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Icon } from './icon';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'input-component',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    Icon,
    LucideAngularModule,
  ],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input matInput type="text" [value]="value()" (input)="handleChangeValue($event)" />
      <button matSuffix matIconButton aria-label="Search" (click)="handleAction()">
        <lucide-icon name="search"></lucide-icon>
      </button>
    </mat-form-field>
  `,
})
export class InputComponent {
  @Input()
  placeholder: string | undefined;

  @Input()
  label: string | undefined;

  @Input()
  action!: () => void;

  value = signal<string>('');

  handleChangeValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }

  handleAction() {
    this.action();
  }
}
