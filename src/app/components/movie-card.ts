import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'movie-card',
  imports: [MatCardModule],
  standalone: true,
  template: `
    <mat-card>
      <mat-card-header> Movie name </mat-card-header>
      <mat-card-content> Movie image Movie description </mat-card-content>
      <mat-card-footer> action buttons </mat-card-footer>
    </mat-card>
  `,
})
export class MovieCard {
  @Input()
  title!: string;
  @Input()
  year!: string;
  @Input()
  rating!: string;
  @Input()
  description!: string;
  @Input()
  posterUrl!: string;
}
