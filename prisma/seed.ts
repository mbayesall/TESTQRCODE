import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Nettoyer la base de données
  await prisma.enrollment.deleteMany()
  await prisma.formationSession.deleteMany()
  await prisma.formation.deleteMany()
  await prisma.subscriptionPlan.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.faq.deleteMany()
  await prisma.user.deleteMany()

  // Créer un utilisateur admin
  const adminPassword = await bcrypt.hash('Admin123!', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@engylabs.sn',
      password: adminPassword,
      name: 'Administrateur ENGY LABS',
      role: 'ADMIN',
      phone: '+221 33 123 45 67',
      emailVerified: new Date(),
    },
  })
  console.log('✅ Admin créé:', admin.email)

  // Créer des utilisateurs de test
  const userPassword = await bcrypt.hash('User123!', 10)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'moussa.diop@example.sn',
        password: userPassword,
        name: 'Moussa Diop',
        role: 'USER',
        phone: '+221 77 123 45 67',
        company: 'Tech Sénégal',
        position: 'Développeur',
      },
    }),
    prisma.user.create({
      data: {
        email: 'awa.fall@example.sn',
        password: userPassword,
        name: 'Awa Fall',
        role: 'TRAINER',
        phone: '+221 78 234 56 78',
        company: 'ENGY LABS',
        position: 'Formatrice IA',
      },
    }),
  ])
  console.log('✅ Utilisateurs créés:', users.length)

  // Créer des plans d'abonnement
  const plans = await Promise.all([
    prisma.subscriptionPlan.create({
      data: {
        name: 'Starter',
        nameEn: 'Starter',
        slug: 'starter',
        description: 'Idéal pour découvrir nos formations',
        descriptionEn: 'Perfect to discover our trainings',
        price: 50000,
        interval: 'monthly',
        features: [
          '2 formations par mois',
          'Accès aux ateliers',
          'Support email',
          'Certificats de formation',
        ],
        maxFormations: 2,
        discountPercent: 10,
        isActive: true,
      },
    }),
    prisma.subscriptionPlan.create({
      data: {
        name: 'Pro',
        nameEn: 'Pro',
        slug: 'pro',
        description: 'Pour les professionnels ambitieux',
        descriptionEn: 'For ambitious professionals',
        price: 120000,
        interval: 'monthly',
        features: [
          '5 formations par mois',
          'Accès illimité aux ateliers',
          'Support prioritaire',
          'Certificats premium',
          'Networking exclusif',
        ],
        maxFormations: 5,
        discountPercent: 20,
        isActive: true,
      },
    }),
    prisma.subscriptionPlan.create({
      data: {
        name: 'Entreprise',
        nameEn: 'Enterprise',
        slug: 'enterprise',
        description: 'Solution complète pour votre équipe',
        descriptionEn: 'Complete solution for your team',
        price: 500000,
        interval: 'monthly',
        features: [
          'Formations illimitées',
          'Formations sur mesure',
          'Accompagnement personnalisé',
          'Support dédié 24/7',
          'Reporting avancé',
        ],
        maxFormations: 999,
        discountPercent: 30,
        isActive: true,
      },
    }),
  ])
  console.log('✅ Plans d\'abonnement créés:', plans.length)

  // Créer des formations
  const formations = await Promise.all([
    prisma.formation.create({
      data: {
        title: 'Introduction à l\'Intelligence Artificielle',
        titleEn: 'Introduction to Artificial Intelligence',
        slug: 'intro-ia',
        description: 'Découvrez les fondamentaux de l\'IA et ses applications dans le contexte sénégalais. Cette formation couvre les concepts de base du Machine Learning, Deep Learning et leurs applications pratiques.',
        descriptionEn: 'Discover the fundamentals of AI and its applications in the Senegalese context. This training covers the basics of Machine Learning, Deep Learning and their practical applications.',
        shortDesc: 'Les fondamentaux de l\'IA appliqués au Sénégal',
        shortDescEn: 'AI fundamentals applied to Senegal',
        category: 'AI',
        type: 'FORMATION',
        level: 'BEGINNER',
        duration: 40,
        price: 250000,
        maxParticipants: 25,
        language: ['fr', 'en'],
        objectives: [
          'Comprendre les concepts fondamentaux de l\'IA',
          'Découvrir les applications pratiques au Sénégal',
          'Implémenter des modèles simples de ML',
          'Évaluer les opportunités de l\'IA pour votre secteur',
        ],
        prerequisites: [
          'Connaissances de base en informatique',
          'Notions de mathématiques (algèbre, statistiques)',
        ],
        program: {
          modules: [
            { title: 'Introduction à l\'IA', duration: 8 },
            { title: 'Machine Learning', duration: 12 },
            { title: 'Deep Learning', duration: 12 },
            { title: 'Applications pratiques', duration: 8 },
          ],
        },
        image: '/images/formations/ia-intro.jpg',
        isActive: true,
        isFeatured: true,
        sector: ['EDUCATION', 'ENTREPRENEURSHIP'],
      },
    }),
    prisma.formation.create({
      data: {
        title: 'Cybersécurité Avancée',
        titleEn: 'Advanced Cybersecurity',
        slug: 'cybersecurity-advanced',
        description: 'Formation approfondie en cybersécurité couvrant les menaces modernes, les techniques de protection et la mise en place de systèmes de sécurité robustes.',
        descriptionEn: 'In-depth cybersecurity training covering modern threats, protection techniques and implementation of robust security systems.',
        shortDesc: 'Protégez vos systèmes contre les cybermenaces',
        shortDescEn: 'Protect your systems against cyber threats',
        category: 'CYBERSECURITY',
        type: 'FORMATION',
        level: 'ADVANCED',
        duration: 60,
        price: 350000,
        maxParticipants: 20,
        language: ['fr'],
        objectives: [
          'Identifier les vulnérabilités des systèmes',
          'Mettre en place des stratégies de défense',
          'Gérer les incidents de sécurité',
          'Conformité aux normes internationales',
        ],
        prerequisites: [
          'Connaissances en réseaux informatiques',
          'Expérience en administration système',
        ],
        program: {
          modules: [
            { title: 'Fondamentaux de la sécurité', duration: 12 },
            { title: 'Sécurité des réseaux', duration: 16 },
            { title: 'Cryptographie', duration: 12 },
            { title: 'Gestion des incidents', duration: 12 },
            { title: 'Conformité et audit', duration: 8 },
          ],
        },
        image: '/images/formations/cyber.jpg',
        isActive: true,
        isFeatured: true,
        sector: ['HEALTH', 'PRIVATE', 'PUBLIC'],
      },
    }),
    prisma.formation.create({
      data: {
        title: 'Gouvernance des Données pour la Santé',
        titleEn: 'Data Governance for Healthcare',
        slug: 'data-gov-health',
        description: 'Maîtrisez la gestion des données de santé selon les normes internationales et les spécificités du système de santé sénégalais.',
        descriptionEn: 'Master healthcare data management according to international standards and the specificities of the Senegalese health system.',
        shortDesc: 'Gestion optimale des données de santé',
        shortDescEn: 'Optimal healthcare data management',
        category: 'DATA_GOVERNANCE',
        type: 'FORMATION',
        level: 'INTERMEDIATE',
        duration: 50,
        price: 300000,
        maxParticipants: 20,
        language: ['fr'],
        objectives: [
          'Comprendre les enjeux de la gouvernance des données',
          'Mettre en place des politiques de gestion de données',
          'Assurer la conformité RGPD et normes locales',
          'Optimiser l\'utilisation des données de santé',
        ],
        prerequisites: [
          'Connaissances du secteur de la santé',
          'Notions de base en data management',
        ],
        program: {
          modules: [
            { title: 'Introduction à la gouvernance', duration: 10 },
            { title: 'Cadre légal et réglementaire', duration: 12 },
            { title: 'Architecture de données', duration: 14 },
            { title: 'Qualité et sécurité', duration: 14 },
          ],
        },
        image: '/images/formations/data-health.jpg',
        isActive: true,
        isFeatured: false,
        sector: ['HEALTH'],
      },
    }),
    prisma.formation.create({
      data: {
        title: 'Atelier Machine Learning Pratique',
        titleEn: 'Practical Machine Learning Workshop',
        slug: 'ml-workshop',
        description: 'Atelier pratique pour apprendre à construire et déployer des modèles de Machine Learning avec Python et les frameworks modernes.',
        descriptionEn: 'Practical workshop to learn how to build and deploy Machine Learning models with Python and modern frameworks.',
        shortDesc: 'Construisez vos premiers modèles ML',
        shortDescEn: 'Build your first ML models',
        category: 'AI',
        type: 'WORKSHOP',
        level: 'INTERMEDIATE',
        duration: 16,
        price: 150000,
        maxParticipants: 15,
        language: ['fr', 'en'],
        objectives: [
          'Maîtriser les bibliothèques ML (scikit-learn, TensorFlow)',
          'Construire des modèles de classification et régression',
          'Évaluer et optimiser les performances',
          'Déployer un modèle en production',
        ],
        prerequisites: [
          'Connaissances Python',
          'Bases en statistiques',
        ],
        program: {
          modules: [
            { title: 'Setup et outils', duration: 2 },
            { title: 'Preprocessing des données', duration: 4 },
            { title: 'Construction de modèles', duration: 6 },
            { title: 'Déploiement', duration: 4 },
          ],
        },
        image: '/images/formations/ml-workshop.jpg',
        isActive: true,
        isFeatured: true,
        sector: ['ENTREPRENEURSHIP'],
      },
    }),
  ])
  console.log('✅ Formations créées:', formations.length)

  // Créer des sessions de formation
  const sessions = await Promise.all([
    prisma.formationSession.create({
      data: {
        formationId: formations[0].id,
        startDate: new Date('2024-03-01T09:00:00'),
        endDate: new Date('2024-03-05T17:00:00'),
        location: 'Dakar, Plateau - Avenue Léopold Sédar Senghor',
        isOnline: false,
        trainers: ['Awa Fall', 'Dr. Mamadou Seck'],
        maxParticipants: 25,
        currentEnrolled: 12,
        status: 'SCHEDULED',
      },
    }),
    prisma.formationSession.create({
      data: {
        formationId: formations[1].id,
        startDate: new Date('2024-03-15T09:00:00'),
        endDate: new Date('2024-03-22T17:00:00'),
        location: 'En ligne',
        isOnline: true,
        meetingLink: 'https://meet.engylabs.sn/cyber-advanced',
        trainers: ['Cheikh Diallo'],
        maxParticipants: 20,
        currentEnrolled: 8,
        status: 'SCHEDULED',
      },
    }),
  ])
  console.log('✅ Sessions créées:', sessions.length)

  // Créer des articles de blog
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'L\'IA au service du développement du Sénégal',
        titleEn: 'AI for Senegal\'s Development',
        slug: 'ia-developpement-senegal',
        excerpt: 'Comment l\'intelligence artificielle peut transformer les secteurs clés de l\'économie sénégalaise.',
        excerptEn: 'How artificial intelligence can transform key sectors of the Senegalese economy.',
        content: 'Article complet sur l\'IA au Sénégal...',
        contentEn: 'Full article about AI in Senegal...',
        coverImage: '/images/blog/ia-senegal.jpg',
        author: 'Dr. Fatou Ndiaye',
        authorImage: '/images/authors/fatou-ndiaye.jpg',
        category: 'IA',
        tags: ['intelligence artificielle', 'développement', 'sénégal'],
        isPublished: true,
        publishedAt: new Date(),
        viewCount: 245,
        readTime: 8,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Cybersécurité : Les enjeux pour les PME sénégalaises',
        titleEn: 'Cybersecurity: Challenges for Senegalese SMEs',
        slug: 'cybersecurite-pme-senegal',
        excerpt: 'Les petites et moyennes entreprises face aux défis de la cybersécurité.',
        excerptEn: 'Small and medium enterprises facing cybersecurity challenges.',
        content: 'Article complet sur la cybersécurité...',
        contentEn: 'Full article about cybersecurity...',
        coverImage: '/images/blog/cyber-pme.jpg',
        author: 'Moussa Thiam',
        authorImage: '/images/authors/moussa-thiam.jpg',
        category: 'Cybersécurité',
        tags: ['cybersécurité', 'pme', 'sénégal'],
        isPublished: true,
        publishedAt: new Date(),
        viewCount: 189,
        readTime: 6,
      },
    }),
  ])
  console.log('✅ Articles de blog créés:', blogPosts.length)

  // Créer des FAQs
  const faqs = await Promise.all([
    prisma.faq.create({
      data: {
        question: 'Qu\'est-ce qu\'ENGY LABS ?',
        questionEn: 'What is ENGY LABS?',
        answer: 'ENGY LABS est une plateforme 100% sénégalaise spécialisée dans les formations professionnelles en Intelligence Artificielle, gouvernance des données et cybersécurité.',
        answerEn: 'ENGY LABS is a 100% Senegalese platform specializing in professional training in Artificial Intelligence, data governance and cybersecurity.',
        category: 'Général',
        order: 1,
        isPublished: true,
      },
    }),
    prisma.faq.create({
      data: {
        question: 'Vos formations sont-elles certifiantes ?',
        questionEn: 'Are your training programs certified?',
        answer: 'Oui, toutes nos formations professionnelles délivrent un certificat reconnu.',
        answerEn: 'Yes, all our professional training programs deliver a recognized certificate.',
        category: 'Formations',
        order: 1,
        isPublished: true,
      },
    }),
  ])
  console.log('✅ FAQs créées:', faqs.length)

  console.log('✅ Seeding terminé avec succès!')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
