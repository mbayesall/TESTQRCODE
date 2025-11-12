import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

/**
 * Schéma de validation pour les demandes de devis
 */
const quoteSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  company: z.string().optional(),
  sector: z.enum(['EDUCATION', 'HEALTH', 'ENTREPRENEURSHIP', 'PUBLIC', 'PRIVATE']).optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  trainingType: z.array(z.string()).min(1, 'Sélectionnez au moins un type de formation'),
  participants: z.number().min(1).optional(),
  budget: z.string().optional(),
})

/**
 * POST /api/quote
 * Créer une nouvelle demande de devis
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const validatedData = quoteSchema.parse(body)

    // Créer la demande
    const quote = await db.quoteRequest.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company || null,
        sector: validatedData.sector || null,
        message: validatedData.message,
        trainingType: validatedData.trainingType,
        participants: validatedData.participants || null,
        budget: validatedData.budget || null,
        status: 'PENDING',
      },
    })

    // TODO: Envoyer une notification email
    // await sendQuoteNotification(quote)

    return NextResponse.json(
      {
        success: true,
        message: 'Votre demande de devis a été envoyée avec succès',
        data: { id: quote.id },
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

    console.error('Erreur création demande de devis:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi de la demande',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/quote
 * Récupérer toutes les demandes de devis (admin uniquement)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Vérifier l'authentification admin
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = status ? { status: status as any } : {}

    const [quotes, total] = await Promise.all([
      db.quoteRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.quoteRequest.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: quotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Erreur récupération demandes de devis:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération des demandes',
      },
      { status: 500 }
    )
  }
}
