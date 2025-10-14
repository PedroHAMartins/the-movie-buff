import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieCard } from './components';
import { MoviesSection } from './components/sections/movies.section';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MoviesSection],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'The Movie Buff';
}
