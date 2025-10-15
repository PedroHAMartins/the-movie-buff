import { HandleFavorite, cn } from '@/core';
import { Component, Input, ChangeDetectorRef, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LucideAngularModule } from 'lucide-angular';
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
      <mat-card-footer class="flex-shrink-0 mt-auto py-2">
        <button
          matButton
          class="flex items-center justify-center w-full gap-2"
          (click)="toggleFavorite()"
        >
          <lucide-icon
            name="heart"
            [size]="24"
            [class]="
              cn('cursor-pointer', isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400')
            "
          ></lucide-icon>
          {{ isFavorite ? 'Favorited' : 'Favorite' }}
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

  @Input()
  movie!: any;

  cn = cn;
  private cdr = inject(ChangeDetectorRef);

  get isFavorite(): boolean {
    if (!this.movie) return false;
    const favorites = this.getFavorites();
    return favorites.some((f) => f.id === this.movie.id);
  }

  toggleFavorite(): void {
    if (!this.movie) return;

    if (this.isFavorite) {
      this.removeFromFavorites(this.movie.id);
    } else {
      this.addFavorite(this.movie);
    }

    this.cdr.detectChanges();
  }
}
