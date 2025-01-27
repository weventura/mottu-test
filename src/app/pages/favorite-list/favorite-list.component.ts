import {Component, inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {CharacterPage} from "../../core/models/characters/character-page.model";
import {Observable} from "rxjs";
import {Character} from "../../core/models/characters/character.model";
import {selectFavoriteCharacters} from "../../store/characters/characters.selectors";
import {CommonListComponent} from "../../shared/common-list/common-list.component";
import {AsyncPipe} from "@angular/common";
import {
  initializeFavorites,
  toggleFavoriteStatus,
} from "../../store/characters/characters.actions";

@Component({
  selector: "app-favorite-list",
  standalone: true,
  imports: [AsyncPipe, CommonListComponent],
  templateUrl: "./favorite-list.component.html",
  styleUrl: "./favorite-list.component.scss",
})
export class FavoriteListComponent {
  private readonly store = inject(Store<{charactersPage: CharacterPage}>);

  public characters$: Observable<Character[]> = this.store.select(
    selectFavoriteCharacters
  );

  onFavoriteClick(item: Character): void {
    this.store.dispatch(toggleFavoriteStatus({characterId: item.id}));
  }

  ngOnInit(): void {
    this.store.dispatch(initializeFavorites());
  }
}
