import { Award, Users, Target, Heart, TrendingUp, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import frTranslations from '@/i18n/fr.json'
import enTranslations from '@/i18n/en.json'

export default function AboutPage({ params }: { params: { locale: string } }) {
  const isFrench = params.locale === 'fr'

  const values = [
    {
      icon: Award,
      title: isFrench ? 'Excellence' : 'Excellence',
      description: isFrench
        ? 'Nous visons l\'excellence dans chacune de nos formations et services'
        : 'We aim for excellence in each of our training programs and services',
    },
    {
      icon: Users,
      title: isFrench ? 'Collaboration' : 'Collaboration',
      description: isFrench
        ? 'Nous croyons en la force de la collaboration et du partage de connaissances'
        : 'We believe in the power of collaboration and knowledge sharing',
    },
    {
      icon: Target,
      title: isFrench ? 'Impact Local' : 'Local Impact',
      description: isFrench
        ? 'Notre mission est de renforcer les compétences numériques au Sénégal'
        : 'Our mission is to strengthen digital skills in Senegal',
    },
    {
      icon: Heart,
      title: isFrench ? 'Passion' : 'Passion',
      description: isFrench
        ? 'Nous sommes passionnés par la technologie et l\'éducation'
        : 'We are passionate about technology and education',
    },
  ]

  const stats = [
    { value: '2019', label: isFrench ? 'Année de création' : 'Founded' },
    { value: '50+', label: isFrench ? 'Formations' : 'Training Programs' },
    { value: '2000+', label: isFrench ? 'Participants' : 'Participants' },
    { value: '80+', label: isFrench ? 'Entreprises' : 'Companies' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-senegal-green to-senegal-ocean text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isFrench ? 'À Propos d\'ENGY LABS' : 'About ENGY LABS'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {isFrench
              ? 'Plateforme 100% sénégalaise dédiée au renforcement des compétences en Intelligence Artificielle, gouvernance des données et cybersécurité.'
              : '100% Senegalese platform dedicated to strengthening skills in Artificial Intelligence, data governance and cybersecurity.'}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {isFrench ? 'Notre Mission' : 'Our Mission'}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {isFrench
                    ? 'ENGY LABS est née de la conviction que le Sénégal et l\'Afrique ont un rôle majeur à jouer dans la révolution numérique mondiale. Notre mission est de démocratiser l\'accès aux compétences numériques de pointe.'
                    : 'ENGY LABS was born from the conviction that Senegal and Africa have a major role to play in the global digital revolution. Our mission is to democratize access to cutting-edge digital skills.'}
                </p>
                <p>
                  {isFrench
                    ? 'Nous accompagnons les professionnels, les entreprises et les institutions dans leur transformation digitale en proposant des formations adaptées au contexte local et aux standards internationaux.'
                    : 'We support professionals, companies and institutions in their digital transformation by offering training adapted to the local context and international standards.'}
                </p>
                <p>
                  {isFrench
                    ? 'Chaque formation est conçue par des experts sénégalais reconnus, garantissant une approche pédagogique innovante et ancrée dans notre réalité.'
                    : 'Each training is designed by recognized Senegalese experts, ensuring an innovative pedagogical approach rooted in our reality.'}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-senegal p-1">
                <div className="h-full w-full rounded-xl bg-white p-8 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <Globe className="h-24 w-24 text-senegal-green mx-auto" />
                    <p className="text-2xl font-bold text-senegal-green">
                      {isFrench ? '🇸🇳 Fiers d\'être Sénégalais' : '🇸🇳 Proud to be Senegalese'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-senegal-green text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-senegal-yellow">
                  {stat.value}
                </div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isFrench ? 'Nos Valeurs' : 'Our Values'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isFrench
                ? 'Les principes qui guident notre action au quotidien'
                : 'The principles that guide our daily actions'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-senegal-green/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-senegal-green" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isFrench ? 'Notre Équipe' : 'Our Team'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            {isFrench
              ? 'Une équipe de passionnés, experts dans leurs domaines, unis par la volonté de faire rayonner l\'excellence sénégalaise dans le numérique.'
              : 'A team of passionate experts in their fields, united by the will to make Senegalese excellence shine in digital.'}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="card-hover">
                <CardContent className="pt-6">
                  <div className="h-32 w-32 rounded-full bg-gradient-senegal mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {isFrench ? 'Expert·e ENGY LABS' : 'ENGY LABS Expert'}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {isFrench ? 'Formateur·rice' : 'Trainer'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isFrench
                      ? 'Spécialisé·e en IA, Data et Cybersécurité'
                      : 'Specialized in AI, Data and Cybersecurity'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-senegal-green to-senegal-ocean text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isFrench ? 'Rejoignez l\'aventure ENGY LABS' : 'Join the ENGY LABS adventure'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {isFrench
              ? 'Ensemble, construisons le futur numérique du Sénégal'
              : 'Together, let\'s build Senegal\'s digital future'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`/${params.locale}/formations`}>
              <button className="px-8 py-3 bg-white text-senegal-green rounded-md font-medium hover:bg-white/90 transition-colors">
                {isFrench ? 'Découvrir nos formations' : 'Explore our programs'}
              </button>
            </a>
            <a href={`/${params.locale}/contact`}>
              <button className="px-8 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors">
                {isFrench ? 'Nous contacter' : 'Contact us'}
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
