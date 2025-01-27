import { Character } from "./character.model";
import { Info } from "./info.model";

export interface CharacterPage {
    info: Info,
    results: Character[],
    favorites: Character[],
    isLoading: boolean,
    isLoadingMore: boolean
}