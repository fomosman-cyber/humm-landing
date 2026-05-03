const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined

export const shopifyApiEnabled = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN)

interface CartCreateResponse {
  data?: {
    cartCreate?: {
      cart?: {
        id: string
        checkoutUrl: string
      } | null
      userErrors?: { field: string[] | null; message: string }[]
    }
  }
  errors?: { message: string }[]
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function createCheckoutForVariant(
  variantId: string,
  quantity: number = 1,
): Promise<string> {
  if (!shopifyApiEnabled) {
    throw new Error('Shopify Storefront API is not configured')
  }

  const endpoint = `https://${STORE_DOMAIN}/api/2024-10/graphql.json`
  const variables = {
    input: {
      lines: [
        {
          merchandiseId: `gid://shopify/ProductVariant/${variantId}`,
          quantity,
        },
      ],
    },
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query: CART_CREATE_MUTATION, variables }),
  })

  if (!res.ok) {
    throw new Error(`Storefront API error: ${res.status}`)
  }

  const json: CartCreateResponse = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }

  const userErrors = json.data?.cartCreate?.userErrors
  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join('; '))
  }

  const checkoutUrl = json.data?.cartCreate?.cart?.checkoutUrl
  if (!checkoutUrl) {
    throw new Error('No checkoutUrl returned from Shopify')
  }

  return checkoutUrl
}
