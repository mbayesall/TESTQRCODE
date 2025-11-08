'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FooterProps {
  locale: string
  translations: any
}

export function Footer({ locale, translations }: FooterProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement newsletter subscription
    setTimeout(() => {
      setLoading(false)
      setEmail('')
    }, 1000)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative h-10 w-10 rounded-full gradient-senegal flex items-center justify-center">
                <span className="text-white font-bold text-xl">EL</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white">ENGY LABS</span>
                <span className="text-xs text-senegal-yellow">Sénégal</span>
              </div>
            </div>
            <p className="text-sm">
              {translations.footer.description}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-senegal-green transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-senegal-green transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-senegal-green transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-senegal-green transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{translations.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/formations`} className="hover:text-senegal-green transition-colors">
                  {translations.nav.formations}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/workshops`} className="hover:text-senegal-green transition-colors">
                  {translations.nav.workshops}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/teambuilding`} className="hover:text-senegal-green transition-colors">
                  {translations.nav.teambuilding}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/calendar`} className="hover:text-senegal-green transition-colors">
                  {translations.nav.calendar}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-senegal-green transition-colors">
                  {translations.nav.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/testimonials`} className="hover:text-senegal-green transition-colors">
                  {translations.nav.testimonials}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{translations.common.contact}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-senegal-green mt-0.5 flex-shrink-0" />
                <span>Dakar, Sénégal<br />Plateau, Avenue Léopold Sédar Senghor</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-senegal-green flex-shrink-0" />
                <span>+221 33 XXX XX XX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-senegal-green flex-shrink-0" />
                <span>contact@engylabs.sn</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">{translations.footer.newsletter}</h3>
            <p className="text-sm mb-4">{translations.footer.newsletterDesc}</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="spinner mr-2 h-4 w-4 border-2"></div>
                    {translations.common.loading}
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {translations.footer.subscribe}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left">
              © {currentYear} ENGY LABS. {translations.footer.rights}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href={`/${locale}/legal`} className="hover:text-senegal-green transition-colors">
                {translations.footer.legal}
              </Link>
              <Link href={`/${locale}/privacy`} className="hover:text-senegal-green transition-colors">
                {translations.footer.privacy}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-senegal-green transition-colors">
                {translations.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
