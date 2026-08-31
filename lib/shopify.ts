// lib/shopify.ts

export const shopifyConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
  storefrontApiVersion: '2024-10',
};

const graphqlRequest = async (query: string, variables = {}) => {
  const response = await fetch(
    `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.storefrontApiVersion}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data;
};

// ---------- QUERIES ----------

export const getAllProducts = async () => {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            handle
            descriptionHtml
            tags
            productType
            createdAt
            updatedAt
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              id
              name
              values
            }

          }
        }
      }
    }
  `;

  const data = await graphqlRequest(query);
  return data.products.edges.map(({ node }: any) => node);
};

export const getProductByHandle = async (handle: string) => {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        handle
        tags
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
              selectedOptions {
                name
                value
              }
            }
          }
        }
        options {
          id
          name
          values
        }

      }
    }
  `;

  const data = await graphqlRequest(query, { handle });
  return data.product;
};

export const getAllCollections = async () => {
  const query = `
    {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const data = await graphqlRequest(query);
  return data.collections.edges.map(({ node }: any) => node);
};

export const getProductsByCollection = async (collectionHandle: string) => {
  const query = `
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        image {
          url
          altText
        }
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphqlRequest(query, { handle: collectionHandle });
  return data.collection;
};

export const createCart = async (lines: any[]) => {
  const query = `
    mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await graphqlRequest(query, { lines });
  return data.cartCreate.cart;
};

export const addToCart = async (cartId: string, lines: any[]) => {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await graphqlRequest(query, { cartId, lines });
  return data.cartLinesAdd.cart;
};

export const getCart = async (cartId: string) => {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphqlRequest(query, { cartId });
  return data.cart;
};

// Update item quantity in cart
export const updateCart = async (cartId: string, lines: any[]) => {
  const query = `
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await graphqlRequest(query, { cartId, lines });
  return data.cartLinesUpdate.cart;
};

// Remove item from cart
export const removeFromCart = async (cartId: string, lineIds: string[]) => {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
  `;
  const data = await graphqlRequest(query, { cartId, lineIds });
  return data.cartLinesRemove.cart;
}
