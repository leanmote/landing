import { Check, ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Startup",
    description: "Perfect for small teams starting their engineering intelligence journey.",
    teamSize: "up to 20 users",
    features: [
      "1-Year Data Retention",
      "Performance Management",
      "Unlimited Custom Dashboards",
      "Team Interactions Knowledge Graph",
      "AI Workflow & Bottleneck Insights",
      "Workflow Metrics",
      "DORA Metrics"
    ],
    cta: "Book a Demo",
    href: "https://be.leanmote.com/book-a-demo-0",
    highlighted: false
  },
  {
    name: "Scaleup",
    description: "For growing teams that need deeper insights and extended capabilities.",
    teamSize: "21-100 users",
    features: [
      "Everything in Startup, plus:",
      "2-Year Data Retention",
      "Advanced Analytics",
      "Priority Support",
      "Custom Integrations",
      "Team Health Scoring",
      "Sprint Forecasting"
    ],
    cta: "Book a Demo",
    href: "https://be.leanmote.com/book-a-demo-0",
    highlighted: true
  },
  {
    name: "Enterprise",
    description: "For large organizations requiring advanced features and customization.",
    teamSize: "101+ users",
    features: [
      "Everything in Scaleup, plus:",
      "3-Year Data Retention",
      "SSO/SCIM Access",
      "Custom API Services",
      "Dedicated Success Manager",
      "On-Premise Deployment Option",
      "Custom SLAs"
    ],
    cta: "Talk to Sales",
    href: "https://be.leanmote.com/book-a-demo-0",
    highlighted: false
  }
]

export function PlanCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-2xl p-8 transition-all ${
            plan.highlighted
              ? "bg-gradient-to-b from-teal/20 via-teal/5 to-transparent border-2 border-teal shadow-lg shadow-teal/10"
              : "bg-white/5 border border-white/10 hover:border-white/20"
          }`}
        >
          {plan.highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-teal text-navy text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                Most Popular
              </span>
            </div>
          )}

          <div className="mb-6">
            <span className="text-xs font-semibold text-teal uppercase tracking-wider">
              {plan.teamSize}
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">{plan.name}</h3>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{plan.description}</p>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  plan.highlighted ? "bg-teal/20" : "bg-white/10"
                }`}>
                  <Check className="w-3 h-3 text-teal" />
                </div>
                <span className={`text-sm ${
                  feature.includes("Everything") 
                    ? "text-teal font-medium" 
                    : "text-gray-300"
                }`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={plan.href}
            className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold transition-all group ${
              plan.highlighted
                ? "bg-teal hover:bg-teal-dark text-navy"
                : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
            }`}
          >
            {plan.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      ))}
    </div>
  )
}
