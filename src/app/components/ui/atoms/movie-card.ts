import { HandleFavorite } from '@/core';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { Icon } from './icon';

@Component({
  selector: 'movie-card',
  imports: [MatCardModule, Icon, LucideAngularModule],
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
      <mat-card-footer class="flex-shrink-0 mt-auto">
        <button matButton class="flex items-center justify-center w-full">
          <lucide-icon name="heart" [size]="16" class="fill-red-500"></lucide-icon>
          Favorite
        </button>
      </mat-card-footer>
    </mat-card>
  `,
})
export class MovieCard extends HandleFavorite {
  @Input()
  title: string | undefined;

  @Input()
  description: string | undefined;

  @Input()
  image: string | undefined;
}
