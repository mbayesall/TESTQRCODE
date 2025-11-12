import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ENGY LABS | Formations IA, Data & Cybersécurité au Sénégal',
  description: 'Plateforme 100% sénégalaise de formations, ateliers et team building en Intelligence Artificielle, gouvernance des données et cybersécurité. Renforcez vos compétences numériques.',
  keywords: 'formations IA Sénégal, cybersécurité Dakar, data governance, formations professionnelles, ateliers tech, team building, intelligence artificielle, formation continue',
  authors: [{ name: 'ENGY LABS' }],
  creator: 'ENGY LABS',
  publisher: 'ENGY LABS',
  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://engylabs.sn',
    siteName: 'ENGY LABS',
    title: 'ENGY LABS | Formations IA, Data & Cybersécurité au Sénégal',
    description: 'Plateforme 100% sénégalaise de formations professionnelles en tech',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ENGY LABS Sénégal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENGY LABS | Formations IA, Data & Cybersécurité au Sénégal',
    description: 'Plateforme 100% sénégalaise de formations professionnelles en tech',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
