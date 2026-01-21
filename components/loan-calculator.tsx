"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Download, Calculator, Building, Banknote, Landmark, Home, AlertCircle, User } from "lucide-react"
import {
  propertyOptions,
  reservationFees,
  pagibigMaxLoan,
  downPaymentOptions,
  inHouseFactorRates,
  pagibigFactorRates,
  remainingAmountFactorRates,
  bankFactorRates,
  year2InterestRate,
  type PropertyOption,
} from "@/lib/data"
import { getAgentById } from "@/lib/agents"

type LoanResults = {
  price: number
  downPaymentPercent: number
  downPaymentAmount: number
  reservationFee: number
  option1Monthly: number
  option2Year1Monthly: number
  option2Year2WithInterest: number
  option2Year2Waived: number
  balanceAmount: number
  inHouseMonthly: Record<number, number>
  pagibigMonthly: Record<number, number>
  pagibigMaxMonthly: Record<number, number>
  remainingAmountMonthly: Record<number, number>
  bankMonthly: Record<number, number>
  hasRemainingAmount: boolean
  pagibigMaxLoanAmount: number | null
  remainingForDeveloper: number
}

export function LoanCalculator() {
  const searchParams = useSearchParams()
  const resultsRef = useRef<HTMLDivElement>(null)

  const [price, setPrice] = useState<string>("")
  const [propertyOption, setPropertyOption] = useState<PropertyOption>("nur_house_lot")
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20)
  const [results, setResults] = useState<LoanResults | null>(null)
  const [unitName, setUnitName] = useState<string>("")
  const [clientName, setClientName] = useState<string>("")
  const [agentName, setAgentName] = useState<string>("")

  // Pre-fill from URL params
  useEffect(() => {
    const priceParam = searchParams.get("price")
    const unitParam = searchParams.get("unit")
    const optionParam = searchParams.get("option") as PropertyOption | null
    const agentParam = searchParams.get("agent")

    if (priceParam) {
      setPrice(priceParam)
    }
    if (unitParam) {
      setUnitName(unitParam)
    }
    if (optionParam && propertyOptions.some((opt) => opt.value === optionParam)) {
      setPropertyOption(optionParam)
    }
    if (agentParam) {
      const agent = getAgentById(agentParam)
      if (agent) {
        setAgentName(agent.name)
      }
    }
  }, [searchParams])

  const calculateLoan = () => {
    const priceValue = Number.parseFloat(price)
    if (isNaN(priceValue) || priceValue <= 0) return

    const dpAmount = priceValue * (downPaymentPercent / 100)
    const resFee = reservationFees[propertyOption]
    const balance = priceValue - dpAmount
    const maxLoan = pagibigMaxLoan[propertyOption]

    // Option 1: Monthly DP in 12 months
    const option1 = (dpAmount - resFee) / 12

    // Option 2: DP in 2 years
    const year1Payable = priceValue * 0.1 - resFee
    const year2Payable = priceValue * 0.1
    const option2Year1 = year1Payable / 12
    const option2Year2Interest = year2Payable * year2InterestRate
    const option2Year2Waived = year2Payable / 12

    // In-House Financing
    const inHouseMonthly: Record<number, number> = {}
    Object.entries(inHouseFactorRates).forEach(([years, rate]) => {
      inHouseMonthly[Number.parseInt(years)] = balance * rate
    })

    // Pag-IBIG Financing
    const pagibigMonthly: Record<number, number> = {}
    Object.entries(pagibigFactorRates).forEach(([years, rate]) => {
      pagibigMonthly[Number.parseInt(years)] = balance * rate
    })

    // Pag-IBIG Max Loanable
    const pagibigMaxMonthly: Record<number, number> = {}
    if (maxLoan) {
      Object.entries(pagibigFactorRates).forEach(([years, rate]) => {
        pagibigMaxMonthly[Number.parseInt(years)] = maxLoan * rate
      })
    }

    // Remaining Amount Payable to Developer
    const hasRemaining = maxLoan !== null && balance > maxLoan
    const remainingForDev = hasRemaining ? balance - maxLoan : 0
    const remainingAmountMonthly: Record<number, number> = {}
    if (hasRemaining) {
      Object.entries(remainingAmountFactorRates).forEach(([years, rate]) => {
        remainingAmountMonthly[Number.parseInt(years)] = remainingForDev * rate
      })
    }

    // Bank Financing
    const bankMonthly: Record<number, number> = {}
    Object.entries(bankFactorRates).forEach(([years, rate]) => {
      bankMonthly[Number.parseInt(years)] = balance * rate
    })

    setResults({
      price: priceValue,
      downPaymentPercent,
      downPaymentAmount: dpAmount,
      reservationFee: resFee,
      option1Monthly: option1,
      option2Year1Monthly: option2Year1,
      option2Year2WithInterest: option2Year2Interest,
      option2Year2Waived: option2Year2Waived,
      balanceAmount: balance,
      inHouseMonthly,
      pagibigMonthly,
      pagibigMaxMonthly,
      remainingAmountMonthly,
      bankMonthly,
      hasRemainingAmount: hasRemaining,
      pagibigMaxLoanAmount: maxLoan,
      remainingForDeveloper: remainingForDev,
    })

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const exportToPDF = () => {
    if (!results) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const preparedForText =
      clientName && agentName
        ? `<p><strong>Prepared for:</strong> ${clientName}</p><p><strong>Prepared by:</strong> ${agentName}</p>`
        : clientName
          ? `<p><strong>Prepared for:</strong> ${clientName}</p>`
          : agentName
            ? `<p><strong>Prepared by:</strong> ${agentName}</p>`
            : ""

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Loan Computation - Aman Group of Companies</title>
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            padding: 40px; 
            color: #1a1a1a; 
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.5;
          }
          h1 { color: #166534; margin-bottom: 8px; font-size: 24px; }
          h2 { 
            color: #166534; 
            margin-top: 32px; 
            margin-bottom: 16px; 
            font-size: 18px; 
            border-bottom: 2px solid #166534;
            padding-bottom: 8px;
          }
          h3 { 
            color: #374151; 
            margin-top: 20px; 
            margin-bottom: 12px; 
            font-size: 15px;
            font-weight: 600;
          }
          .header { 
            margin-bottom: 32px; 
            border-bottom: 3px solid #166534; 
            padding-bottom: 20px; 
          }
          .header p { margin: 4px 0; color: #6b7280; }
          .section { margin-bottom: 24px; }
          .row { 
            display: flex; 
            justify-content: space-between; 
            padding: 12px 0; 
            border-bottom: 1px solid #e5e7eb; 
          }
          .row:last-child { border-bottom: none; }
          .label { color: #6b7280; }
          .value { font-weight: 600; text-align: right; }
          .highlight { 
            background: #f0fdf4; 
            padding: 16px; 
            border-radius: 8px; 
            margin: 16px 0;
            border: 1px solid #bbf7d0;
          }
          .highlight .row { border-bottom: none; padding: 8px 0; }
          .highlight .value { color: #166534; font-size: 18px; }
          .note {
            margin-top: 40px;
            padding: 16px;
            background: #fef3c7;
            border-radius: 8px;
            border: 1px solid #fcd34d;
            font-size: 13px;
            color: #92400e;
          }
          .note-title {
            font-weight: 600;
            margin-bottom: 4px;
          }
          @media print { 
            body { padding: 20px; } 
            .section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Aman Group of Companies</h1>
          <p><strong>Loan Computation Summary</strong></p>
          ${unitName ? `<p><strong>Property:</strong> ${unitName}</p>` : ""}
          ${preparedForText}
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
          <h2>Summary</h2>
          <div class="row">
            <span class="label">Total Contract Price</span>
            <span class="value">${formatCurrency(results.price)}</span>
          </div>
          <div class="row">
            <span class="label">Down Payment (${results.downPaymentPercent}%)</span>
            <span class="value">${formatCurrency(results.downPaymentAmount)}</span>
          </div>
          <div class="row">
            <span class="label">Reservation Fee</span>
            <span class="value">${formatCurrency(results.reservationFee)}</span>
          </div>
          <div class="highlight">
            <div class="row">
              <span class="label"><strong>Balance Amount</strong></span>
              <span class="value">${formatCurrency(results.balanceAmount)}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Down Payment Options</h2>
          <h3>Option 1: Monthly DP in 12 Months (0% Interest)</h3>
          <div class="row">
            <span class="label">Monthly Payment</span>
            <span class="value">${formatCurrency(results.option1Monthly)}</span>
          </div>
          
          <h3>Option 2: Down Payment (2 Years to Pay)</h3>
          <div class="row">
            <span class="label">Year 1 (0% Interest) - Monthly</span>
            <span class="value">${formatCurrency(results.option2Year1Monthly)}</span>
          </div>
          <div class="row">
            <span class="label">Year 2 (8.5% Interest) - Monthly</span>
            <span class="value">${formatCurrency(results.option2Year2WithInterest)}</span>
          </div>
          <div class="row">
            <span class="label">Year 2 (Waived Interest) - Monthly</span>
            <span class="value">${formatCurrency(results.option2Year2Waived)}</span>
          </div>
        </div>

        <div class="section">
          <h2>In-House Bridge Financing (8.5% Interest)</h2>
          ${Object.entries(results.inHouseMonthly)
            .map(
              ([years, amount]) => `
            <div class="row">
              <span class="label">${years} Years to Pay</span>
              <span class="value">${formatCurrency(amount)}</span>
            </div>
          `,
            )
            .join("")}
        </div>

        <div class="section">
          <h2>Pag-IBIG Financing (6.25% Interest)</h2>
          ${Object.entries(results.pagibigMonthly)
            .map(
              ([years, amount]) => `
            <div class="row">
              <span class="label">${years} Years to Pay</span>
              <span class="value">${formatCurrency(amount)}</span>
            </div>
          `,
            )
            .join("")}
        </div>

        ${
          results.hasRemainingAmount && results.pagibigMaxLoanAmount
            ? `
        <div class="section">
          <h2>Pag-IBIG Max Loanable (${formatCurrency(results.pagibigMaxLoanAmount)})</h2>
          ${Object.entries(results.pagibigMaxMonthly)
            .map(
              ([years, amount]) => `
            <div class="row">
              <span class="label">${years} Years to Pay</span>
              <span class="value">${formatCurrency(amount)}</span>
            </div>
          `,
            )
            .join("")}
        </div>

        <div class="section">
          <h2>Remaining to Developer (8.5% Interest) - ${formatCurrency(results.remainingForDeveloper)}</h2>
          ${Object.entries(results.remainingAmountMonthly)
            .map(
              ([years, amount]) => `
            <div class="row">
              <span class="label">${years} Year${Number.parseInt(years) > 1 ? "s" : ""} to Pay</span>
              <span class="value">${formatCurrency(amount)}</span>
            </div>
          `,
            )
            .join("")}
        </div>
        `
            : ""
        }

        <div class="section">
          <h2>Bank Financing (7.5% Interest)</h2>
          ${Object.entries(results.bankMonthly)
            .map(
              ([years, amount]) => `
            <div class="row">
              <span class="label">${years} Years to Pay</span>
              <span class="value">${formatCurrency(amount)}</span>
            </div>
          `,
            )
            .join("")}
        </div>

        <div class="note">
          <div class="note-title">Disclaimer</div>
          This calculation is for estimation purposes only. Actual rates and terms may vary. Please consult with Aman Group of Companies for accurate computations.
        </div>
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {unitName && (
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Calculating for:</p>
              <p className="font-semibold text-primary">{unitName}</p>
            </div>
          )}

          {agentName && (
            <div className="p-3 bg-primary/10 rounded-lg flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm">
                Agent: <strong>{agentName}</strong>
              </span>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">

            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name (Optional)</Label>
              <Input
                id="client-name"
                placeholder="Enter client name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Total Contract Price (PHP)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="property-option">Property Option</Label>
              <Select value={propertyOption} onValueChange={(value: PropertyOption) => setPropertyOption(value)}>
                <SelectTrigger className="w-full h-11" id="property-option">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {propertyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="downpayment">Down Payment</Label>
              <Select
                value={downPaymentPercent.toString()}
                onValueChange={(value) => setDownPaymentPercent(Number.parseInt(value))}
              >
                <SelectTrigger className="w-full h-11" id="downpayment">
                  <SelectValue placeholder="Select %" />
                </SelectTrigger>
                <SelectContent>
                  {downPaymentOptions.map((percent) => (
                    <SelectItem key={percent} value={percent.toString()}>
                      {percent}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateLoan} className="w-full sm:w-auto" size="lg">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Loan
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div ref={resultsRef} id="loan-results" className="space-y-6">
          {/* Summary Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Contract Price</p>
                  <p className="text-xl lg:text-2xl font-bold text-primary">{formatCurrency(results.price)}</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-muted-foreground mb-1">{results.downPaymentPercent}% Down Payment</p>
                  <p className="text-xl lg:text-2xl font-bold">{formatCurrency(results.downPaymentAmount)}</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-muted-foreground mb-1">Reservation Fee</p>
                  <p className="text-xl lg:text-2xl font-bold">{formatCurrency(results.reservationFee)}</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-sm text-muted-foreground mb-1">Balance Amount</p>
                  <p className="text-xl lg:text-2xl font-bold text-primary">{formatCurrency(results.balanceAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Down Payment Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Banknote className="h-5 w-5" />
                  Down Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Option 1: Monthly DP in 12 Months (0% Interest)</h4>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(results.option1Monthly)}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Option 2: Down Payment (2 Years to Pay)</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Year 1 (0% Interest) - Monthly</p>
                      <p className="text-lg font-bold">{formatCurrency(results.option2Year1Monthly)}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Year 2 (8.5% Interest) - Monthly</p>
                      <p className="text-lg font-bold">{formatCurrency(results.option2Year2WithInterest)}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Year 2 (Waived Interest) - Monthly</p>
                      <p className="text-lg font-bold">{formatCurrency(results.option2Year2Waived)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* In-House Financing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building className="h-5 w-5" />
                  In-House Bridge Financing (8.5% Interest)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(results.inHouseMonthly).map(([years, amount]) => (
                    <div key={years} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                      <span className="text-muted-foreground">{years} Years to Pay</span>
                      <span className="font-bold">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pag-IBIG Financing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Landmark className="h-5 w-5" />
                  Pag-IBIG Financing (6.25% Interest)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(results.pagibigMonthly).map(([years, amount]) => (
                    <div key={years} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                      <span className="text-muted-foreground">{years} Years to Pay</span>
                      <span className="font-bold">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {results.hasRemainingAmount && results.pagibigMaxLoanAmount && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Landmark className="h-5 w-5" />
                      Pag-IBIG Max Loanable ({formatCurrency(results.pagibigMaxLoanAmount)})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(results.pagibigMaxMonthly).map(([years, amount]) => (
                        <div key={years} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                          <span className="text-muted-foreground">{years} Years to Pay</span>
                          <span className="font-bold">{formatCurrency(amount)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Home className="h-5 w-5" />
                      Remaining to Developer (8.5% Interest)
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Amount: {formatCurrency(results.remainingForDeveloper)}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(results.remainingAmountMonthly).map(([years, amount]) => (
                        <div key={years} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                          <span className="text-muted-foreground">
                            {years} Year{Number.parseInt(years) > 1 ? "s" : ""} to Pay
                          </span>
                          <span className="font-bold">{formatCurrency(amount)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Bank Financing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Banknote className="h-5 w-5" />
                  Bank Financing (7.5% Interest)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(results.bankMonthly).map(([years, amount]) => (
                    <div key={years} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                      <span className="text-muted-foreground">{years} Years to Pay</span>
                      <span className="font-bold">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Button */}
          <div className="flex justify-center">
            <Button onClick={exportToPDF} variant="outline" size="lg" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export to PDF
            </Button>
          </div>

          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 mb-1">Important Notes</p>
                   <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>This calculation is for estimation purposes only. Actual rates and terms may vary. Please consult with Aman Group of Companies for accurate computations.</li>
                    <li>
                      Additional charges such as reservation fees, processing fees, and documentary stamp taxes are not
                      included in these calculations.
                    </li>
                    <li>
                      The standard reservation fee is ₱25,000.00 and is non-refundable but deductible from the total contract
                      price.
                    </li>
                    <li>Interest rates are subject to change without prior notice.</li>
                    <li> Please consult with our sales representatives for the most current rates and terms.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
