import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { api } from '../lib/api'

export default function Home(){
  const [featured, setFeatured] = useState([])
  const [trending, setTrending] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    (async () => {
      try {
        await api.seed()
      } catch {}
      try {
        const res = await api.listProducts({ sort: 'popularity', limit: 8 }); setFeatured(res.items)
        const res2 = await api.listProducts({ sort: 'latest', limit: 12 }); setTrending(res2.items)
        const br = await api.brands(); setBrands(br)
      } catch (e) { console.error(e) }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />

      <main className="max-w-7xl mx-auto px-4">
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Featured smartphones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {featured.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Trending now</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trending.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Top brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {brands.map(b => (
              <div key={b.id} className="bg-white rounded-xl border border-slate-200 py-4 px-3 flex items-center justify-center shadow-sm">
                <img src={b.logo_url} alt={b.name} className="h-6 object-contain"/>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
