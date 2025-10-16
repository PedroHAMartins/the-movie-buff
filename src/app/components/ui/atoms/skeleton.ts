import { Component, Input } from '@angular/core';

@Component({
  selector: 'simple-skeleton',
  standalone: true,
  template: `
    <div
      class="skeleton-item animate-pulse bg-gray-200 rounded-lg"
      [style.width]="width"
      [style.height]="height"
      [class]="className"
    ></div>
  `,
  styles: [
    `
      .skeleton-item {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }

      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `,
  ],
})
export class SimpleSkeletonComponent {
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() className: string = '';
}
