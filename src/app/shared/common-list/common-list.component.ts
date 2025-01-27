import {Component, input, output} from "@angular/core";
import {CustomCardComponent} from "../custom-card/custom-card.component";
import {Character} from "../../core/models/characters/character.model";
import {NotFoundComponent} from "../not-found/not-found.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: "app-common-list",
  standalone: true,
  imports: [CustomCardComponent, NotFoundComponent, MatProgressSpinnerModule],
  templateUrl: "./common-list.component.html",
  styleUrl: "./common-list.component.scss",
})
export class CommonListComponent {
  characters = input<Character[]>([]);
  isLoading = input<boolean>(false);
  isLoadingMore = input<boolean>(false);
  isFavorite = input<boolean>(false);
  onFavoriteClick = output<Character>();

  defaultLoadingCards: number[] = Array.from({length: 12});

  onToggleFavorite(item: Character): void {
    this.onFavoriteClick.emit(item);
  }
}
