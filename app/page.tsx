import Hero from "@/components/home/Hero"
import WhatIDo from "@/components/home/WhatIDo"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <div className="bg-cream" style={{ padding: '12px', height: '100vh', boxSizing: 'border-box' }}>
        <Footer />
      </div>
    </main>
  )
}
