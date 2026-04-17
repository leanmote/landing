"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does Leanmote integrate with our existing tools?",
    answer:
      "Leanmote connects seamlessly with GitHub, GitLab, Bitbucket, Jira, Linear, Asana, Slack, and many more. We use read-only access tokens and never store your source code. Setup takes under 5 minutes.",
  },
  {
    question: "What's included in each plan?",
    answer:
      "Startup is perfect for small teams starting their optimization journey with 1-year data retention. Scaleup adds advanced analytics and priority support for growing teams. Enterprise includes SSO/SCIM, custom API services, and a dedicated success manager.",
  },
  {
    question: "Can I try Leanmote before committing?",
    answer:
      "Yes! We offer personalized demos where you can see Leanmote with your own data. Book a demo and our team will walk you through exactly how Leanmote can help your specific use case.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing is based on your team size and scales with your organization. Use our ROI calculator above to estimate your potential savings and investment. We offer flexible billing options for annual commitments.",
  },
  {
    question: "Is my data secure with Leanmote?",
    answer:
      "Absolutely. We're SOC2 Type II certified, use read-only access to your repositories, and never store source code. We only process metadata and aggregate metrics. Your code never leaves your infrastructure.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Startup plans include standard support. Scaleup plans get priority support. Enterprise customers receive a dedicated Customer Success Manager and custom SLAs for critical issues.",
  },
]

export function FAQSection() {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-white/5 rounded-xl border border-white/10 px-6 data-[state=open]:bg-white/10"
        >
          <AccordionTrigger className="text-left text-white font-medium hover:no-underline py-5 text-base">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-400 pb-5 leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
