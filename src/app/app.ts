import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieCard } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'The Movie Buff';
}
