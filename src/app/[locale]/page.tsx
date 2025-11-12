import Link from 'next/link'
import {
  Brain,
  Database,
  Shield,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import frTranslations from '@/i18n/fr.json'
import enTranslations from '@/i18n/en.json'

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = params.locale === 'fr' ? frTranslations : enTranslations

  // Données de démonstration
  const stats = [
    { label: t.stats.formations, value: '50+', icon: BookOpen },
    { label: t.stats.participants, value: '2000+', icon: Users },
    { label: t.stats.satisfaction, value: '98%', icon: Star },
    { label: t.stats.companies, value: '80+', icon: Award },
  ]

  const features = [
    {
      icon: Brain,
      title: params.locale === 'fr' ? 'Intelligence Artificielle' : 'Artificial Intelligence',
      description: params.locale === 'fr'
        ? 'Formations pratiques sur les dernières technologies IA, Machine Learning et Deep Learning adaptées au contexte sénégalais.'
        : 'Practical training on the latest AI, Machine Learning and Deep Learning technologies adapted to the Senegalese context.',
    },
    {
      icon: Database,
      title: params.locale === 'fr' ? 'Gouvernance des Données' : 'Data Governance',
      description: params.locale === 'fr'
        ? 'Maîtrisez la gestion, la protection et la valorisation de vos données avec des experts locaux.'
        : 'Master data management, protection and valorization with local experts.',
    },
    {
      icon: Shield,
      title: params.locale === 'fr' ? 'Cybersécurité' : 'Cybersecurity',
      description: params.locale === 'fr'
        ? 'Protégez vos systèmes et données avec nos formations avancées en sécurité informatique.'
        : 'Protect your systems and data with our advanced IT security training.',
    },
  ]

  const sectors = [
    {
      title: t.sectors.education.title,
      description: t.sectors.education.description,
      image: '🎓',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t.sectors.health.title,
      description: t.sectors.health.description,
      image: '🏥',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t.sectors.entrepreneurship.title,
      description: t.sectors.entrepreneurship.description,
      image: '🚀',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-senegal-green via-green-600 to-senegal-ocean text-white">
        <div className="absolute inset-0 african-pattern opacity-10"></div>
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Sparkles className="h-4 w-4 text-senegal-yellow" />
                <span className="text-sm font-medium">100% Sénégal 🇸🇳</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-xl text-white/90 max-w-xl">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/${params.locale}/formations`}>
                  <Button size="xl" variant="default" className="bg-white text-senegal-green hover:bg-white/90 w-full sm:w-auto">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${params.locale}/quote`}>
                  <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    {t.hero.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="space-y-4">
                    <div className="h-24 bg-senegal-yellow/30 rounded-lg animate-pulse"></div>
                    <div className="h-32 bg-white/20 rounded-lg"></div>
                    <div className="h-20 bg-senegal-red/30 rounded-lg animate-pulse delay-150"></div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="h-32 bg-white/20 rounded-lg"></div>
                    <div className="h-24 bg-senegal-yellow/30 rounded-lg animate-pulse delay-300"></div>
                    <div className="h-28 bg-white/20 rounded-lg"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-32 w-32 rounded-full gradient-senegal flex items-center justify-center shadow-2xl">
                    <Brain className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <stat.icon className="h-8 w-8 text-senegal-green mx-auto" />
                <div className="text-3xl md:text-4xl font-bold text-senegal-green">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-senegal-subtle">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {params.locale === 'fr' ? 'Nos Domaines d\'Expertise' : 'Our Areas of Expertise'}
            </h2>
            <p className="text-lg text-gray-600">
              {params.locale === 'fr'
                ? 'Des formations de qualité dispensées par des experts sénégalais reconnus dans leurs domaines'
                : 'Quality training delivered by recognized Senegalese experts in their fields'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-2 border-transparent hover:border-senegal-green">
                <CardHeader>
                  <div className="h-14 w-14 rounded-lg bg-senegal-green/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-senegal-green" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.sectors.title}
            </h2>
            <p className="text-lg text-gray-600">
              {params.locale === 'fr'
                ? 'Des solutions adaptées à chaque secteur pour accompagner votre transformation digitale'
                : 'Tailored solutions for each sector to support your digital transformation'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white card-hover"
                   style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                   className={`bg-gradient-to-br ${sector.color} p-8 rounded-2xl text-white card-hover`}>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{sector.image}</div>
                  <h3 className="text-2xl font-bold mb-3">{sector.title}</h3>
                  <p className="text-white/90 mb-6">{sector.description}</p>
                  <Link href={`/${params.locale}/formations?sector=${sector.title.toLowerCase()}`}>
                    <Button variant="secondary" size="sm">
                      {t.common.learnMore}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding african-pattern bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {params.locale === 'fr' ? 'Pourquoi Choisir ENGY LABS ?' : 'Why Choose ENGY LABS?'}
              </h2>
              <div className="space-y-4">
                {[
                  params.locale === 'fr'
                    ? 'Expertise 100% sénégalaise avec une connaissance approfondie du contexte local'
                    : '100% Senegalese expertise with in-depth knowledge of the local context',
                  params.locale === 'fr'
                    ? 'Formations certifiantes reconnues par les entreprises locales et internationales'
                    : 'Certified training recognized by local and international companies',
                  params.locale === 'fr'
                    ? 'Accompagnement personnalisé adapté à vos besoins spécifiques'
                    : 'Personalized support tailored to your specific needs',
                  params.locale === 'fr'
                    ? 'Méthodes pédagogiques innovantes mêlant théorie et pratique'
                    : 'Innovative teaching methods combining theory and practice',
                  params.locale === 'fr'
                    ? 'Réseau actif de professionnels et opportunités de networking'
                    : 'Active network of professionals and networking opportunities',
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-senegal-green flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href={`/${params.locale}/about`}>
                  <Button size="lg">
                    {params.locale === 'fr' ? 'En savoir plus sur nous' : 'Learn more about us'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-senegal-green/10 p-8">
                <div className="h-full w-full rounded-xl border-4 border-dashed border-senegal-green/30 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Award className="h-24 w-24 text-senegal-green mx-auto" />
                    <p className="text-2xl font-bold text-senegal-green">
                      {params.locale === 'fr' ? 'Excellence & Innovation' : 'Excellence & Innovation'}
                    </p>
                    <p className="text-gray-600 max-w-xs mx-auto">
                      {params.locale === 'fr'
                        ? 'Nous nous engageons à offrir des formations de classe mondiale'
                        : 'We are committed to providing world-class training'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-senegal-green to-senegal-ocean text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {params.locale === 'fr'
              ? 'Prêt à renforcer vos compétences ?'
              : 'Ready to strengthen your skills?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {params.locale === 'fr'
              ? 'Rejoignez des centaines de professionnels qui ont déjà transformé leur carrière avec ENGY LABS'
              : 'Join hundreds of professionals who have already transformed their careers with ENGY LABS'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${params.locale}/formations`}>
              <Button size="xl" variant="default" className="bg-white text-senegal-green hover:bg-white/90">
                {t.formations.title}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${params.locale}/contact`}>
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                {t.common.contact}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
