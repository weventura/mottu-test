import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomNavbarComponent } from "./shared/custom-navbar/custom-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rick-and-morty';
}
