import React from 'react';

export function highlightMatch(text: string, match: string): JSX.Element[] {
  const position = text.toLocaleLowerCase().indexOf(match.toLocaleLowerCase());
  const unwrappedText = text.split("").map((character, index) => {
    if(index > position + match.length - 1 || index < position ) {
      return <span key={String(index) + character}>{character}</span>
    } else {
      return <b key={String(index) + character} className='matched-characters'>{character}</b>
    }
  } );
  return unwrappedText
}