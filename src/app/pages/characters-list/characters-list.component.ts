import {Component, HostListener, inject} from "@angular/core";
import {Observable} from "rxjs";
import {CharacterPage} from "../../core/models/characters/character-page.model";
import {Store} from "@ngrx/store";
import {
  selectCharacters,
  selectLoader,
  selectLoadingMore,
} from "../../store/characters/characters.selectors";
import {
  loadCharactersNextPage,
  loadCharactersPage,
  toggleFavoriteStatus,
} from "../../store/characters/characters.actions";
import {AsyncPipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "./components/header/header.component";
import {Character} from "../../core/models/characters/character.model";
import {CommonListComponent} from "../../shared/common-list/common-list.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: "app-characters-list",
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    HeaderComponent,
    CommonListComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./characters-list.component.html",
  styleUrl: "./characters-list.component.scss",
})
export class CharactersListComponent {
  private readonly store = inject(Store<{charactersPage: CharacterPage}>);

  public characters$: Observable<Character[]> =
    this.store.select(selectCharacters);
  public isLoading$: Observable<boolean> = this.store.select(selectLoader);
  public isLoadingMore$: Observable<boolean> =
    this.store.select(selectLoadingMore);

  @HostListener("window:scroll", [])
  onScroll(): void {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.loadMore();
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadCharactersPage());
  }

  loadMore(): void {
    this.store.dispatch(loadCharactersNextPage());
  }

  onFavoriteClick(item: Character) {
    this.store.dispatch(toggleFavoriteStatus({characterId: item.id}));
  }
}
