"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { EventService } from "@/services/event.service"
import type { Event, EventCategory } from "@/types/event.interface"
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  FormHelperText,
  InputLabel,
} from "@mui/material"
import { Event as EventIcon, Save, Cancel } from "@mui/icons-material"
import { CustomModal } from "@/components/custom-modal"
import { CustomToast } from "@/components/custom-toast"

interface FormData {
  name: string
  description: string
  category: EventCategory
  date: string
  location: string
  availableSpots: number
  image: string
}

const categories: { value: EventCategory; label: string }[] = [
  { value: "tecnologia", label: "Tecnologia" },
  { value: "musica", label: "Música" },
  { value: "workshops", label: "Workshops" },
  { value: "esportes", label: "Esportes" },
  { value: "arte", label: "Arte" },
]

export default function CreateEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [toast, setToast] = useState<{
    open: boolean
    message: string
    type: "success" | "error" | "warning" | "info"
  }>({
    open: false,
    message: "",
    type: "success",
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      category: "tecnologia",
      date: "",
      location: "",
      availableSpots: 50,
      image: "",
    },
  })

  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "success") => {
    setToast({ open: true, message, type })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, open: false }))
  }

  // Adicionar esta função de teste no início do componente, após os imports
  const testEventService = () => {
    console.log("Testando EventService...")
    const eventService = new EventService()

    // Verificar se consegue ler eventos
    const events = eventService.getAllEvents()
    console.log("Eventos existentes:", events)

    // Testar criação de um evento simples
    const testEvent: Event = {
      id: "test_" + Date.now(),
      name: "Evento Teste",
      description: "Descrição teste",
      category: "tecnologia",
      date: "2024-12-31",
      location: "Local teste",
      availableSpots: 10,
      image: "/placeholder.svg?height=300&width=400",
    }

    try {
      eventService.addEvent(testEvent)
      console.log("Evento teste criado com sucesso!")

      // Verificar se foi salvo
      const updatedEvents = eventService.getAllEvents()
      console.log("Eventos após teste:", updatedEvents)
    } catch (error) {
      console.error("Erro no teste:", error)
    }
  }

  const onSubmit = async (data: FormData) => {
    console.log("Dados do formulário:", data) // Debug

    try {
      setIsSubmitting(true)

      // Validações básicas
      if (!data.name?.trim()) {
        throw new Error("Nome do evento é obrigatório")
      }
      if (!data.date) {
        throw new Error("Data do evento é obrigatória")
      }
      if (!data.location?.trim()) {
        throw new Error("Local do evento é obrigatório")
      }
      if (!data.description?.trim()) {
        throw new Error("Descrição do evento é obrigatória")
      }
      if (!data.availableSpots || data.availableSpots < 1) {
        throw new Error("Número de vagas deve ser maior que 0")
      }

      // Criar o evento
      const newEvent: Event = {
        id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name.trim(),
        description: data.description.trim(),
        category: data.category,
        date: data.date,
        location: data.location.trim(),
        availableSpots: Number(data.availableSpots),
        image: data.image?.trim() || "/placeholder.svg?height=300&width=400",
      }

      console.log("Evento a ser criado:", newEvent) // Debug

      // Salvar no localStorage
      const eventService = new EventService()
      eventService.addEvent(newEvent)

      console.log("Evento salvo com sucesso!") // Debug

      // Verificar se foi salvo
      const allEvents = eventService.getAllEvents()
      console.log("Todos os eventos após salvar:", allEvents) // Debug

      // Mostrar sucesso
      setShowSuccessModal(true)
      reset()
    } catch (error) {
      console.error("Erro ao criar evento:", error)
      showToast(error instanceof Error ? error.message : "Erro ao criar evento", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false)
    router.push("/")
  }

  // Obter a data mínima (hoje)
  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              mb: 4,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <EventIcon sx={{ fontSize: 48, color: "white", mb: 2 }} />
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
                Criar Novo Evento
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 300,
                }}
              >
                Preencha as informações do seu evento
              </Typography>
            </Box>
          </Paper>

          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  {/* Nome do Evento */}
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: "Nome do evento é obrigatório",
                        minLength: { value: 3, message: "Nome deve ter pelo menos 3 caracteres" },
                        maxLength: { value: 100, message: "Nome deve ter no máximo 100 caracteres" },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Nome do Evento *"
                          variant="outlined"
                          fullWidth
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          placeholder="Ex: Conferência de Tecnologia 2024"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1.1rem",
                              minHeight: 64,
                              "& input": {
                                padding: "20px 16px",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "1.1rem",
                              fontWeight: 600,
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "0.9rem",
                              marginTop: "8px",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Categoria e Data */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: "Categoria é obrigatória" }}
                      render={({ field }) => (
                        <Box>
                          <InputLabel
                            sx={{
                              fontSize: "1.1rem",
                              fontWeight: 600,
                              color: "#374151",
                              mb: 1,
                            }}
                          >
                            Categoria *
                          </InputLabel>
                          <Box
                            sx={{
                              border: errors.category ? "2px solid #ef4444" : "1px solid #d1d5db",
                              borderRadius: 3,
                              minHeight: 64,
                              display: "flex",
                              alignItems: "center",
                              padding: "4px",
                              backgroundColor: "#fff",
                              "&:focus-within": {
                                borderColor: "#667eea",
                                boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                width: "100%",
                                padding: "8px 12px",
                              }}
                            >
                              {categories.map((category) => (
                                <Box
                                  key={category.value}
                                  onClick={() => field.onChange(category.value)}
                                  sx={{
                                    padding: "8px 16px",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    transition: "all 0.2s ease",
                                    backgroundColor:
                                      field.value === category.value ? "#667eea" : "rgba(102, 126, 234, 0.1)",
                                    color: field.value === category.value ? "white" : "#667eea",
                                    border: `1px solid ${field.value === category.value ? "#667eea" : "transparent"}`,
                                    "&:hover": {
                                      backgroundColor:
                                        field.value === category.value ? "#5a67d8" : "rgba(102, 126, 234, 0.2)",
                                      transform: "translateY(-1px)",
                                    },
                                  }}
                                >
                                  {category.label}
                                </Box>
                              ))}
                            </Box>
                          </Box>
                          {errors.category && (
                            <FormHelperText error sx={{ fontSize: "0.9rem", marginTop: "8px", marginLeft: "14px" }}>
                              {errors.category.message}
                            </FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="date"
                      control={control}
                      rules={{
                        required: "Data é obrigatória",
                        validate: (value) => {
                          if (new Date(value) < new Date(today)) {
                            return "A data deve ser hoje ou no futuro"
                          }
                          return true
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Data do Evento *"
                          type="date"
                          variant="outlined"
                          fullWidth
                          error={!!errors.date}
                          helperText={errors.date?.message}
                          inputProps={{
                            min: today,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1.1rem",
                              minHeight: 64,
                              "& input": {
                                padding: "20px 16px",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "1.1rem",
                              fontWeight: 600,
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "0.9rem",
                              marginTop: "8px",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Local */}
                  <Grid item xs={12}>
                    <Controller
                      name="location"
                      control={control}
                      rules={{
                        required: "Local é obrigatório",
                        minLength: { value: 5, message: "Local deve ter pelo menos 5 caracteres" },
                        maxLength: { value: 200, message: "Local deve ter no máximo 200 caracteres" },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Local do Evento *"
                          variant="outlined"
                          fullWidth
                          error={!!errors.location}
                          helperText={errors.location?.message}
                          placeholder="Ex: Centro de Convenções São Paulo"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1.1rem",
                              minHeight: 64,
                              "& input": {
                                padding: "20px 16px",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "1.1rem",
                              fontWeight: 600,
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "0.9rem",
                              marginTop: "8px",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Vagas e URL da Imagem */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="availableSpots"
                      control={control}
                      rules={{
                        required: "Número de vagas é obrigatório",
                        min: { value: 1, message: "Deve ter pelo menos 1 vaga" },
                        max: { value: 10000, message: "Máximo de 10.000 vagas" },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Número de Vagas *"
                          type="number"
                          variant="outlined"
                          fullWidth
                          error={!!errors.availableSpots}
                          helperText={errors.availableSpots?.message}
                          inputProps={{
                            min: 1,
                            max: 10000,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1.1rem",
                              minHeight: 64,
                              "& input": {
                                padding: "20px 16px",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "1.1rem",
                              fontWeight: 600,
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "0.9rem",
                              marginTop: "8px",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="image"
                      control={control}
                      rules={{
                        pattern: {
                          value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                          message: "URL inválida",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="URL da Imagem (opcional)"
                          variant="outlined"
                          fullWidth
                          error={!!errors.image}
                          helperText={errors.image?.message || "Deixe vazio para usar imagem padrão"}
                          placeholder="https://exemplo.com/imagem.jpg"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1.1rem",
                              minHeight: 64,
                              "& input": {
                                padding: "20px 16px",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "1.1rem",
                              fontWeight: 600,
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "0.9rem",
                              marginTop: "8px",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Descrição */}
                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      rules={{
                        required: "Descrição é obrigatória",
                        minLength: { value: 20, message: "Descrição deve ter pelo menos 20 caracteres" },
                        maxLength: { value: 1000, message: "Descrição deve ter no máximo 1000 caracteres" },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Descrição do Evento *"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          error={!!errors.description}
                          helperText={
                            errors.description?.message || `${watch("description")?.length || 0}/1000 caracteres`
                          }
                          placeholder="Descreva detalhadamente o que será abordado no evento, público-alvo, programação, etc..."
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              fontSize: "1.1rem",
                              "& textarea": {
                                padding: "20px 16px",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "1.1rem",
                              fontWeight: 600,
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "0.9rem",
                              marginTop: "8px",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Botões */}
                  <Grid item xs={12}>
                    <Button onClick={testEventService} variant="outlined" sx={{ mb: 2 }}>
                      Testar EventService (Debug)
                    </Button>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Cancel />}
                        onClick={() => router.back()}
                        disabled={isSubmitting}
                        sx={{
                          borderRadius: 3,
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: "none",
                          fontSize: "1.1rem",
                          minWidth: 140,
                          minHeight: 56,
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Save />}
                        disabled={isSubmitting}
                        sx={{
                          borderRadius: 3,
                          px: 4,
                          py: 1.5,
                          fontWeight: 700,
                          textTransform: "none",
                          fontSize: "1.1rem",
                          minWidth: 140,
                          minHeight: 56,
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 25px rgba(102, 126, 234, 0.5)",
                          },
                          "&:disabled": {
                            background: "#e2e8f0",
                            color: "#64748b",
                            transform: "none",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {isSubmitting ? "Criando..." : "Criar Evento"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Modal de sucesso */}
      <CustomModal
        open={showSuccessModal}
        onClose={handleSuccessConfirm}
        title="Evento Criado com Sucesso!"
        message="Seu evento foi criado e já está disponível para inscrições. Você será redirecionado para a página inicial."
        type="success"
        confirmText="Ver Eventos"
        onConfirm={handleSuccessConfirm}
      />

      {/* Toast de notificação */}
      <CustomToast open={toast.open} onClose={hideToast} message={toast.message} type={toast.type} />
    </>
  )
}
