import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'toolbar',
  imports: [MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar class="flex !ml-10 gap-10 !bg-transparent !font-light">
      @for (button of buttons; track $index) {
      <button>{{ button }}</button>
      }
    </mat-toolbar>
  `,
})
export class Toolbar {
  buttons = ['Popular Movies', 'Favorite Movies'];
}
