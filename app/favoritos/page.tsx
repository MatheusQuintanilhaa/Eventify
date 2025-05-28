"use client"

import { useState, useEffect } from "react"
import { EventCard } from "@/components/event-card"
import { EventService } from "@/services/event.service"
import { FavoritesService } from "@/services/favorites.service"
import type { Event } from "@/types/event.interface"
import { Container, Typography, Box, Grid, Button } from "@mui/material"
import { Favorite, ArrowBack } from "@mui/icons-material"
import Link from "next/link"

export default function FavoritesPage() {
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    loadFavoriteEvents()
  }, [])

  const loadFavoriteEvents = () => {
    const favoritesService = new FavoritesService()
    const eventService = new EventService()

    const favoriteIds = favoritesService.getAllFavorites()
    const allEvents = eventService.getAllEvents()

    const favorites = allEvents.filter((event) => favoriteIds.includes(event.id))
    setFavoriteEvents(favorites)
    setIsLoaded(true)
  }

  const handleEventDeleted = () => {
    loadFavoriteEvents()
  }

  if (!isLoaded) {
    return (
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          Carregando favoritos...
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Favorite sx={{ fontSize: 48, color: "white", mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              color: "white",
              mb: 2,
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            Meus Favoritos
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontWeight: 300,
              mb: 4,
            }}
          >
            Eventos que você curtiu ❤️
          </Typography>

          <Button
            component={Link}
            href="/"
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Voltar aos Eventos
          </Button>
        </Box>

        {favoriteEvents.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Typography variant="h5" sx={{ color: "white", mb: 2, fontWeight: 600 }}>
              💔 Nenhum evento favoritado ainda
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
              Explore os eventos e clique no coração para adicionar aos favoritos!
            </Typography>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
              }}
            >
              Explorar Eventos
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  textAlign: "center",
                  opacity: 0.9,
                  fontWeight: 500,
                }}
              >
                {favoriteEvents.length} evento{favoriteEvents.length !== 1 ? "s" : ""} favoritado
                {favoriteEvents.length !== 1 ? "s" : ""}
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {favoriteEvents.map((event) => (
                <Grid item xs={12} sm={6} lg={4} key={event.id}>
                  <EventCard event={event} onEventDeleted={handleEventDeleted} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  )
}
