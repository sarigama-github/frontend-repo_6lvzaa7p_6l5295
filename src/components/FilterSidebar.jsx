import { useState, useEffect } from 'react'

export default function FilterSidebar({ onChange, initial = {} }){
  const [brand, setBrand] = useState(initial.brand || '')
  const [minPrice, setMinPrice] = useState(initial.minPrice || '')
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice || '')
  const [ram, setRam] = useState(initial.ram || '')
  const [storage, setStorage] = useState(initial.storage || '')
  const [os_name, setOS] = useState(initial.os_name || '')

  useEffect(() => {
    const t = setTimeout(() => onChange({ brand, minPrice, maxPrice, ram, storage, os_name }), 200)
    return () => clearTimeout(t)
  }, [brand, minPrice, maxPrice, ram, storage, os_name])

  const Input = (p) => (
    <input {...p} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
  )

  return (
    <aside className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <h3 className="font-semibold text-slate-800 mb-3">Filters</h3>
      <div className="space-y-3 text-sm">
        <div>
          <label className="block text-slate-600 mb-1">Brand</label>
          <Input value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Apple, Samsung..." />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-slate-600 mb-1">Min Price</label>
            <Input type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="block text-slate-600 mb-1">Max Price</label>
            <Input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="2000" />
          </div>
        </div>
        <div>
          <label className="block text-slate-600 mb-1">RAM</label>
          <Input value={ram} onChange={e=>setRam(e.target.value)} placeholder="8GB, 12GB" />
        </div>
        <div>
          <label className="block text-slate-600 mb-1">Storage</label>
          <Input value={storage} onChange={e=>setStorage(e.target.value)} placeholder="128GB, 256GB" />
        </div>
        <div>
          <label className="block text-slate-600 mb-1">OS</label>
          <Input value={os_name} onChange={e=>setOS(e.target.value)} placeholder="Android, iOS" />
        </div>
      </div>
    </aside>
  )
}
