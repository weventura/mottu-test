import {Component, DestroyRef, inject, OnInit} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Store} from "@ngrx/store";
import {debounceTime, tap} from "rxjs";
import {CharacterPage} from "../../../../core/models/characters/character-page.model";
import {searchCharactersName} from "../../../../store/characters/characters.actions";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store<{charactersPage: CharacterPage}>);
  private readonly destroyRef = inject(DestroyRef);

  public filterGroup = this.formBuilder.group({
    name: [null],
  });

  ngOnInit(): void {
    this.onChangeValue();
  }

  onChangeValue(): void {
    this.filterGroup.valueChanges
      .pipe(
        debounceTime(500),
        tap((value) =>
          this.store.dispatch(searchCharactersName({name: value.name || ""}))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
