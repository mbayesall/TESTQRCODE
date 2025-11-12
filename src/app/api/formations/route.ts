import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * GET /api/formations
 * Récupérer toutes les formations avec filtres
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Paramètres de pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // Paramètres de filtrage
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const level = searchParams.get('level')
    const sector = searchParams.get('sector')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    // Construction de la requête where
    const where: any = {
      isActive: true,
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (type && type !== 'all') {
      where.type = type
    }

    if (level && level !== 'all') {
      where.level = level
    }

    if (sector) {
      where.sector = {
        has: sector,
      }
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleEn: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Exécution de la requête
    const [formations, total] = await Promise.all([
      db.formation.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          titleEn: true,
          slug: true,
          shortDesc: true,
          shortDescEn: true,
          category: true,
          type: true,
          level: true,
          duration: true,
          price: true,
          discountPrice: true,
          maxParticipants: true,
          image: true,
          isFeatured: true,
          sector: true,
          createdAt: true,
        },
      }),
      db.formation.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: formations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Erreur récupération formations:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération des formations',
      },
      { status: 500 }
    )
  }
}
