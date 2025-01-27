import {Component, inject, input} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent {
  private readonly router = inject(Router);

  isFavorite = input<boolean>(false);

  onRedirect(): void {
    this.router.navigate(["/"]);
  }
}
