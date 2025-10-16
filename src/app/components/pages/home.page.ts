import { Component } from '@angular/core';
import { MoviesSection } from '../sections';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [MoviesSection],
  template: ` <movies-section /> `,
})
export class HomePage {}
