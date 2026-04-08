'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/** Transparent mark so scaling doesn’t paint a solid backdrop behind the nav/footer. */
function BrandLogo({ placement }: { placement: 'nav' | 'footer' }) {
  const img =
    placement === 'nav'
      ? 'h-9 max-h-9 w-auto object-contain object-left scale-[1.72] origin-left sm:h-10 sm:max-h-10 sm:scale-[1.9]'
      : 'h-10 max-h-10 w-auto object-contain object-left scale-[1.85] origin-left sm:h-11 sm:max-h-11 sm:scale-[2]'
  return (
    <span className="inline-flex items-center">
      <img
        src="/trak_logo_transparent.png"
        alt="Trak"
        className={`block ${img}`}
        draggable={false}
      />
    </span>
  )
}

export default function Home() {
  const [isSticky, setIsSticky] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', contact: '' })

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, contact: formData.contact }),
      })

      if (!response.ok) {
        throw new Error('Failed to join waitlist')
      }

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'waitlist_signup', {
          email: formData.contact,
        })
      }

      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: '', contact: '' })
      }, 5000)
    } catch (error) {
      console.error('Error joining waitlist:', error)
      alert('Failed to join waitlist. Please try again.')
    }
  }

  const handleHeroCTA = async () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_cta_click')
    }
    try {
      await fetch('/api/pricing-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'start_free_7_days',
          source: 'hero_primary_cta',
        }),
      })
    } catch (error) {
      console.error('Error tracking event:', error)
    }
    scrollToSection('waitlist')
  }

  const handleSeeHow = () => {
    scrollToSection('chat-demo')
  }

  const handlePricingCTA = async () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pro_pricing_79_click')
    }
    try {
      await fetch('/api/pricing-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'pro_79_month',
          source: 'pricing_pro_cta',
        }),
      })
    } catch (error) {
      console.error('Error tracking event:', error)
    }
    scrollToSection('waitlist')
  }

  const handleNavbarCTA = () => {
    scrollToSection('waitlist')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandLogo placement="nav" />
          </div>
          <button
            onClick={handleNavbarCTA}
            className="px-5 py-2 rounded-lg border border-foreground text-foreground hover:bg-foreground/10 transition-colors text-sm font-medium"
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.08] md:leading-[1.1] mb-6 text-balance">
            Track your expenses by just{' '}
            <span className="text-accent">talking.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 text-balance">
            Type it. Say it. Done.
            <br />
            Trak logs your expenses, categorizes them, and gives insights instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleHeroCTA}
              className="px-8 py-4 bg-accent text-accent-foreground font-semibold allow-rounded-pill hover:bg-accent/90 transition-colors"
            >
              Start Free — 7 Days Pro
            </button>
            <button
              onClick={handleSeeHow}
              className="px-8 py-4 border border-foreground/30 text-foreground hover:bg-foreground/5 transition-colors allow-rounded-pill font-semibold"
            >
              See how it works
            </button>
          </div>

          <p className="text-sm text-muted">
            Free 7 days · ₹79/month · Cancel anytime
          </p>
        </div>
      </section>

      {/* Chat Demo Section - CORE DIFFERENTIATOR */}
      <section id="chat-demo" className="py-20 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">
            Chat-first expense tracking.
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Chat UI Mockup */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-foreground/5 rounded-3xl p-4 border border-border shadow-2xl">
                {/* Phone Header */}
                <div className="bg-secondary rounded-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-secondary px-4 py-2 flex justify-between text-xs text-foreground/60">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <span>📶</span>
                      <span>📡</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="bg-secondary p-4 space-y-4 h-96 overflow-y-auto">
                    {/* User Message 1 */}
                    <div className="flex justify-end">
                      <div className="max-w-xs bg-accent text-accent-foreground rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                        ₹120 chai
                      </div>
                    </div>

                    {/* AI Response 1 */}
                    <div className="flex justify-start">
                      <div className="max-w-xs bg-foreground/10 text-foreground rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                        Added ₹120 → Food
                      </div>
                    </div>

                    {/* User Message 2 */}
                    <div className="flex justify-end">
                      <div className="max-w-xs bg-accent text-accent-foreground rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                        spent 450 on Swiggy
                      </div>
                    </div>

                    {/* AI Response 2 */}
                    <div className="flex justify-start">
                      <div className="max-w-xs bg-foreground/10 text-foreground rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                        Added ₹450 → Food
                      </div>
                    </div>

                    {/* User Message 3 */}
                    <div className="flex justify-end">
                      <div className="max-w-xs bg-accent text-accent-foreground rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                        how much did I spend on food?
                      </div>
                    </div>

                    {/* AI Response 3 */}
                    <div className="flex justify-start">
                      <div className="max-w-xs bg-foreground/10 text-foreground rounded-2xl rounded-tl-none px-4 py-2 text-sm space-y-1">
                        <div>You&apos;ve spent ₹3,240 on food this month</div>
                        <div>Food spend is 25% higher than last month</div>
                      </div>
                    </div>
                  </div>

                  {/* Input Box */}
                  <div className="bg-secondary border-t border-border p-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Say something..."
                      className="flex-1 bg-foreground/10 rounded-2xl px-4 py-2 text-sm text-foreground placeholder:text-foreground/50 outline-none"
                    />
                    <button className="text-accent hover:text-accent/80 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                        <path d="M17 16.91c-1.48 1.46-3.52 2.37-5.77 2.37-2.25 0-4.29-.91-5.77-2.37M19 12v2h4v-2z" opacity="0.3" />
                        <path d="M12 20c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Zero effort tracking.</h3>
                <p className="text-muted">
                  Just chat naturally. Trak understands context, categorizes instantly, and learns your patterns.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">AI that gets you.</h3>
                <p className="text-muted">
                  Not just logging expenses. Smart insights, spending patterns, and optimization tips in real-time.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">Works your way.</h3>
                <p className="text-muted">
                  Type, speak in Hindi or English, or import UPI notifications. Trak handles it all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Input Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">
              Too lazy to type? Just say it.
            </h2>
            <p className="text-lg text-muted">
              Supports Hindi + English voice input
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent">
              <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 16.91c-1.48 1.46-3.52 2.37-5.77 2.37-2.25 0-4.29-.91-5.77-2.37M19 12v2h4v-2z" />
                <path d="M12 20c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z" />
              </svg>
            </div>
          </div>

          <p className="mt-8 text-muted max-w-2xl mx-auto">
            Just press the mic button and speak naturally. "Spent 500 on chai", "how much on transport?", "show my food budget" — Trak gets it all.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">
            Every expense app fails the same way
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Too much manual entry', desc: 'Click, select, type, confirm. Repeat forever.' },
              { title: 'Too many steps', desc: 'Categories, tags, notes, attachments. Why so much friction?' },
              { title: 'Too much clutter', desc: 'Graphs, charts, reports. You just want to know if you overspent.' },
            ].map((item, idx) => (
              <Card key={idx} className="bg-card border-border p-6">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">
            How it works
          </h2>

          <div className="space-y-12">
            {[
              { num: '1', title: 'Type or speak', desc: 'Just say your expense naturally. No forms, no clicks.' },
              { num: '2', title: 'AI logs everything', desc: 'Trak instantly categorizes and stores it.' },
              { num: '3', title: 'Ask anything', desc: 'Chat about your money. Get insights. Make smarter decisions.' },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Chat-first logging',
                icon: (
                  <svg className="w-10 h-10 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )
              },
              {
                title: 'Voice input (Hindi + English)',
                icon: (
                  <svg className="w-10 h-10 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 16.91c-1.48 1.46-3.52 2.37-5.77 2.37-2.25 0-4.29-.91-5.77-2.37M19 12v2h4v-2z" />
                    <path d="M12 20c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z" />
                  </svg>
                )
              },
              {
                title: 'AI categorization',
                icon: (
                  <svg className="w-10 h-10 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                )
              },
              {
                title: 'Smart insights',
                icon: (
                  <svg className="w-10 h-10 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                )
              },
              {
                title: 'Budget suggestions',
                icon: (
                  <svg className="w-10 h-10 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                  </svg>
                )
              },
              {
                title: 'Organization tags',
                icon: (
                  <svg className="w-10 h-10 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                )
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-3">{feature.icon}</div>
                <p className="font-semibold">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">
            Simple pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="bg-card border-border p-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-muted mb-8">Limited usage. Basic tracking.</p>

              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>50 transactions/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Basic categorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Voice input</span>
                </li>
              </ul>

              <button className="w-full px-6 py-3 border border-foreground/30 text-foreground font-semibold rounded-lg hover:bg-foreground/5 transition-colors">
                Get Started Free
              </button>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-card border-2 border-accent p-8 relative">
              <div className="absolute -top-4 left-6 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                RECOMMENDED
              </div>

              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-8">
                <span className="text-4xl font-bold">₹79</span>
                <span className="text-muted">/month</span>
              </div>

              <p className="text-muted mb-8 text-sm">
                Early users get lifetime deal ₹1,499 (limited)
              </p>

              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Unlimited transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>AI insights + smart categorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Budget alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>AI spending coach — chat about expenses, get optimization tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Smart minimization suggestions — save more every month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>PDF/CSV export</span>
                </li>
              </ul>

              <button
                onClick={handlePricingCTA}
                className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Start 7-Day Free Trial
              </button>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-6 bg-secondary/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Be the first to try Trak.
          </h2>
          <p className="text-muted mb-10">
            Join our waitlist and get early access with special founding member benefits.
          </p>

          {formSubmitted ? (
            <div className="p-8 bg-accent/20 border border-accent rounded-lg text-center">
              <div className="text-4xl mb-2">✓</div>
              <h3 className="text-xl font-bold text-accent mb-1">You&apos;re on the list!</h3>
              <p className="text-muted text-sm">We&apos;ll be in touch with early access details soon.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-card border-border allow-rounded-md"
                />
                <Input
                  type="text"
                  placeholder="Phone number or email"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                  className="bg-card border-border allow-rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-accent text-accent-foreground font-semibold allow-rounded-md hover:bg-accent/90 transition-colors"
              >
                Join Waitlist →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <BrandLogo placement="footer" />
            <p className="text-muted text-sm mt-3">Built for India. Zero friction.</p>
          </div>
          <div className="flex gap-6 text-muted text-sm">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
