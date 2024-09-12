import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ageComponent from './age.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Age-calculator';
}
