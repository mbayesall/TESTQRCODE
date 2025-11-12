import { PrismaClient } from '@prisma/client'

/**
 * Configuration du client Prisma avec gestion du singleton
 * en développement pour éviter les multiples connexions
 */

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}
