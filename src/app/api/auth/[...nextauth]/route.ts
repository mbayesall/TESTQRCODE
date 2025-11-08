import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

/**
 * Configuration NextAuth
 * Gère l'authentification avec credentials
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
