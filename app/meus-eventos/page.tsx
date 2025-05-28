"use client"

import { useState, useEffect } from "react"
import { RegistrationService } from "@/services/registration.service"
import type { Registration } from "@/types/registration.interface"
import { Container, Typography, Card, CardContent, CardMedia, Box, Grid, Chip, Button } from "@mui/material"
import { CalendarToday, Email, Phone } from "@mui/icons-material"
import Link from "next/link"

export default function MyEventsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])

  useEffect(() => {
    const registrationService = new RegistrationService()
    const userRegistrations = registrationService.getAllRegistrations()
    setRegistrations(userRegistrations)
  }, [])

  if (registrations.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Meus Eventos
        </Typography>

        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "grey.50",
            borderRadius: 2,
            mt: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Você ainda não se inscreveu em nenhum evento
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Explore nossos eventos e faça sua primeira inscrição!
          </Typography>
          <Button component={Link} href="/" variant="contained" size="large">
            Explorar Eventos
          </Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Meus Eventos
      </Typography>

      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Você tem {registrations.length} inscrição{registrations.length !== 1 ? "ões" : ""}
      </Typography>

      <Grid container spacing={3}>
        {registrations.map((registration) => (
          <Grid item xs={12} md={6} key={registration.id}>
            <Card elevation={2} sx={{ height: "100%" }}>
              <CardMedia component="img" height="200" image={registration.eventImage} alt={registration.eventName} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {registration.eventName}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CalendarToday sx={{ mr: 1, fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(registration.eventDate).toLocaleDateString("pt-BR")}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Dados da Inscrição:
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="body2">
                      <strong>Nome:</strong> {registration.userName}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Email sx={{ mr: 1, fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{registration.userEmail}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Phone sx={{ mr: 1, fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{registration.userPhone}</Typography>
                  </Box>
                </Box>

                <Chip
                  label={`Inscrito em ${new Date(registration.registrationDate).toLocaleDateString("pt-BR")}`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
