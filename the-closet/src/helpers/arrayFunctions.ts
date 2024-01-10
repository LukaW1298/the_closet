export function sortAlphabetically(array: string[]) {
    function compare(firstString: string, secondString: string) {
        if (firstString.toUpperCase() > secondString.toUpperCase())
            return 1;
        if (firstString.toUpperCase() < secondString.toUpperCase())
            return -1;
        return 0;
    }

    return array.slice().sort(compare);
}

export function sortObjectsAlphabetically<Type>(array: Type[], key: keyof Type) {
    function compare(firstObject: Type, secondObject: Type) {
        
        if (String(firstObject[key]).toUpperCase() > String(secondObject[key]).toUpperCase())
            return 1;
        if (String(firstObject[key]).toUpperCase() < String(secondObject[key]).toUpperCase())
            return -1;
        
        return 0;
    }

    return array.slice().sort(compare);
}
