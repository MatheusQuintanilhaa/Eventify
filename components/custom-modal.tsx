"use client"

import { useEffect } from "react"
import { Typography, Button } from "@mui/material"
import { CheckCircle, Error, Warning, Info } from "@mui/icons-material"

interface CustomModalProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  type?: "success" | "error" | "warning" | "info"
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  showCancel?: boolean
}

export function CustomModal({
  open,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "OK",
  cancelText = "Cancelar",
  onConfirm,
  showCancel = false,
}: CustomModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle sx={{ fontSize: 48, color: "#10b981" }} />
      case "error":
        return <Error sx={{ fontSize: 48, color: "#ef4444" }} />
      case "warning":
        return <Warning sx={{ fontSize: 48, color: "#f59e0b" }} />
      default:
        return <Info sx={{ fontSize: 48, color: "#3b82f6" }} />
    }
  }

  const getColors = () => {
    switch (type) {
      case "success":
        return { primary: "#10b981", secondary: "#dcfce7" }
      case "error":
        return { primary: "#ef4444", secondary: "#fee2e2" }
      case "warning":
        return { primary: "#f59e0b", secondary: "#fef3c7" }
      default:
        return { primary: "#3b82f6", secondary: "#dbeafe" }
    }
  }

  const colors = getColors()

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: "20px",
          padding: "32px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          animation: "modalSlideIn 0.3s ease-out",
        }}
      >
        <style jsx>{`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>

        {/* Ícone */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: colors.secondary,
              marginBottom: "16px",
            }}
          >
            {getIcon()}
          </div>
        </div>

        {/* Título */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1e293b",
            textAlign: "center",
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {/* Mensagem */}
        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
            textAlign: "center",
            lineHeight: 1.6,
            mb: 4,
          }}
        >
          {message}
        </Typography>

        {/* Botões */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {showCancel && (
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                minWidth: 100,
                borderColor: "#e2e8f0",
                color: "#64748b",
                "&:hover": {
                  borderColor: "#cbd5e1",
                  backgroundColor: "#f8fafc",
                },
              }}
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => {
              if (onConfirm) {
                onConfirm()
              } else {
                onClose()
              }
            }}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.5,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
              minWidth: 100,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
              boxShadow: `0 4px 20px ${colors.primary}40`,
              "&:hover": {
                background: `linear-gradient(135deg, ${colors.primary}dd 0%, ${colors.primary} 100%)`,
                transform: "translateY(-2px)",
                boxShadow: `0 6px 25px ${colors.primary}50`,
              },
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
