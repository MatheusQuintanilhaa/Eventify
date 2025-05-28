"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { EventService } from "@/services/event.service"
import type { Event } from "@/types/event.interface"
import { Container, Card, CardMedia, CardContent, Typography, Button, Box, Chip, Grid, Paper } from "@mui/material"
import { CalendarToday, LocationOn, People, Category } from "@mui/icons-material"

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    const eventService = new EventService()
    const eventData = eventService.getEventById(params.id as string)
    setEvent(eventData)
  }, [params.id])

  if (!event) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6" align="center">
          Evento não encontrado
        </Typography>
      </Container>
    )
  }

  const handleRegister = () => {
    router.push(`/inscricao/${event.id}`)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={event.image}
          alt={event.name}
          sx={{
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#1e293b",
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              {event.name}
            </Typography>
            <Chip
              label={event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              color="primary"
              icon={<Category />}
              sx={{
                mb: 2,
                px: 2,
                py: 1,
                fontSize: "1rem",
                fontWeight: 600,
                height: 40,
              }}
            />
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CalendarToday sx={{ mr: 2, color: "primary.main", fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Data
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#475569" }}>
                  {new Date(event.date).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOn sx={{ mr: 2, color: "primary.main", fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Local
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#475569" }}>
                  {event.location}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <People sx={{ mr: 2, color: "primary.main", fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Vagas Disponíveis
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#475569" }}>
                  {event.availableSpots} vagas
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#1e293b",
              }}
            >
              Sobre o Evento
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "#475569",
              }}
            >
              {event.description}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.back()}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleRegister}
              disabled={event.availableSpots === 0}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 25px rgba(102, 126, 234, 0.5)",
                },
              }}
            >
              {event.availableSpots === 0 ? "Esgotado" : "Inscreva-se"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
