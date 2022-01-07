import {pokemons} from './pokemon'
import { PokemonData, fuzzySearchResult, Language } from './types';

function fuzzySearchPokemonName(pokemonList: PokemonData[], name: string): fuzzySearchResult[] {
  const matches: fuzzySearchResult[] = [];
  pokemonList.forEach(pokemon => {
    if (pokemon.name.english.toLowerCase().includes(name.toLowerCase())) {
          matches.push({pokemon, matchedString :pokemon.name['english'] })
        }
  })
  return matches;
}

export const mockedService = {
  fetchPokemonByName: async (pokemonName: string): Promise<fuzzySearchResult[]> => {
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        resolve( fuzzySearchPokemonName(pokemons, pokemonName) )
      }, 10)
    })
  }
}