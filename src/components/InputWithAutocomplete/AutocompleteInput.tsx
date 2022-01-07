import React from 'react';
import { mockedService } from '../../mockData/mock_service'
import { fuzzySearchResult } from '../../mockData/types';
import { highlightMatch } from '../../utils';

export const InputWithAutocomplete: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {

  const [searchName, setSearchName] = React.useState<string>("")
  const [searchResults, setSearchResults] = React.useState<fuzzySearchResult[]>()
  const [activeSuggestion, setActiveSuggestion] = React.useState<number>(0);
  const [isPokemonSelected, setPokemonSelected] = React.useState<boolean>(false)
  const selectedElementRef = React.createRef<HTMLUListElement>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const pokemonName = e.target.value
    setSearchName(pokemonName);
    setPokemonSelected(false)
  }

  const closeSuggestions = () => {
    setSearchResults(undefined)
    setActiveSuggestion(0)
  }

  const selectPokemon = (pokemonName: string) => {
    setSearchName(pokemonName)
    setPokemonSelected(true)
    closeSuggestions()
  }

  const fetchPokemonNameData = React.useCallback(async (searchName)=>{
    if (searchName) {
      const listOfPokemon = await mockedService.fetchPokemonByName(searchName)
      setSearchResults(listOfPokemon)
    }
  }, [])

  const navigateSelectionsWithKeyboard: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      switch(e.code) {
        case 'ArrowDown':
          // This little hack is so that we can select and scroll the element using the keyboard,
          // the idea is that we are going to track the index of suggestion (position) and multiply by the height of the element. 
          // since all the elements have the same height, we can use the last one in the array of nodes.
          if (searchResults) {
            if (selectedElementRef.current && selectedElementRef.current.lastElementChild) { 
              selectedElementRef.current.scrollTop = activeSuggestion * selectedElementRef.current.lastElementChild?.scrollHeight
            }
            setActiveSuggestion( n => n < searchResults?.length - 1 ? Number(n) + 1 : searchResults?.length - 1)
          }
          break;
        case 'ArrowUp':
          // Same as above, this time we are taking track of the total scroll minus the one we are selection upwards.
          if (selectedElementRef.current && selectedElementRef.current.lastElementChild) { 
            selectedElementRef.current.scrollTop = (activeSuggestion-1) * selectedElementRef.current.lastElementChild?.scrollHeight
          }
          setActiveSuggestion( n => n > 0 ? Number(n) - 1 : 0)
          break;
        case 'Escape':
          closeSuggestions()
          break;
        case 'Enter':
          if (searchResults) {
            selectPokemon(searchResults[activeSuggestion].matchedString)
          }
          break;
        default:
          break;
      }
  }


  const selectAutoSuggestion: React.MouseEventHandler<HTMLElement> = (e) => {
    selectPokemon(String(e.currentTarget.textContent))
  }

  React.useEffect(()=> { 
    if (!searchName) {
      setPokemonSelected(false)
      setSearchResults(undefined)
    } else {
      fetchPokemonNameData(searchName)
    }
  }, [fetchPokemonNameData, searchName])

  React.useEffect(()=> {
    if (searchResults) {
      setActiveSuggestion(0)
    }
    if (isPokemonSelected) {
      setSearchResults(undefined)
    }
  }, [searchResults, isPokemonSelected])

  return (
    <>
      <label className="searchbox-label" htmlFor="suggestion-input">Search Pokemon Name (Gen-1):</label>
      <input {...props}
      id="suggestion-input"
      onKeyDown={navigateSelectionsWithKeyboard}
      onChange={handleChange} 
      className="autocomplete-input" 
      type="text" 
      value={searchName}
      role="combobox" 
      aria-autocomplete="both"
      aria-expanded="false" 
      autoComplete='off'
      aria-controls="suggestion-listbox"
      // onBlur={closeSuggestions}
      autoFocus/>
      <ul id="suggestion-listbox" className="suggestions" role="listbox" aria-label="Pokemon" ref={selectedElementRef}>
        {searchResults ? searchResults.map((result, i) => (
          <li 
            id={String(i)} 
            key={`-${result.matchedString}`} 
            onClick={selectAutoSuggestion} 
            role="option"
            className={ activeSuggestion === i ? 'suggestion-active' : ''}
            aria-selected={(activeSuggestion === i)}
          >
            {highlightMatch(result.matchedString, searchName)}
          </li>
        )) : null}
      </ul>
    </>
  )
}


