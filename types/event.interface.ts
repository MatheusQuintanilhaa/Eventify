export type EventCategory = "tecnologia" | "musica" | "workshops" | "esportes" | "arte"

export interface Event {
  id: string
  name: string
  description: string
  category: EventCategory
  date: string
  location: string
  availableSpots: number
  image: string
}
