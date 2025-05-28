import type { Event } from "@/types/event.interface"

export class EventService {
  private storageKey = "eventify-events"

  private getDefaultEvents(): Event[] {
    return [
      {
        id: "1",
        name: "Conferência de Tecnologia 2024",
        description:
          "Uma conferência completa sobre as últimas tendências em tecnologia, incluindo IA, blockchain e desenvolvimento web. Palestrantes renomados compartilharão suas experiências e conhecimentos.",
        category: "tecnologia",
        date: "2024-03-15",
        location: "Centro de Convenções São Paulo",
        availableSpots: 150,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "2",
        name: "Festival de Música Eletrônica",
        description:
          "Uma noite inesquecível com os melhores DJs nacionais e internacionais. Música eletrônica de alta qualidade em um ambiente único.",
        category: "musica",
        date: "2024-03-20",
        location: "Espaço das Américas",
        availableSpots: 500,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "3",
        name: "Workshop de Design UX/UI",
        description:
          "Aprenda os fundamentos do design de experiência do usuário e interface. Workshop prático com exercícios hands-on.",
        category: "workshops",
        date: "2024-03-25",
        location: "Coworking Tech Hub",
        availableSpots: 30,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "4",
        name: "Maratona de São Paulo",
        description:
          "Participe da maior maratona da América Latina. Percurso de 42km pelas principais avenidas da cidade.",
        category: "esportes",
        date: "2024-04-05",
        location: "Ibirapuera - São Paulo",
        availableSpots: 1000,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "5",
        name: "Exposição de Arte Contemporânea",
        description: "Uma exposição única com obras de artistas contemporâneos brasileiros e internacionais.",
        category: "arte",
        date: "2024-04-10",
        location: "Museu de Arte Moderna",
        availableSpots: 200,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "6",
        name: "Hackathon de Inovação",
        description:
          "Evento de 48 horas para desenvolver soluções inovadoras para problemas reais. Prêmios incríveis para os vencedores.",
        category: "tecnologia",
        date: "2024-04-15",
        location: "Campus Universitário",
        availableSpots: 80,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "7",
        name: "Workshop de Fotografia",
        description:
          "Aprenda técnicas avançadas de fotografia com profissionais renomados. Inclui prática em estúdio e externa.",
        category: "workshops",
        date: "2024-04-20",
        location: "Estúdio Fotográfico Central",
        availableSpots: 25,
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "8",
        name: "Show de Rock Nacional",
        description: "Uma noite especial com as melhores bandas de rock nacional. Nostalgia e energia em um só lugar.",
        category: "musica",
        date: "2024-04-25",
        location: "Arena Anhembi",
        availableSpots: 300,
        image: "/placeholder.svg?height=300&width=400",
      },
    ]
  }

  getAllEvents(): Event[] {
    if (typeof window === "undefined") return this.getDefaultEvents()

    const stored = localStorage.getItem(this.storageKey)
    if (!stored) {
      const defaultEvents = this.getDefaultEvents()
      localStorage.setItem(this.storageKey, JSON.stringify(defaultEvents))
      return defaultEvents
    }
    return JSON.parse(stored)
  }

  getEventById(id: string): Event | null {
    const events = this.getAllEvents()
    return events.find((event) => event.id === id) || null
  }

  getEventsByCategory(category: string): Event[] {
    const events = this.getAllEvents()
    return events.filter((event) => event.category === category)
  }

  addEvent(event: Event): void {
    console.log("EventService.addEvent chamado com:", event)

    if (typeof window === "undefined") {
      console.log("Window undefined, retornando...")
      return
    }

    try {
      const events = this.getAllEvents()
      console.log("Eventos existentes antes de adicionar:", events)

      events.unshift(event) // Adiciona no início da lista
      console.log("Eventos após adicionar:", events)

      localStorage.setItem(this.storageKey, JSON.stringify(events))
      console.log("Eventos salvos no localStorage com chave:", this.storageKey)

      // Verificar se foi realmente salvo
      const saved = localStorage.getItem(this.storageKey)
      console.log("Verificação - dados salvos:", saved)
    } catch (error) {
      console.error("Erro em addEvent:", error)
      throw error
    }
  }

  updateEvent(updatedEvent: Event): void {
    if (typeof window === "undefined") return

    const events = this.getAllEvents()
    const index = events.findIndex((event) => event.id === updatedEvent.id)
    if (index !== -1) {
      events[index] = updatedEvent
      localStorage.setItem(this.storageKey, JSON.stringify(events))
    }
  }

  deleteEvent(id: string): void {
    if (typeof window === "undefined") return

    const events = this.getAllEvents()
    const filteredEvents = events.filter((event) => event.id !== id)
    localStorage.setItem(this.storageKey, JSON.stringify(filteredEvents))
  }
}
