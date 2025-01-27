import {Component, inject} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ButtonToggleComponent} from "./components/button-toggle/button-toggle.component";
import {Router} from "@angular/router";

@Component({
  selector: "app-custom-navbar",
  standalone: true,
  imports: [MatToolbarModule, ButtonToggleComponent],
  templateUrl: "./custom-navbar.component.html",
  styleUrl: "./custom-navbar.component.scss",
})
export class CustomNavbarComponent {
  private readonly router = inject(Router);

  onRedirect(): void {
    this.router.navigate(["/"]);
  }
}
