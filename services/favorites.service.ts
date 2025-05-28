export class FavoritesService {
  private storageKey = "eventify-favorites"

  getAllFavorites(): string[] {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem(this.storageKey)
    return stored ? JSON.parse(stored) : []
  }

  isFavorite(eventId: string): boolean {
    const favorites = this.getAllFavorites()
    return favorites.includes(eventId)
  }

  toggleFavorite(eventId: string): boolean {
    if (typeof window === "undefined") return false

    const favorites = this.getAllFavorites()
    const index = favorites.indexOf(eventId)

    if (index === -1) {
      favorites.push(eventId)
    } else {
      favorites.splice(index, 1)
    }

    localStorage.setItem(this.storageKey, JSON.stringify(favorites))
    return index === -1 // retorna true se foi adicionado aos favoritos
  }

  getFavoriteEvents(): string[] {
    return this.getAllFavorites()
  }
}
