'use client'

import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { SplineScene } from '@/components/ui/splite'

export function SplineSceneBasic() {
  return (
    <Card className="scene-card relative isolate grid min-h-[560px] w-full overflow-hidden border-white/10 bg-[#13231d] text-white shadow-2xl shadow-[#142d24]/15 md:min-h-[540px] md:grid-cols-[0.9fr_1.1fr]">
      <Spotlight className="-top-32 left-0 z-0 md:left-24" size={360} />

      <div className="scene-copy relative z-10 flex flex-col justify-between p-7 sm:p-10 md:p-12">
        <div>
          <p className="scene-eyebrow"><span /> Native Nigerian flavour · Surulere, Lagos</p>
          <h1 className="mt-8 max-w-xl font-display text-6xl font-extrabold uppercase leading-[0.82] text-[#fffaf4] sm:text-7xl lg:text-8xl">
            Roots on<br />the table.<br /><span className="text-[#d89b4a]">Lagos in<br />the air.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/70 sm:text-base">
            Ofada rice, native sauce and rooftop evenings made for lingering over one more story.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-5">
          <img
            className="h-[68px] w-[68px] rounded-full border border-[#d89b4a]/70 object-cover object-center"
            src="/images/ofada.jpg"
            alt="Ofada rice with native sauce"
            width="550"
            height="550"
          />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e6bd7c]">House favourite</p>
            <p className="mt-1 font-display text-2xl font-bold">Classic Ofada</p>
          </div>
          <a className="scene-menu-link ml-auto" href="../menu.html" aria-label="Explore the full menu">↗</a>
        </div>
      </div>

      <div className="scene-viewport relative z-10 min-h-[310px] overflow-hidden md:min-h-full">
        <div className="scene-label" aria-hidden="true">OFADA HEAVEN · 01</div>
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="h-full w-full"
        />
        <p className="scene-caption">A little motion. A lot of flavour.</p>
      </div>
    </Card>
  )
}
