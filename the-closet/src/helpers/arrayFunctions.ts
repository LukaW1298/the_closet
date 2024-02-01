export function sortAlphabetically(array: string[]) {
  function compare(firstString: string, secondString: string) {
    if (firstString.toUpperCase() > secondString.toUpperCase())
      return 1;
    if (firstString.toUpperCase() < secondString.toUpperCase())
      return -1;

    return 0;
  }

  return [...array].sort(compare);
}

export function sortObjectsAlphabetically<Type>(array: Type[], key: keyof Type) {
  function compare(firstObject: Type, secondObject: Type) {
        
    if (String(firstObject[key]).toUpperCase() > String(secondObject[key]).toUpperCase())
      return 1;
    if (String(firstObject[key]).toUpperCase() < String(secondObject[key]).toUpperCase())
      return -1;
        
    return 0;
  }

  return [...array].sort(compare);
}

export function sortOutfitsByDate(outfits) {
  function compare(first, second) {
    if (first.date < second.date)
      return 1;
    if (first.date > second.date)
      return -1;

    return 0;
  }

  return [...outfits].sort(compare);
}