'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: string
  translations: any
}

export function Header({ locale, translations }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: translations.nav.formations, href: `/${locale}/formations` },
    { name: translations.nav.workshops, href: `/${locale}/workshops` },
    { name: translations.nav.teambuilding, href: `/${locale}/teambuilding` },
    { name: translations.nav.calendar, href: `/${locale}/calendar` },
    { name: translations.nav.blog, href: `/${locale}/blog` },
    { name: translations.nav.testimonials, href: `/${locale}/testimonials` },
    { name: translations.nav.faq, href: `/${locale}/faq` },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <div className="relative h-10 w-10 rounded-full gradient-senegal flex items-center justify-center">
            <span className="text-white font-bold text-xl">EL</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-senegal-green">ENGY LABS</span>
            <span className="text-xs text-gray-600">Sénégal</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "text-senegal-green bg-senegal-green/10"
                  : "text-gray-700 hover:text-senegal-green hover:bg-gray-100"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <Link
              href={pathname.replace(`/${locale}`, '/fr')}
              className={cn(
                "px-2 py-1 text-sm font-medium rounded",
                locale === 'fr' ? "text-senegal-green bg-senegal-green/10" : "text-gray-600 hover:text-senegal-green"
              )}
            >
              FR
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href={pathname.replace(`/${locale}`, '/en')}
              className={cn(
                "px-2 py-1 text-sm font-medium rounded",
                locale === 'en' ? "text-senegal-green bg-senegal-green/10" : "text-gray-600 hover:text-senegal-green"
              )}
            >
              EN
            </Link>
          </div>

          {/* User actions */}
          <Link href={`/${locale}/auth/signin`}>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              {translations.common.signIn}
            </Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button size="sm">
              {translations.common.contact}
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container-custom py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-4 py-2 text-base font-medium rounded-md",
                  isActive(item.href)
                    ? "text-senegal-green bg-senegal-green/10"
                    : "text-gray-700 hover:text-senegal-green hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 border-t space-y-2">
              <Link href={`/${locale}/auth/signin`} onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {translations.common.signIn}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`} onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full" size="sm">
                  {translations.common.contact}
                </Button>
              </Link>
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t">
              <Link
                href={pathname.replace(`/${locale}`, '/fr')}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded",
                  locale === 'fr' ? "text-white bg-senegal-green" : "text-gray-600 border hover:text-senegal-green"
                )}
              >
                Français
              </Link>
              <Link
                href={pathname.replace(`/${locale}`, '/en')}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded",
                  locale === 'en' ? "text-white bg-senegal-green" : "text-gray-600 border hover:text-senegal-green"
                )}
              >
                English
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
