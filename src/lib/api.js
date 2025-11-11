const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

async function http(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export const api = {
  base: API_BASE,
  // Products
  listProducts: (params = {}) => {
    const q = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') q.append(k, v)
    })
    return http(`/api/products?${q.toString()}`)
  },
  getProduct: (slug) => http(`/api/products/${slug}`),
  compare: (ids) => http('/api/compare', { method: 'POST', body: JSON.stringify({ ids }) }),
  // Brands
  brands: () => http('/api/brands'),
  // Articles
  articles: (category) => {
    const q = new URLSearchParams()
    if (category) q.append('category', category)
    return http(`/api/articles?${q.toString()}`)
  },
  // Auth (demo)
  login: (email, name) => http('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, name }) }),
  // Wishlist
  getWishlist: (userId) => http(`/api/wishlist?user_id=${encodeURIComponent(userId)}`),
  toggleWishlist: (user_id, product_id) => http('/api/wishlist/toggle', { method: 'POST', body: JSON.stringify({ user_id, product_id }) }),
  // Admin
  seed: () => http('/api/admin/seed', { method: 'POST' }),
  adminImport: (payload) => http('/api/admin/import', { method: 'POST', body: JSON.stringify(payload) }),
}

export function getUser() {
  try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null }
}
export function setUser(u) { localStorage.setItem('user', JSON.stringify(u)) }

export function getCompareList() {
  try { return JSON.parse(localStorage.getItem('compare') || '[]') } catch { return [] }
}
export function setCompareList(list) { localStorage.setItem('compare', JSON.stringify(list.slice(0,4))) }
