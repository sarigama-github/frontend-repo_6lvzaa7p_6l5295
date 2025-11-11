import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api, getCompareList } from '../lib/api'

export default function Compare(){
  const [items, setItems] = useState([])
  useEffect(() => { (async () => {
    const ids = getCompareList()
    if (ids.length === 0) return
    try {
      const res = await api.compare(ids)
      setItems(res)
    } catch(e){ console.error(e) }
  })() }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Compare devices</h1>
        {items.length === 0 ? (
          <p className="text-slate-600">Add some products to compare from product pages.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full bg-white rounded-xl border border-slate-200 shadow-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-sm text-slate-600">
                  <th className="p-3">Spec</th>
                  {items.map(p => <th key={p.id} className="p-3 font-semibold">{p.title}</th>)}
                </tr>
              </thead>
              <tbody className="text-sm">
                <Row label="Image">{items.map(p => (
                  <td key={p.id} className="p-3"><img src={p.thumbnail || p.images?.[0]} className="h-20 w-28 object-cover rounded border"/></td>
                ))}</Row>
                <Row label="Price">{items.map(p => <td key={p.id} className="p-3 font-semibold text-blue-600">${p.price}</td>)}</Row>
                <Row label="Display">{items.map(p => <td key={p.id} className="p-3">{p.specs?.display || '-'}</td>)}</Row>
                <Row label="Camera">{items.map(p => <td key={p.id} className="p-3">{p.specs?.camera || '-'}</td>)}</Row>
                <Row label="Performance">{items.map(p => <td key={p.id} className="p-3">{p.specs?.performance || '-'}</td>)}</Row>
                <Row label="Battery">{items.map(p => <td key={p.id} className="p-3">{p.specs?.battery || '-'}</td>)}</Row>
                <Row label="RAM">{items.map(p => <td key={p.id} className="p-3">{p.specs?.ram || '-'}</td>)}</Row>
                <Row label="Storage">{items.map(p => <td key={p.id} className="p-3">{p.specs?.storage || '-'}</td>)}</Row>
                <Row label="OS">{items.map(p => <td key={p.id} className="p-3">{p.specs?.os || '-'}</td>)}</Row>
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

function Row({ label, children }){
  return (
    <tr className="border-t border-slate-200">
      <td className="p-3 font-semibold bg-slate-50 text-slate-700 min-w-[160px]">{label}</td>
      {children}
    </tr>
  )
}
