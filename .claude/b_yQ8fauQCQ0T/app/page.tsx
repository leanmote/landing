import { Header } from "@/components/header"
import { ROICalculator } from "@/components/roi-calculator"
import { PlanCards } from "@/components/plan-cards"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Zap, BarChart3, Clock, ArrowRight } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-navy">
      <Header />

      {/* Hero Section - Matching Figma style */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-light" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/20 rounded-full blur-[100px] opacity-40" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* GraphRAG Badge - Matching Figma style */}
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-5 py-2 mb-8">
            <span className="text-teal font-semibold text-sm tracking-wide uppercase">
              ROI-Driven Pricing
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
            Pricing as{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-400">
              transparent
            </span>{" "}
            as your metrics
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
            No hidden fees. No per-seat surprises. Just transparent pricing that scales with your team and delivers measurable ROI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark text-navy font-semibold px-8 py-4 rounded-xl transition-all group"
            >
              Calculate Your ROI
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://be.leanmote.com/book-a-demo-0"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-xl transition-all hover:bg-white/5"
            >
              Start Performance Audit
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-4 border-y border-white/5 bg-navy-light/50">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-teal" />
            <span className="text-gray-400 text-sm">
              Leaders save <span className="text-white font-semibold">6.4 hours/week</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-teal" />
            <span className="text-gray-400 text-sm">
              <span className="text-white font-semibold">40% faster</span> decision-making
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-teal" />
            <span className="text-gray-400 text-sm">
              <span className="text-white font-semibold">25%</span> improved allocation
            </span>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculator" className="py-20 px-4 bg-background scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-teal font-medium text-xs tracking-wide uppercase">
                ROI Calculator
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Calculate your potential savings
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how much your organization could save with Leanmote&apos;s AI-powered engineering intelligence.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-xl">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 px-4 bg-navy">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-teal font-medium text-xs tracking-wide uppercase">
                Plans
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Pricing as transparent as your metrics
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every plan includes full access to our GraphRAG-powered insights engine.
            </p>
          </div>

          <PlanCards />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-navy">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-teal font-medium text-xs tracking-wide uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently asked questions
            </h2>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  )
}
