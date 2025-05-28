// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventify Jr. — Catálogo de Eventos",
  description: "Descubra eventos incríveis na sua região",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
