import { Heart, Plus, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getUser, api, getCompareList, setCompareList } from '../lib/api'

export default function ProductCard({ p }){
  const user = getUser()

  const toggleWishlist = async (e) => {
    e.preventDefault(); e.stopPropagation()
    if (!user) return alert('Login first (demo)')
    await api.toggleWishlist(p.user_id || user.id, p.id)
    alert('Wishlist updated')
  }

  const toggleCompare = (e) => {
    e.preventDefault(); e.stopPropagation()
    const current = getCompareList()
    const exists = current.includes(p.id)
    const next = exists ? current.filter(i => i !== p.id) : [...current, p.id]
    setCompareList(next)
    alert('Compare list updated')
  }

  return (
    <Link to={`/product/${p.slug}`} className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
        <img src={p.thumbnail || p.images?.[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 line-clamp-1">{p.title}</h3>
          {p.rating && (
            <span className="text-xs bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
              <Star className="w-3 h-3"/> {p.rating}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{p.brand}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="font-bold text-blue-600">${p.price}</div>
          <div className="flex items-center gap-2 text-slate-500">
            <button onClick={toggleWishlist} className="hover:text-rose-600" title="Wishlist"><Heart className="w-5 h-5"/></button>
            <button onClick={toggleCompare} className="hover:text-blue-600" title="Compare"><Plus className="w-5 h-5"/></button>
          </div>
        </div>
      </div>
    </Link>
  )
}
