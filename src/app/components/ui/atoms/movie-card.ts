import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'movie-card',
  imports: [MatCardModule],
  standalone: true,
  template: `
    <mat-card class="h-full flex flex-col">
      <mat-card-content class="flex-shrink-0">
        <h1 class="text-center font-bold text-lg min-h-14 flex items-center justify-center">
          {{ title }}
        </h1>
      </mat-card-content>
      <img
        mat-card-image
        src="{{ image }}"
        class="rounded-xl h-96 w-full object-cover flex-shrink-0"
      />
      <mat-card-footer class="flex-shrink-0 mt-auto"></mat-card-footer>
    </mat-card>
  `,
})
export class MovieCard {
  @Input()
  title: string | undefined;

  @Input()
  description: string | undefined;

  @Input()
  image: string | undefined;
}
