export function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export class Keys {
    static get moviesLongFilmsKey() {
        return 'moviesLongFilmsKey'
    }

    static get searchQueryKey() {
        return `searchQuery`
    }

    static get shortsSwitcherKey() {
        return `shortsSwitcher`
    }

    static get moviesShortFilmsKey() {
        return 'moviesShortFilms'
    }

    static get moviesSavedLongFilmsKey() {
        return 'moviesSavedLongFilms'
    }

    static get moviesSavedShortFilmsKey() {
        return 'moviesSavedShortFilms'
    }
}