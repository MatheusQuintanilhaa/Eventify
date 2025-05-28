"use client"

import { useEffect } from "react"
import { Typography } from "@mui/material"
import { CheckCircle, Error, Warning, Info } from "@mui/icons-material"

interface CustomToastProps {
  open: boolean
  onClose: () => void
  message: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
}

export function CustomToast({ open, onClose, message, type = "info", duration = 3000 }: CustomToastProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [open, duration, onClose])

  if (!open) return null

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle sx={{ fontSize: 24, color: "#10b981" }} />
      case "error":
        return <Error sx={{ fontSize: 24, color: "#ef4444" }} />
      case "warning":
        return <Warning sx={{ fontSize: 24, color: "#f59e0b" }} />
      default:
        return <Info sx={{ fontSize: 24, color: "#3b82f6" }} />
    }
  }

  const getColors = () => {
    switch (type) {
      case "success":
        return { bg: "#dcfce7", border: "#10b981", text: "#065f46" }
      case "error":
        return { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" }
      case "warning":
        return { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" }
      default:
        return { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" }
    }
  }

  const colors = getColors()

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        animation: "toastSlideIn 0.3s ease-out",
      }}
    >
      <style jsx>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          backgroundColor: colors.bg,
          border: `2px solid ${colors.border}`,
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(10px)",
          maxWidth: "400px",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        {getIcon()}
        <Typography
          variant="body1"
          sx={{
            color: colors.text,
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          {message}
        </Typography>
      </div>
    </div>
  )
}
