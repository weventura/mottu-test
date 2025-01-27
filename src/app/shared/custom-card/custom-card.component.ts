import {Component, input, output} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: "app-custom-card",
  standalone: true,
  imports: [MatIconModule],
  templateUrl: "./custom-card.component.html",
  styleUrl: "./custom-card.component.scss",
})
export class CustomCardComponent {
  image = input<string>();
  title = input<string>();
  subtitle = input<string>();
  description = input<string>();
  isFavorite = input<boolean>(false);
  isLoading = input<boolean>(false);
  onFavoriteClick = output();

  onToggleFavorite(): void {
    this.onFavoriteClick.emit();
  }
}
