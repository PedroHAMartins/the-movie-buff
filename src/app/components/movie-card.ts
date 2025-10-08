import { Component, Input } from '@angular/core';

@Component({
  selector: 'movie-card',
  standalone: true,
  template: `
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <!-- Movie Poster -->
      <div class="aspect-[2/3] bg-gray-200 relative">
        <img [src]="posterUrl" [alt]="title" class="w-full h-full object-cover" />
        <div
          class="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-md font-bold text-sm"
        >
          {{ rating }}
        </div>
      </div>

      <!-- Movie Info -->
      <div class="p-4">
        <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{{ title }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ year }}</p>
        <p class="text-sm text-gray-700 line-clamp-3">{{ description }}</p>
      </div>
    </div>
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
