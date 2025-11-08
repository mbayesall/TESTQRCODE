'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import frTranslations from '@/i18n/fr.json'
import enTranslations from '@/i18n/en.json'

export default function ContactPage({ params }: { params: { locale: string } }) {
  const t = params.locale === 'fr' ? frTranslations : enTranslations
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Implement API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-senegal-green to-senegal-ocean text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h1>
            <p className="text-xl text-white/90">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-senegal-green/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-senegal-green" />
                  </div>
                  <CardTitle>
                    {params.locale === 'fr' ? 'Notre Bureau' : 'Our Office'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Dakar, Sénégal<br />
                    Plateau, Avenue Léopold Sédar Senghor<br />
                    BP 12345, Dakar
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-senegal-green/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-senegal-green" />
                  </div>
                  <CardTitle>
                    {params.locale === 'fr' ? 'Téléphone' : 'Phone'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    +221 33 XXX XX XX<br />
                    +221 77 XXX XX XX
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-senegal-green/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-senegal-green" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    contact@engylabs.sn<br />
                    info@engylabs.sn
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-senegal-green/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-senegal-green" />
                  </div>
                  <CardTitle>
                    {params.locale === 'fr' ? 'Horaires' : 'Hours'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {params.locale === 'fr' ? 'Lundi - Vendredi' : 'Monday - Friday'}: 8h - 18h<br />
                    {params.locale === 'fr' ? 'Samedi' : 'Saturday'}: 9h - 13h<br />
                    {params.locale === 'fr' ? 'Dimanche: Fermé' : 'Sunday: Closed'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {params.locale === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                  </CardTitle>
                  <CardDescription>
                    {params.locale === 'fr'
                      ? 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.'
                      : 'Fill out the form below and we will get back to you as soon as possible.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {t.contact.success}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {params.locale === 'fr'
                          ? 'Nous vous répondrons dans les plus brefs délais.'
                          : 'We will respond to you as soon as possible.'}
                      </p>
                      <Button onClick={() => setSubmitted(false)}>
                        {params.locale === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            {t.contact.name} *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={params.locale === 'fr' ? 'Votre nom complet' : 'Your full name'}
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            {t.contact.email} *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="exemple@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            {t.contact.phone}
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+221 XX XXX XX XX"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium text-gray-700">
                            {t.contact.company}
                          </label>
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={params.locale === 'fr' ? 'Votre entreprise' : 'Your company'}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                          {t.contact.subject} *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={params.locale === 'fr' ? 'Sujet de votre message' : 'Subject of your message'}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                          {t.contact.message} *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="form-input"
                          placeholder={params.locale === 'fr' ? 'Votre message...' : 'Your message...'}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center">
                            <div className="spinner mr-2 h-4 w-4 border-2"></div>
                            {t.common.loading}
                          </span>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            {t.contact.send}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="border-t">
        <div className="h-96 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-senegal-green" />
              <p className="text-lg font-medium">
                {params.locale === 'fr' ? 'Carte interactive' : 'Interactive Map'}
              </p>
              <p className="text-sm">
                {params.locale === 'fr' ? 'Localisation: Dakar, Sénégal' : 'Location: Dakar, Senegal'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
