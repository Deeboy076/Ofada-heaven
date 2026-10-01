import { SplineSceneBasic } from '@/components/spline-scene-basic'

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6efe5] text-[#1f241f]">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
        <a className="brand-lockup" href="../index.html" aria-label="Ofada Heaven homepage">
          <span>OFADA</span><b>HEAVEN</b>
        </a>
        <nav className="flex items-center gap-6 text-xs font-semibold text-[#183f32] sm:gap-9 sm:text-sm" aria-label="Main navigation">
          <a className="nav-link" href="../menu.html">Menu</a>
          <a className="nav-link" href="../about.html">Our story</a>
          <a className="nav-link" href="../contact.html">Find us</a>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-6 sm:px-10 sm:pb-16 sm:pt-10 lg:px-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="page-kicker">THE ROOFTOP TABLE</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#5f665f] sm:text-base">
              Native comfort food and easy Lagos evenings, with a little extra life around the table.
            </p>
          </div>
          <span className="page-index hidden sm:block">01 / 03</span>
        </div>
        <SplineSceneBasic />
        <div className="below-note mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5f665f]">
          <span>62 Adeniran Ogunsanya St · Surulere, Lagos</span>
          <a href="../menu.html">See what’s on the menu <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  )
}
