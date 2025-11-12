import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

/**
 * Schéma de validation pour le formulaire de contact
 */
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

/**
 * POST /api/contact
 * Créer un nouveau message de contact
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const validatedData = contactSchema.parse(body)

    // Créer le message
    const message = await db.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject,
        message: validatedData.message,
        status: 'NEW',
      },
    })

    // TODO: Envoyer une notification email à l'équipe
    // await sendEmailNotification(message)

    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été envoyé avec succès',
        data: { id: message.id },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Erreur création message de contact:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du message',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/contact
 * Récupérer tous les messages (admin uniquement)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Vérifier l'authentification admin
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    // }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = status ? { status: status as any } : {}

    const [messages, total] = await Promise.all([
      db.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.contactMessage.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Erreur récupération messages:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération des messages',
      },
      { status: 500 }
    )
  }
}
