const AUTH_URL = 'https://dummyjson.com/auth/login'
const PRODUCTS_URL = 'https://dummyjson.com/products'

export async function loginApi(username, password) {
  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Login failed')
  }
  return data
}

export async function fetchProductsApi() {
  const res = await fetch(PRODUCTS_URL)
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch products')
  }
  return data.products
}
