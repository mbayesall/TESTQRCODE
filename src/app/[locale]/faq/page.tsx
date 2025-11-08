'use client'

import { useState } from 'react'
import { Search, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import frTranslations from '@/i18n/fr.json'
import enTranslations from '@/i18n/en.json'

// Données de démonstration
const demoFAQs = {
  fr: [
    {
      category: 'Général',
      questions: [
        {
          question: 'Qu\'est-ce qu\'ENGY LABS ?',
          answer: 'ENGY LABS est une plateforme 100% sénégalaise spécialisée dans les formations professionnelles en Intelligence Artificielle, gouvernance des données et cybersécurité. Nous accompagnons les entreprises, institutions et professionnels dans leur transformation digitale.',
        },
        {
          question: 'Où sont situées vos formations ?',
          answer: 'Nos formations sont dispensées principalement à Dakar, mais nous proposons également des formations en ligne accessibles depuis n\'importe où au Sénégal et dans le monde. Nous pouvons aussi nous déplacer dans d\'autres régions du Sénégal pour des formations sur mesure.',
        },
        {
          question: 'Vos formations sont-elles certifiantes ?',
          answer: 'Oui, toutes nos formations professionnelles délivrent un certificat reconnu. Certaines formations offrent également des certifications internationales selon le programme choisi.',
        },
      ],
    },
    {
      category: 'Inscriptions',
      questions: [
        {
          question: 'Comment puis-je m\'inscrire à une formation ?',
          answer: 'Vous pouvez vous inscrire directement en ligne via notre plateforme. Sélectionnez la formation qui vous intéresse, choisissez une session disponible, et suivez le processus de paiement. Vous recevrez une confirmation par email.',
        },
        {
          question: 'Quels sont les modes de paiement acceptés ?',
          answer: 'Nous acceptons les paiements par carte bancaire via Stripe, ainsi que les solutions de paiement mobile populaires au Sénégal comme Orange Money, Free Money et Wave. Le virement bancaire est également possible pour les entreprises.',
        },
        {
          question: 'Puis-je annuler mon inscription ?',
          answer: 'Oui, vous pouvez annuler votre inscription jusqu\'à 7 jours avant le début de la formation pour obtenir un remboursement complet. Au-delà, nous offrons un avoir pour une formation future.',
        },
      ],
    },
    {
      category: 'Formations',
      questions: [
        {
          question: 'Quel est le niveau requis pour suivre vos formations ?',
          answer: 'Chaque formation indique clairement le niveau requis (débutant, intermédiaire, avancé). Pour les formations techniques, des prérequis sont mentionnés. N\'hésitez pas à nous contacter si vous avez des doutes sur votre niveau.',
        },
        {
          question: 'Proposez-vous des formations sur mesure pour les entreprises ?',
          answer: 'Absolument ! Nous créons des programmes de formation personnalisés adaptés aux besoins spécifiques de votre entreprise. Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.',
        },
        {
          question: 'Les supports de cours sont-ils fournis ?',
          answer: 'Oui, tous les participants reçoivent l\'ensemble des supports de cours en format numérique : présentations, exercices pratiques, codes sources, et ressources complémentaires. Certaines formations incluent également des supports physiques.',
        },
      ],
    },
    {
      category: 'Abonnements',
      questions: [
        {
          question: 'Comment fonctionnent les abonnements ?',
          answer: 'Nos abonnements vous donnent accès à un certain nombre de formations par période (mensuel, trimestriel, annuel). Vous bénéficiez également de réductions sur toutes nos autres formations et événements.',
        },
        {
          question: 'Puis-je partager mon abonnement avec mes collègues ?',
          answer: 'Les abonnements sont personnels. Pour les entreprises souhaitant former plusieurs employés, nous proposons des abonnements d\'équipe avec des tarifs préférentiels. Contactez notre équipe commerciale pour plus d\'informations.',
        },
      ],
    },
  ],
  en: [
    {
      category: 'General',
      questions: [
        {
          question: 'What is ENGY LABS?',
          answer: 'ENGY LABS is a 100% Senegalese platform specializing in professional training in Artificial Intelligence, data governance and cybersecurity. We support companies, institutions and professionals in their digital transformation.',
        },
        {
          question: 'Where are your training programs located?',
          answer: 'Our training programs are primarily held in Dakar, but we also offer online courses accessible from anywhere in Senegal and worldwide. We can also travel to other regions of Senegal for customized training.',
        },
        {
          question: 'Are your training programs certified?',
          answer: 'Yes, all our professional training programs deliver a recognized certificate. Some trainings also offer international certifications depending on the chosen program.',
        },
      ],
    },
    {
      category: 'Registration',
      questions: [
        {
          question: 'How can I register for a training program?',
          answer: 'You can register directly online through our platform. Select the training you are interested in, choose an available session, and follow the payment process. You will receive a confirmation email.',
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept credit card payments via Stripe, as well as popular mobile payment solutions in Senegal such as Orange Money, Free Money and Wave. Bank transfers are also possible for companies.',
        },
        {
          question: 'Can I cancel my registration?',
          answer: 'Yes, you can cancel your registration up to 7 days before the training starts for a full refund. Beyond that, we offer a credit for a future training.',
        },
      ],
    },
    {
      category: 'Training',
      questions: [
        {
          question: 'What level is required to attend your training?',
          answer: 'Each training clearly indicates the required level (beginner, intermediate, advanced). For technical training, prerequisites are mentioned. Feel free to contact us if you have doubts about your level.',
        },
        {
          question: 'Do you offer customized training for companies?',
          answer: 'Absolutely! We create personalized training programs tailored to your company\'s specific needs. Contact us to discuss your requirements and get a custom quote.',
        },
        {
          question: 'Are course materials provided?',
          answer: 'Yes, all participants receive all course materials in digital format: presentations, practical exercises, source codes, and additional resources. Some trainings also include physical materials.',
        },
      ],
    },
    {
      category: 'Subscriptions',
      questions: [
        {
          question: 'How do subscriptions work?',
          answer: 'Our subscriptions give you access to a certain number of trainings per period (monthly, quarterly, annually). You also benefit from discounts on all our other trainings and events.',
        },
        {
          question: 'Can I share my subscription with colleagues?',
          answer: 'Subscriptions are personal. For companies wishing to train multiple employees, we offer team subscriptions at preferential rates. Contact our sales team for more information.',
        },
      ],
    },
  ],
}

export default function FAQPage({ params }: { params: { locale: string } }) {
  const t = params.locale === 'fr' ? frTranslations : enTranslations
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const faqs = params.locale === 'fr' ? demoFAQs.fr : demoFAQs.en

  const categories = ['all', ...faqs.map(cat => cat.category)]

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      (selectedCategory === 'all' || category.category === selectedCategory) &&
      (searchQuery === '' ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-senegal-green to-senegal-ocean text-white py-16">
        <div className="container-custom text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-6 text-senegal-yellow" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.faq.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{t.faq.subtitle}</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container-custom py-6">
          <div className="max-w-2xl mx-auto space-y-4">
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

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-senegal-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? t.formations.filter.all : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {filteredFAQs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="h-1 w-12 bg-senegal-green mr-4"></div>
                {category.category}
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, qIndex) => (
                  <AccordionItem
                    key={qIndex}
                    value={`${catIndex}-${qIndex}`}
                    className="bg-white rounded-lg px-6 border"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {params.locale === 'fr' ? 'Aucune question trouvée' : 'No questions found'}
              </h3>
              <p className="text-gray-600">
                {params.locale === 'fr'
                  ? 'Essayez de modifier votre recherche'
                  : 'Try adjusting your search'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-senegal-green/5 border-t">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            {params.locale === 'fr'
              ? 'Vous ne trouvez pas la réponse à votre question ?'
              : 'Can\'t find the answer to your question?'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {params.locale === 'fr'
              ? 'Notre équipe est là pour vous aider. N\'hésitez pas à nous contacter.'
              : 'Our team is here to help. Don\'t hesitate to contact us.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`/${params.locale}/contact`}>
              <button className="px-8 py-3 bg-senegal-green text-white rounded-md font-medium hover:bg-senegal-green/90 transition-colors">
                {t.common.contact}
              </button>
            </a>
            <a href="mailto:contact@engylabs.sn">
              <button className="px-8 py-3 border-2 border-senegal-green text-senegal-green rounded-md font-medium hover:bg-senegal-green/5 transition-colors">
                {params.locale === 'fr' ? 'Envoyer un email' : 'Send an email'}
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
