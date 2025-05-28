"use client"

import { useState, useEffect } from "react"
import { EventCard } from "@/components/event-card"
import { FilterBar } from "@/components/filter-bar"
import { EventService } from "@/services/event.service"
import type { Event, EventCategory } from "@/types/event.interface"
import { Container, Grid, Typography } from "@mui/material"

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<"date" | "name">("date")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const eventsPerPage = 6

  useEffect(() => {
    const loadEvents = () => {
      try {
        const eventService = new EventService()
        const allEvents = eventService.getAllEvents()
        setEvents(allEvents)
        setFilteredEvents(allEvents)
      } catch (error) {
        console.error("Erro ao carregar eventos:", error)
        setEvents([])
        setFilteredEvents([])
      } finally {
        setIsLoaded(true)
      }
    }

    loadEvents()
  }, [refreshKey])

  useEffect(() => {
    if (!events.length) return

    let filtered = [...events]

    // Filtro por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    // Filtro por busca
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower),
      )
    }

    // Ordenação
    filtered = filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
      return a.name.localeCompare(b.name)
    })

    setFilteredEvents(filtered)
    setCurrentPage(1)
  }, [events, selectedCategory, sortBy, searchTerm])

  const handleEventDeleted = () => {
    setRefreshKey((prev) => prev + 1)
  }

  // Paginação
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)

  if (!isLoaded) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "4px solid rgba(255,255,255,0.3)",
            borderTop: "4px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <Typography variant="h5" sx={{ color: "white", fontWeight: 500 }}>
          Carregando eventos...
        </Typography>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        paddingTop: "32px",
        paddingBottom: "64px",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              color: "white",
              mb: 2,
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Eventify Jr.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontWeight: 300,
              mb: 4,
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Descubra eventos incríveis na sua região ✨
          </Typography>

          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Contador de eventos */}
        <div style={{ marginBottom: "32px" }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              textAlign: "center",
              opacity: 0.9,
              fontWeight: 500,
            }}
          >
            {filteredEvents.length} evento{filteredEvents.length !== 1 ? "s" : ""} encontrado
            {filteredEvents.length !== 1 ? "s" : ""}
          </Typography>
        </div>

        {/* Grid de eventos */}
        {currentEvents.length > 0 ? (
          <Grid container spacing={4}>
            {currentEvents.map((event) => (
              <Grid item xs={12} sm={6} lg={4} key={`event-${event.id}`}>
                <EventCard event={event} onEventDeleted={handleEventDeleted} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "64px 32px",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Typography variant="h5" sx={{ color: "white", mb: 2, fontWeight: 600 }}>
              🔍 Nenhum evento encontrado
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)" }}>
              {searchTerm || selectedCategory !== "all"
                ? "Tente ajustar os filtros ou buscar por outros termos"
                : "Ainda não há eventos cadastrados"}
            </Typography>
          </div>
        )}

        {/* Paginação simples */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "16px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{
                  backgroundColor: currentPage === 1 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontWeight: 600,
                }}
              >
                Anterior
              </button>
              <span style={{ color: "white", fontWeight: 600, margin: "0 16px" }}>
                {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                style={{
                  backgroundColor: currentPage === totalPages ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  fontWeight: 600,
                }}
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
