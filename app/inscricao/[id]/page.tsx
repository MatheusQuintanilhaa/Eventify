"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { EventService } from "@/services/event.service"
import { RegistrationService } from "@/services/registration.service"
import type { Event } from "@/types/event.interface"
import type { Registration } from "@/types/registration.interface"
import { Container, Card, CardContent, Typography, TextField, Button, Box, Alert, Snackbar } from "@mui/material"

interface FormData {
  name: string
  email: string
  phone: string
}

export default function RegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  useEffect(() => {
    const eventService = new EventService()
    const eventData = eventService.getEventById(params.id as string)
    setEvent(eventData)
  }, [params.id])

  const onSubmit = async (data: FormData) => {
    if (!event) return

    setIsSubmitting(true)

    const registration: Registration = {
      id: Date.now().toString(),
      eventId: event.id,
      eventName: event.name,
      eventDate: event.date,
      eventImage: event.image,
      userName: data.name,
      userEmail: data.email,
      userPhone: data.phone,
      registrationDate: new Date().toISOString(),
    }

    const registrationService = new RegistrationService()
    registrationService.addRegistration(registration)

    setIsSubmitting(false)
    setShowSuccess(true)

    setTimeout(() => {
      router.push("/meus-eventos")
    }, 2000)
  }

  if (!event) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h6" align="center">
          Evento não encontrado
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Inscrição no Evento
          </Typography>

          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              {event.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(event.date).toLocaleDateString("pt-BR")} • {event.location}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Nome é obrigatório",
                  minLength: { value: 2, message: "Nome deve ter pelo menos 2 caracteres" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome Completo"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "E-mail inválido",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="E-mail"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Telefone é obrigatório",
                  pattern: {
                    value: /^[\d\s$$$$\-+]+$/,
                    message: "Telefone inválido",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Telefone"
                    variant="outlined"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    placeholder="(11) 99999-9999"
                  />
                )}
              />

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="outlined" fullWidth onClick={() => router.back()} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? "Inscrevendo..." : "Confirmar Inscrição"}
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Inscrição realizada com sucesso! Redirecionando...
        </Alert>
      </Snackbar>
    </Container>
  )
}
