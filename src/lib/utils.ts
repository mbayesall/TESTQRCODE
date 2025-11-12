import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine les classes Tailwind avec gestion des conflits
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formate un prix en XOF (Franc CFA)
 */
export function formatPrice(price: number, locale: string = 'fr'): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-SN' : 'en-US', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Formate une date
 */
export function formatDate(date: Date | string, locale: string = 'fr'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-SN' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj)
}

/**
 * Génère un slug à partir d'un titre
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Tronque un texte avec ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

/**
 * Calcule le temps de lecture estimé
 */
export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Valide une adresse email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valide un numéro de téléphone sénégalais
 */
export function isValidSenegalPhone(phone: string): boolean {
  // Format: +221 XX XXX XX XX ou 77 XXX XX XX
  const phoneRegex = /^(\+221)?[0-9\s]{9,}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Génère un numéro de commande unique
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `EL-${timestamp}-${random}`.toUpperCase()
}

/**
 * Calcule la progression en pourcentage
 */
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

/**
 * Détermine si une date est passée
 */
export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj < new Date()
}

/**
 * Formate la durée en heures
 */
export function formatDuration(hours: number, locale: string = 'fr'): string {
  if (locale === 'fr') {
    return hours === 1 ? '1 heure' : `${hours} heures`
  }
  return hours === 1 ? '1 hour' : `${hours} hours`
}

/**
 * Retourne les initiales d'un nom
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}
