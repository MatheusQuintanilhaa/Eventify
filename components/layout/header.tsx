"use client"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme as useMuiTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material"
import { Menu as MenuIcon, Home, Event, Close, EventAvailable, Add } from "@mui/icons-material"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: "Eventos", href: "/", icon: <Home /> },
    { label: "Criar Evento", href: "/criar-evento", icon: <Add /> },
    { label: "Meus Eventos", href: "/meus-eventos", icon: <EventAvailable /> },
  ]

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                mr: 2,
                width: 40,
                height: 40,
              }}
            >
              <Event sx={{ color: "white" }} />
            </Avatar>
            <Typography
              variant="h5"
              component={Link}
              href="/"
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: 800,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                background: "linear-gradient(45deg, #fff, #f0f9ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Eventify Jr.
            </Typography>
          </Box>

          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  color="inherit"
                  component={Link}
                  href={item.href}
                  startIcon={item.icon}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <ThemeToggle />
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeToggle />
              <IconButton
                color="inherit"
                onClick={() => setMobileMenuOpen(true)}
                sx={{
                  ml: 1,
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.href}
              component={Link}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                borderRadius: 2,
                mx: 2,
                mb: 1,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
