import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative">
      <div className="h-[420px] md:h-[560px] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="bg-white/70 backdrop-blur rounded-2xl p-6 md:p-10 shadow-lg max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">Find the perfect gadget</h1>
            <p className="mt-3 text-slate-700 md:text-lg">Compare phones, laptops and wearables in seconds. Honest specs, clean UI, smarter decisions.</p>
            <div className="mt-5 flex items-center gap-3">
              <Link to="/category/mobiles" className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-semibold shadow">Browse Mobiles</Link>
              <Link to="/compare" className="pointer-events-auto bg-slate-900/90 hover:bg-slate-900 text-white px-5 py-2.5 rounded-md font-semibold shadow">Compare</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
