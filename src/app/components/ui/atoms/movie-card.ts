import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Typography } from './typography';

@Component({
  selector: 'movie-card',
  imports: [MatCardModule, Typography],
  standalone: true,
  template: `
    <mat-card>
      <mat-card-header>
        <typography type="title" titleVariant="h3" weight="bold" class="text-blue-600">
          {{ title }}
        </typography>
      </mat-card-header>
      <img mat-card-image src="{{ image }}" />
      <mat-card-content>
        <typography type="body" bodyVariant="caption" weight="light">
          {{ description }}
        </typography>
      </mat-card-content>
      <mat-card-footer>
        <typography type="body" bodyVariant="caption" weight="light"> Action buttons </typography>
      </mat-card-footer>
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
