import { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'
import { api } from '../lib/api'

export default function Category(){
  const { slug } = useParams()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState(Object.fromEntries(params.entries()))

  const title = useMemo(() => {
    const map = { mobiles: 'Mobiles', laptops: 'Laptops', tablets: 'Tablets', watches: 'Smartwatches', accessories: 'Accessories' }
    return map[slug] || 'Products'
  }, [slug])

  const categoryMap = { mobiles: 'mobile', laptops: 'laptop', tablets: 'tablet', watches: 'watch', accessories: 'accessory' }

  useEffect(() => {
    (async () => {
      try {
        const res = await api.listProducts({ category: categoryMap[slug], page, limit: 16, sort: 'latest', ...filters })
        setItems(res.items); setTotal(res.total)
      } catch (e) { console.error(e) }
    })()
  }, [slug, page, JSON.stringify(filters)])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-4">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1"><FilterSidebar onChange={setFilters} initial={filters} /></div>
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-3 text-sm text-slate-600">
              <span>{total} results</span>
              <select className="border border-slate-300 rounded px-2 py-1" onChange={e=>setFilters({ ...filters, sort: e.target.value })} defaultValue={filters.sort || 'latest'}>
                <option value="popularity">Popularity</option>
                <option value="latest">Latest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
