import Stripe from 'stripe'

/**
 * Configuration du client Stripe
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

/**
 * Crée une session de paiement Stripe
 */
export async function createCheckoutSession({
  userId,
  userEmail,
  items,
  successUrl,
  cancelUrl,
}: {
  userId: string
  userEmail: string
  items: Stripe.Checkout.SessionCreateParams.LineItem[]
  successUrl: string
  cancelUrl: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
      // Support pour le paiement mobile au Sénégal
      payment_method_options: {
        card: {
          installments: {
            enabled: false,
          },
        },
      },
    })

    return session
  } catch (error) {
    console.error('Erreur création session Stripe:', error)
    throw error
  }
}

/**
 * Crée un abonnement Stripe
 */
export async function createSubscription({
  userId,
  userEmail,
  priceId,
  successUrl,
  cancelUrl,
}: {
  userId: string
  userEmail: string
  priceId: string
  successUrl: string
  cancelUrl: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
    })

    return session
  } catch (error) {
    console.error('Erreur création abonnement Stripe:', error)
    throw error
  }
}

/**
 * Annule un abonnement
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
    return subscription
  } catch (error) {
    console.error('Erreur annulation abonnement:', error)
    throw error
  }
}

/**
 * Récupère les détails d'un abonnement
 */
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Erreur récupération abonnement:', error)
    throw error
  }
}

/**
 * Vérifie la signature d'un webhook Stripe
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    return event
  } catch (error) {
    console.error('Erreur vérification webhook:', error)
    throw error
  }
}
