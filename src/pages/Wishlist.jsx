import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { api, getUser } from '../lib/api'

export default function Wishlist(){
  const user = getUser()
  const [items, setItems] = useState([])

  useEffect(() => { (async () => { if(!user) return; try { setItems(await api.getWishlist(user.id)) } catch(e){ console.error(e) } })() }, [])

  if (!user) return <div className="min-h-screen"><Navbar /><div className="max-w-7xl mx-auto p-8">Login first to see your wishlist (demo).</div><Footer/></div>

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Your wishlist</h1>
        {items.length === 0 ? (
          <p className="text-slate-600">No items yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
