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
          Movie Title
        </typography>
      </mat-card-header>
      <img mat-card-image src="https://picsum.photos/200/300" />
      <mat-card-content>
        <typography type="body" bodyVariant="body" weight="normal" class="text-gray-700">
          This is a movie description that shows how to use the typography component.
        </typography>
      </mat-card-content>
      <mat-card-footer>
        <typography type="body" bodyVariant="caption" weight="light"> Action buttons </typography>
      </mat-card-footer>
    </mat-card>
  `,
})
export class MovieCard {}
