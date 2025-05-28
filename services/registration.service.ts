import type { Registration } from "@/types/registration.interface"

export class RegistrationService {
  private storageKey = "eventify-registrations"

  getAllRegistrations(): Registration[] {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem(this.storageKey)
    return stored ? JSON.parse(stored) : []
  }

  addRegistration(registration: Registration): void {
    if (typeof window === "undefined") return

    const registrations = this.getAllRegistrations()
    registrations.push(registration)
    localStorage.setItem(this.storageKey, JSON.stringify(registrations))
  }

  getRegistrationsByEmail(email: string): Registration[] {
    return this.getAllRegistrations().filter((reg) => reg.userEmail === email)
  }

  isUserRegistered(eventId: string, email: string): boolean {
    return this.getAllRegistrations().some((reg) => reg.eventId === eventId && reg.userEmail === email)
  }
}
