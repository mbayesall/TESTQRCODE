import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import frTranslations from '@/i18n/fr.json'
import enTranslations from '@/i18n/en.json'

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const translations = params.locale === 'fr' ? frTranslations : enTranslations

  return (
    <>
      <Header locale={params.locale} translations={translations} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer locale={params.locale} translations={translations} />
    </>
  )
}
