import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

/**
 * Schéma de validation pour l'inscription à la newsletter
 */
const newsletterSchema = z.object({
  email: z.string().email('Email invalide'),
  name: z.string().optional(),
  locale: z.enum(['fr', 'en']).default('fr'),
})

/**
 * POST /api/newsletter
 * Inscription à la newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const validatedData = newsletterSchema.parse(body)

    // Vérifier si l'email existe déjà
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email: validatedData.email },
    })

    if (existing) {
      // Si désactivé, réactiver
      if (!existing.isActive) {
        await db.newsletterSubscriber.update({
          where: { email: validatedData.email },
          data: { isActive: true },
        })

        return NextResponse.json({
          success: true,
          message: 'Votre abonnement a été réactivé avec succès',
        })
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Cet email est déjà inscrit à la newsletter',
        },
        { status: 400 }
      )
    }

    // Créer l'inscription
    const subscriber = await db.newsletterSubscriber.create({
      data: {
        email: validatedData.email,
        name: validatedData.name || null,
        locale: validatedData.locale,
        isActive: true,
      },
    })

    // TODO: Envoyer un email de confirmation
    // await sendWelcomeEmail(subscriber)

    return NextResponse.json(
      {
        success: true,
        message: 'Inscription réussie ! Vous recevrez nos prochaines actualités.',
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

    console.error('Erreur inscription newsletter:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur est survenue lors de l\'inscription',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/newsletter
 * Désinscription de la newsletter
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email requis',
        },
        { status: 400 }
      )
    }

    // Désactiver l'abonnement
    await db.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false },
    })

    return NextResponse.json({
      success: true,
      message: 'Vous avez été désinscrit avec succès',
    })
  } catch (error) {
    console.error('Erreur désinscription newsletter:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur est survenue lors de la désinscription',
      },
      { status: 500 }
    )
  }
}
