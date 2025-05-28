"use client"

import type React from "react"
import type { EventCategory } from "@/types/event.interface"
import { TextField, InputAdornment, Typography } from "@mui/material"
import {
  Search,
  Computer,
  MusicNote,
  Build,
  SportsBasketball,
  Palette,
  CalendarToday,
  SortByAlpha,
  FilterList,
} from "@mui/icons-material"

interface FilterBarProps {
  selectedCategory: EventCategory | "all"
  onCategoryChange: (category: EventCategory | "all") => void
  sortBy: "date" | "name"
  onSortChange: (sort: "date" | "name") => void
  searchTerm: string
  onSearchChange: (search: string) => void
}

const categories: { value: EventCategory | "all"; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "all", label: "Todos", icon: <FilterList />, color: "#6366f1" },
  { value: "tecnologia", label: "Tecnologia", icon: <Computer />, color: "#3b82f6" },
  { value: "musica", label: "Música", icon: <MusicNote />, color: "#ec4899" },
  { value: "workshops", label: "Workshops", icon: <Build />, color: "#f59e0b" },
  { value: "esportes", label: "Esportes", icon: <SportsBasketball />, color: "#10b981" },
  { value: "arte", label: "Arte", icon: <Palette />, color: "#8b5cf6" },
]

export function FilterBar({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div
      style={{
        padding: "32px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      {/* Busca */}
      <div style={{ marginBottom: "32px" }}>
        <TextField
          fullWidth
          placeholder="Buscar eventos por nome, descrição ou local..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 3,
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255,255,255,0.8)",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "white",
              fontSize: "1.1rem",
              "&::placeholder": {
                color: "rgba(255,255,255,0.7)",
                opacity: 1,
              },
            },
          }}
        />
      </div>

      {/* Categorias */}
      <div style={{ marginBottom: "32px" }}>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            mb: 2,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FilterList /> Categorias
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                fontSize: "1rem",
                fontWeight: 600,
                height: "48px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: selectedCategory === category.value ? category.color : "rgba(255,255,255,0.1)",
                color: "white",
                transform: selectedCategory === category.value ? "scale(1.05)" : "scale(1)",
                boxShadow: selectedCategory === category.value ? `0 4px 20px ${category.color}40` : "none",
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.value) {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.value) {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }
              }}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ordenação */}
      <div>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            mb: 2,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SortByAlpha /> Ordenar por
        </Typography>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => onSortChange("date")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              backgroundColor: sortBy === "date" ? "rgba(255,255,255,0.2)" : "transparent",
            }}
          >
            <CalendarToday />
            Data
          </button>
          <button
            onClick={() => onSortChange("name")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              backgroundColor: sortBy === "name" ? "rgba(255,255,255,0.2)" : "transparent",
            }}
          >
            <SortByAlpha />
            Nome
          </button>
        </div>
      </div>
    </div>
  )
}
