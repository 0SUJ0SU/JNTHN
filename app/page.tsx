import Hero from "@/components/home/Hero"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="bg-cream" style={{ padding: '12px', height: '100vh', boxSizing: 'border-box' }}>
        <Footer />
      </div>
    </main>
  )
}
