import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api, getCompareList, setCompareList, getUser } from '../lib/api'

export default function ProductDetail(){
  const { slug } = useParams()
  const [p, setP] = useState(null)
  const [compare, setCompare] = useState(getCompareList())
  const user = getUser()

  useEffect(() => { (async () => { try { setP(await api.getProduct(slug)) } catch(e){ console.error(e) } })() }, [slug])

  const toggleCompare = () => {
    const exists = compare.includes(p.id)
    const next = exists ? compare.filter(i => i !== p.id) : [...compare, p.id].slice(0,4)
    setCompare(next)
    setCompareList(next)
  }

  if (!p) return <div className="min-h-screen"><Navbar/><div className="max-w-7xl mx-auto p-8">Loading...</div><Footer/></div>

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="aspect-[4/3] bg-slate-50 rounded-lg overflow-hidden">
              <img src={p.images?.[0] || p.thumbnail} alt={p.title} className="w-full h-full object-cover"/>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {(p.images||[]).map((img, idx) => (
                <img key={idx} src={img} className="h-16 w-20 object-cover rounded border border-slate-200"/>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{p.title}</h1>
            <p className="text-sm text-slate-500">{p.brand}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="text-3xl font-bold text-blue-600">${p.price}</div>
              <button onClick={toggleCompare} className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50">{compare.includes(p.id)? 'Remove from Compare' : 'Add to Compare'}</button>
              <button onClick={async()=>{ if(!user) return alert('Login first (demo)'); await api.toggleWishlist(user.id, p.id); alert('Wishlist updated') }} className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50">Add to Wishlist</button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Spec label="Display" value={p.specs?.display} />
              <Spec label="Camera" value={p.specs?.camera} />
              <Spec label="Performance" value={p.specs?.performance} />
              <Spec label="Battery" value={p.specs?.battery} />
              <Spec label="RAM" value={p.specs?.ram} />
              <Spec label="Storage" value={p.specs?.storage} />
              <Spec label="OS" value={p.specs?.os} />
            </div>

            <div className="mt-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-3">Prices</h3>
              <div className="space-y-2">
                {(p.price_sources||[]).map((ps, idx) => (
                  <a key={idx} href={ps.url || '#'} className="flex items-center justify-between px-3 py-2 rounded border hover:bg-slate-50">
                    <span className="text-slate-700">{ps.merchant}</span>
                    <span className="font-semibold text-slate-900">${ps.price}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Spec({ label, value }){
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-medium text-slate-800">{value || '-'}</div>
    </div>
  )
}
