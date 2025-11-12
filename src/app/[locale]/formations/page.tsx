'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, Users, Award, TrendingUp, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import frTranslations from '@/i18n/fr.json'
import enTranslations from '@/i18n/en.json'

// Données de démonstration
const demoFormations = [
  {
    id: '1',
    title: 'Introduction à l\'Intelligence Artificielle',
    titleEn: 'Introduction to Artificial Intelligence',
    slug: 'intro-ia',
    shortDesc: 'Découvrez les fondamentaux de l\'IA et ses applications pratiques au Sénégal',
    shortDescEn: 'Discover the fundamentals of AI and its practical applications in Senegal',
    category: 'AI',
    type: 'FORMATION',
    level: 'BEGINNER',
    duration: 40,
    price: 250000,
    maxParticipants: 25,
    image: '/images/formations/ai-intro.jpg',
    isFeatured: true,
    sector: ['EDUCATION', 'ENTREPRENEURSHIP'],
  },
  {
    id: '2',
    title: 'Cybersécurité Avancée',
    titleEn: 'Advanced Cybersecurity',
    slug: 'cybersecurity-advanced',
    shortDesc: 'Protégez vos systèmes contre les menaces cybernétiques modernes',
    shortDescEn: 'Protect your systems against modern cyber threats',
    category: 'CYBERSECURITY',
    type: 'FORMATION',
    level: 'ADVANCED',
    duration: 60,
    price: 350000,
    maxParticipants: 20,
    image: '/images/formations/cyber.jpg',
    isFeatured: true,
    sector: ['HEALTH', 'PRIVATE'],
  },
  {
    id: '3',
    title: 'Gouvernance des Données pour la Santé',
    titleEn: 'Data Governance for Healthcare',
    slug: 'data-gov-health',
    shortDesc: 'Maîtrisez la gestion des données de santé selon les normes internationales',
    shortDescEn: 'Master healthcare data management according to international standards',
    category: 'DATA_GOVERNANCE',
    type: 'FORMATION',
    level: 'INTERMEDIATE',
    duration: 50,
    price: 300000,
    maxParticipants: 20,
    image: '/images/formations/data-health.jpg',
    isFeatured: false,
    sector: ['HEALTH'],
  },
  {
    id: '4',
    title: 'Atelier Machine Learning Pratique',
    titleEn: 'Practical Machine Learning Workshop',
    slug: 'ml-workshop',
    shortDesc: 'Construisez vos premiers modèles ML avec Python',
    shortDescEn: 'Build your first ML models with Python',
    category: 'AI',
    type: 'WORKSHOP',
    level: 'INTERMEDIATE',
    duration: 16,
    price: 150000,
    maxParticipants: 15,
    image: '/images/formations/ml-workshop.jpg',
    isFeatured: true,
    sector: ['ENTREPRENEURSHIP'],
  },
  {
    id: '5',
    title: 'Team Building Tech & Innovation',
    titleEn: 'Tech & Innovation Team Building',
    slug: 'teambuilding-tech',
    shortDesc: 'Renforcez la cohésion de votre équipe autour de défis technologiques',
    shortDescEn: 'Strengthen your team cohesion through tech challenges',
    category: 'DIGITAL_TRANSFORMATION',
    type: 'TEAMBUILDING',
    level: 'BEGINNER',
    duration: 8,
    price: 200000,
    maxParticipants: 30,
    image: '/images/formations/teambuilding.jpg',
    isFeatured: false,
    sector: ['PRIVATE'],
  },
  {
    id: '6',
    title: 'Transformation Digitale pour l\'Éducation',
    titleEn: 'Digital Transformation for Education',
    slug: 'digital-education',
    shortDesc: 'Accompagnez votre établissement dans sa transformation numérique',
    shortDescEn: 'Support your institution in its digital transformation',
    category: 'DIGITAL_TRANSFORMATION',
    type: 'FORMATION',
    level: 'BEGINNER',
    duration: 30,
    price: 180000,
    maxParticipants: 25,
    image: '/images/formations/digital-edu.jpg',
    isFeatured: false,
    sector: ['EDUCATION'],
  },
]

export default function FormationsPage({ params }: { params: { locale: string } }) {
  const t = params.locale === 'fr' ? frTranslations : enTranslations
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const categories = [
    { value: 'all', label: t.formations.filter.all },
    { value: 'AI', label: t.formations.filter.ai },
    { value: 'DATA_GOVERNANCE', label: t.formations.filter.data },
    { value: 'CYBERSECURITY', label: t.formations.filter.cybersecurity },
    { value: 'DIGITAL_TRANSFORMATION', label: t.formations.filter.digital },
  ]

  const levels = [
    { value: 'all', label: t.formations.filter.all },
    { value: 'BEGINNER', label: t.formations.level.beginner },
    { value: 'INTERMEDIATE', label: t.formations.level.intermediate },
    { value: 'ADVANCED', label: t.formations.level.advanced },
  ]

  const types = [
    { value: 'all', label: params.locale === 'fr' ? 'Tous' : 'All' },
    { value: 'FORMATION', label: params.locale === 'fr' ? 'Formation' : 'Training' },
    { value: 'WORKSHOP', label: params.locale === 'fr' ? 'Atelier' : 'Workshop' },
    { value: 'TEAMBUILDING', label: params.locale === 'fr' ? 'Team Building' : 'Team Building' },
  ]

  const filteredFormations = demoFormations.filter((formation) => {
    const matchesSearch = params.locale === 'fr'
      ? formation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formation.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      : (formation.titleEn || formation.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (formation.shortDescEn || formation.shortDesc).toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || formation.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || formation.level === selectedLevel
    const matchesType = selectedType === 'all' || formation.type === selectedType

    return matchesSearch && matchesCategory && matchesLevel && matchesType
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getLevelBadge = (level: string) => {
    const colors = {
      BEGINNER: 'bg-green-100 text-green-800',
      INTERMEDIATE: 'bg-blue-100 text-blue-800',
      ADVANCED: 'bg-purple-100 text-purple-800',
      EXPERT: 'bg-red-100 text-red-800',
    }
    return colors[level as keyof typeof colors] || colors.BEGINNER
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      FORMATION: 'bg-senegal-green/10 text-senegal-green',
      WORKSHOP: 'bg-senegal-yellow/20 text-senegal-green',
      TEAMBUILDING: 'bg-senegal-ocean/10 text-senegal-ocean',
    }
    return colors[type as keyof typeof colors] || colors.FORMATION
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-senegal-green to-senegal-ocean text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.formations.title}</h1>
            <p className="text-xl text-white/90">{t.formations.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container-custom py-6">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t.common.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="form-input"
            >
              {levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {types.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedType === type.value
                    ? "bg-senegal-green text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Formations Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <p className="text-gray-600">
              {filteredFormations.length} {params.locale === 'fr' ? 'formations trouvées' : 'trainings found'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFormations.map((formation) => (
              <Card key={formation.id} className="card-hover flex flex-col">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-senegal-green to-senegal-ocean rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <Award className="h-16 w-16" />
                  </div>
                  {formation.isFeatured && (
                    <div className="absolute top-4 right-4 bg-senegal-yellow text-senegal-green px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ {params.locale === 'fr' ? 'Populaire' : 'Featured'}
                    </div>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("status-badge", getTypeBadge(formation.type))}>
                      {formation.type === 'FORMATION' ? (params.locale === 'fr' ? 'Formation' : 'Training') :
                       formation.type === 'WORKSHOP' ? (params.locale === 'fr' ? 'Atelier' : 'Workshop') :
                       'Team Building'}
                    </span>
                    <span className={cn("status-badge", getLevelBadge(formation.level))}>
                      {t.formations.level[formation.level.toLowerCase() as keyof typeof t.formations.level]}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    {params.locale === 'fr' ? formation.title : (formation.titleEn || formation.title)}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {params.locale === 'fr' ? formation.shortDesc : (formation.shortDescEn || formation.shortDesc)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-senegal-green" />
                      {formation.duration}h
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-senegal-green" />
                      Max. {formation.maxParticipants} {t.formations.spots}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl font-bold text-senegal-green">
                      {formatPrice(formation.price)}
                    </span>
                  </div>
                  <Link href={`/${params.locale}/formations/${formation.slug}`} className="w-full">
                    <Button className="w-full">
                      {t.formations.details}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredFormations.length === 0 && (
            <div className="text-center py-16">
              <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {params.locale === 'fr' ? 'Aucune formation trouvée' : 'No trainings found'}
              </h3>
              <p className="text-gray-600">
                {params.locale === 'fr'
                  ? 'Essayez de modifier vos filtres de recherche'
                  : 'Try adjusting your search filters'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-senegal-green/5">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            {params.locale === 'fr'
              ? 'Vous ne trouvez pas ce que vous cherchez ?'
              : 'Can\'t find what you\'re looking for?'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {params.locale === 'fr'
              ? 'Contactez-nous pour une formation sur mesure adaptée à vos besoins spécifiques'
              : 'Contact us for custom training tailored to your specific needs'}
          </p>
          <Link href={`/${params.locale}/quote`}>
            <Button size="lg">
              {params.locale === 'fr' ? 'Demander un devis personnalisé' : 'Request custom quote'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
