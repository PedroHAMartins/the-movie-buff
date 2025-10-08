import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieCard, ButtonComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieCard, ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'The Movie Buff';
}
