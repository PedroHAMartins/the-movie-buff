import { Component, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'toolbar',
  imports: [MatToolbarModule, MatButtonModule, RouterModule],
  template: `
    <mat-toolbar class="flex !ml-10 gap-10 !bg-transparent !font-light">
      <button
        mat-button
        routerLink="/"
        routerLinkActive="active-link"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        Popular Movies
      </button>
      <button mat-button routerLink="/favorites" routerLinkActive="active-link">
        Favorite Movies
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      .active-link {
        color: #2563eb !important;
        font-weight: 500 !important;
      }
    `,
  ],
})
export class Toolbar {
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => {}, 0);
    });
  }
}
