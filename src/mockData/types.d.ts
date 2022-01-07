
type PokemonTypes = "Ice" | "Grass" | "Poison" | "Water" | "Ghost" | "Dragon" | "Flying" | "Fire" | "Bug" | "Normal" | "Electric" | "Ground" | "Rock" | "Psychic" | "Fighting" | "Fairy" | "Steel"


export interface PokemonData {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: PokemonTypes[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
}

export type Language = "english" | "japanese" | "chinese" | "french";

export interface fuzzySearchResult {
  pokemon: PokemonData;
  matchedString: string;
}
