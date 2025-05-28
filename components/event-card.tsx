"use client"

import { useState, useEffect } from "react"
import type { Event } from "@/types/event.interface"
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Avatar, IconButton } from "@mui/material"
import {
  CalendarToday,
  LocationOn,
  People,
  Computer,
  MusicNote,
  Build,
  SportsBasketball,
  Palette,
  Favorite,
  FavoriteBorder,
  Share,
  Delete,
} from "@mui/icons-material"
import Link from "next/link"
import { FavoritesService } from "@/services/favorites.service"
import { EventService } from "@/services/event.service"
import { CustomModal } from "@/components/custom-modal"
import { CustomToast } from "@/components/custom-toast"

interface EventCardProps {
  event: Event
  onEventDeleted?: () => void
}

const categoryIcons = {
  tecnologia: <Computer />,
  musica: <MusicNote />,
  workshops: <Build />,
  esportes: <SportsBasketball />,
  arte: <Palette />,
}

const categoryColors = {
  tecnologia: "#3b82f6",
  musica: "#ec4899",
  workshops: "#f59e0b",
  esportes: "#10b981",
  arte: "#8b5cf6",
}

export function EventCard({ event, onEventDeleted }: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toast, setToast] = useState<{
    open: boolean
    message: string
    type: "success" | "error" | "warning" | "info"
  }>({
    open: false,
    message: "",
    type: "success",
  })

  const categoryIcon = categoryIcons[event.category]
  const categoryColor = categoryColors[event.category]

  useEffect(() => {
    try {
      const favoritesService = new FavoritesService()
      setIsFavorite(favoritesService.isFavorite(event.id))
    } catch (error) {
      console.error("Erro ao verificar favorito:", error)
    }
  }, [event.id])

  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "success") => {
    setToast({ open: true, message, type })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, open: false }))
  }

  const handleToggleFavorite = () => {
    try {
      const favoritesService = new FavoritesService()
      const wasAdded = favoritesService.toggleFavorite(event.id)
      setIsFavorite(wasAdded)

      showToast(
        wasAdded ? "Evento adicionado aos favoritos! ❤️" : "Evento removido dos favoritos",
        wasAdded ? "success" : "info",
      )
    } catch (error) {
      console.error("Erro ao alterar favorito:", error)
      showToast("Erro ao alterar favorito", "error")
    }
  }

  const handleDeleteEvent = async () => {
    try {
      setIsDeleting(true)

      const eventService = new EventService()
      eventService.deleteEvent(event.id)

      // Remove dos favoritos também
      const favoritesService = new FavoritesService()
      if (favoritesService.isFavorite(event.id)) {
        favoritesService.toggleFavorite(event.id)
      }

      setShowDeleteModal(false)
      showToast("Evento deletado com sucesso!", "success")

      // Chama callback para atualizar a lista após um delay
      setTimeout(() => {
        if (onEventDeleted) {
          onEventDeleted()
        }
      }, 1500)
    } catch (error) {
      console.error("Erro ao deletar evento:", error)
      showToast("Erro ao deletar evento", "error")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleShare = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: event.name,
          text: event.description,
          url: window.location.href,
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
        showToast("Link copiado para a área de transferência!", "info")
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error)
      showToast("Erro ao compartilhar evento", "error")
    }
  }

  return (
    <>
      <Card
        elevation={0}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          overflow: "hidden",
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            "& .card-media": {
              transform: "scale(1.05)",
            },
            "& .card-actions": {
              transform: "translateY(0)",
              opacity: 1,
            },
          },
        }}
      >
        {/* Header com ações */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 2,
            display: "flex",
            gap: "8px",
          }}
        >
          <IconButton
            size="small"
            onClick={handleToggleFavorite}
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            }}
          >
            {isFavorite ? <Favorite fontSize="small" sx={{ color: "#ec4899" }} /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              "&:disabled": { opacity: 0.5 },
            }}
          >
            <Delete fontSize="small" sx={{ color: "#ef4444" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleShare}
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            }}
          >
            <Share fontSize="small" />
          </IconButton>
        </div>

        {/* Imagem */}
        <div style={{ position: "relative", overflow: "hidden", height: "240px" }}>
          <CardMedia
            component="img"
            height="240"
            image={event.image}
            alt={event.name}
            className="card-media"
            sx={{
              transition: "transform 0.4s ease",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              height: "80px",
            }}
          />
        </div>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {/* Categoria */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 12px",
                borderRadius: "12px",
                backgroundColor: `${categoryColor}15`,
                color: categoryColor,
                fontWeight: 600,
                border: `1px solid ${categoryColor}30`,
                fontSize: "0.875rem",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: categoryColor,
                  width: 24,
                  height: 24,
                  "& .MuiSvgIcon-root": { fontSize: 14 },
                }}
              >
                {categoryIcon}
              </Avatar>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </div>
          </div>

          {/* Título */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#1e293b",
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {event.name}
          </Typography>

          {/* Informações */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CalendarToday sx={{ fontSize: 18, color: "#64748b" }} />
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                {new Date(event.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <LocationOn sx={{ fontSize: 18, color: "#64748b" }} />
              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {event.location}
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <People sx={{ fontSize: 18, color: "#64748b" }} />
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                {event.availableSpots} vagas
              </Typography>
              {event.availableSpots < 50 && (
                <span
                  style={{
                    backgroundColor: "#fef3c7",
                    color: "#d97706",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Últimas vagas!
                </span>
              )}
            </div>
          </div>
        </CardContent>

        {/* Ações */}
        <CardActions
          className="card-actions"
          sx={{
            p: 3,
            pt: 0,
            transform: "translateY(10px)",
            opacity: 0.8,
            transition: "all 0.3s ease",
          }}
        >
          <Button
            component={Link}
            href={`/evento/${event.id}`}
            variant="contained"
            fullWidth
            size="large"
            disabled={event.availableSpots === 0}
            sx={{
              borderRadius: 3,
              py: 1.5,
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              background:
                event.availableSpots === 0
                  ? "#e2e8f0"
                  : `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)`,
              color: event.availableSpots === 0 ? "#64748b" : "white",
              boxShadow: event.availableSpots === 0 ? "none" : `0 4px 20px ${categoryColor}40`,
              "&:hover": {
                background:
                  event.availableSpots === 0
                    ? "#e2e8f0"
                    : `linear-gradient(135deg, ${categoryColor}dd 0%, ${categoryColor} 100%)`,
                transform: "translateY(-2px)",
                boxShadow: event.availableSpots === 0 ? "none" : `0 6px 25px ${categoryColor}50`,
              },
            }}
          >
            {event.availableSpots === 0 ? "Esgotado" : "Ver Detalhes"}
          </Button>
        </CardActions>
      </Card>

      {/* Modal de confirmação de exclusão */}
      <CustomModal
        open={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja deletar o evento "${event.name}"? Esta ação não pode ser desfeita.`}
        type="warning"
        confirmText={isDeleting ? "Deletando..." : "Deletar"}
        cancelText="Cancelar"
        onConfirm={handleDeleteEvent}
        showCancel={true}
      />

      {/* Toast de notificação */}
      <CustomToast open={toast.open} onClose={hideToast} message={toast.message} type={toast.type} />
    </>
  )
}
