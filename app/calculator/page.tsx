import { Suspense } from "react"
import { Calculator } from "lucide-react"
import { LoanCalculator } from "@/components/loan-calculator"
import { AgentTools } from "@/components/agent-tools"

export const metadata = {
  title: "Loan Calculator | Aman Group of Companies",
  description:
    "Calculate your home loan with our easy-to-use calculator. Get estimates for Pag-IBIG, Bank, and In-House financing options.",
}

export default function CalculatorPage() {
  return (
    <div className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <Calculator className="h-5 w-5" />
            <span className="text-sm font-medium">Loan Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Calculate Your Home Loan</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Get detailed estimates for your monthly payments across different financing options including Pag-IBIG,
            Bank, and In-House financing.
          </p>
        </div>

        {/* Calculator */}
        <Suspense fallback={<div className="text-center py-12">Loading calculator...</div>}>
          <LoanCalculator />
        </Suspense>

        <AgentTools currentPath="/calculator" />
      </div>
    </div>
  )
}
