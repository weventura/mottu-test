import { AsyncPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CharacterPage } from '../../../../core/models/characters/character-page.model';
import { selectFavoriteCharactersLenght } from '../../../../store/characters/characters.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-toggle',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    RouterModule
  ],
  templateUrl: './button-toggle.component.html',
  styleUrl: './button-toggle.component.scss'
})
export class ButtonToggleComponent {

  private readonly store = inject(Store<{ charactersPage: CharacterPage }>);

  public favorites$: Observable<number> = this.store.select(selectFavoriteCharactersLenght);

}
