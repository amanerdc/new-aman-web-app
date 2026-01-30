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
import html2canvas from "html2canvas"
import Image from "next/image"
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
import { findUnitByDisplayName } from "@/lib/utils"

type LoanResults = {
  price: number
  downPaymentPercent: number
  downPaymentAmount: number
  reservationFee: number
  option1Monthly: number
  option1RequiredIncome: number
  option2Year1Monthly: number
  option2Year2WithInterest: number
  option2Year2WithInterestRequiredIncome: number
  option2Year2Waived: number
  balanceAmount: number
  inHouseMonthly: Record<number, number>
  inHouseRequiredIncome: Record<number, number>
  pagibigMonthly: Record<number, number>
  pagibigRequiredIncome: Record<number, number>
  pagibigMaxMonthly: Record<number, number>
  pagibigMaxRequiredIncome: Record<number, number>
  remainingAmountMonthly: Record<number, number>
  remainingAmountRequiredIncome: Record<number, number>
  bankMonthly: Record<number, number>
  bankRequiredIncome: Record<number, number>
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
  const [unitImage, setUnitImage] = useState<string | null>(null)

  // Pre-fill from URL params
  useEffect(() => {
    const priceParam = searchParams.get("price")
    const unitParam = searchParams.get("unit")
    const optionParam = searchParams.get("option") as PropertyOption | null
    const agentParam = searchParams.get("agent")
    const unitImageParam = searchParams.get("unitImage")

    if (priceParam) {
      setPrice(priceParam)
    }
    if (unitParam) {
      setUnitName(unitParam)
      // Use provided image or find unit image
      if (unitImageParam) {
        setUnitImage(decodeURIComponent(unitImageParam))
      } else {
        const unitData = findUnitByDisplayName(unitParam)
        if (unitData) {
          setUnitImage(unitData.unit.imageUrl)
        }
      }
    }
    if (optionParam && propertyOptions.some((opt) => opt.value === optionParam)) {
      setPropertyOption(optionParam)
    }
    if (agentParam) {
      const loadAgent = async () => {
        const agent = await getAgentById(agentParam)
        if (agent) {
          setAgentName(agent.name)
        }
      }
      loadAgent()
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
    const option1RequiredIncome = option1 / 0.40

    // Option 2: DP in 2 years
    const year1Payable = priceValue * 0.1 - resFee
    const year2Payable = priceValue * 0.1
    const option2Year1 = year1Payable / 12
    const option2Year2Interest = year2Payable * year2InterestRate
    const option2Year2Waived = year2Payable / 12
    const option2Year2WithInterestRequiredIncome = option2Year2Interest / 0.40

    // In-House Financing
    const inHouseMonthly: Record<number, number> = {}
    const inHouseRequiredIncome: Record<number, number> = {}
    Object.entries(inHouseFactorRates).forEach(([years, rate]) => {
      const monthly = balance * rate
      inHouseMonthly[Number.parseInt(years)] = monthly
      inHouseRequiredIncome[Number.parseInt(years)] = monthly / 0.40
    })

    // Pag-IBIG Financing
    const pagibigMonthly: Record<number, number> = {}
    const pagibigRequiredIncome: Record<number, number> = {}
    Object.entries(pagibigFactorRates).forEach(([years, rate]) => {
      const monthly = balance * rate
      pagibigMonthly[Number.parseInt(years)] = monthly
      pagibigRequiredIncome[Number.parseInt(years)] = monthly / 0.40
    })

    // Pag-IBIG Max Loanable
    const pagibigMaxMonthly: Record<number, number> = {}
    const pagibigMaxRequiredIncome: Record<number, number> = {}
    if (maxLoan) {
      Object.entries(pagibigFactorRates).forEach(([years, rate]) => {
        const monthly = maxLoan * rate
        pagibigMaxMonthly[Number.parseInt(years)] = monthly
        pagibigMaxRequiredIncome[Number.parseInt(years)] = monthly / 0.40
      })
    }

    // Remaining Amount Payable to Developer
    const hasRemaining = maxLoan !== null && balance > maxLoan
    const remainingForDev = hasRemaining ? balance - maxLoan : 0
    const remainingAmountMonthly: Record<number, number> = {}
    const remainingAmountRequiredIncome: Record<number, number> = {}
    if (hasRemaining) {
      Object.entries(remainingAmountFactorRates).forEach(([years, rate]) => {
        const monthly = remainingForDev * rate
        remainingAmountMonthly[Number.parseInt(years)] = monthly
        remainingAmountRequiredIncome[Number.parseInt(years)] = monthly / 0.40
      })
    }

    // Bank Financing
    const bankMonthly: Record<number, number> = {}
    const bankRequiredIncome: Record<number, number> = {}
    Object.entries(bankFactorRates).forEach(([years, rate]) => {
      const monthly = balance * rate
      bankMonthly[Number.parseInt(years)] = monthly
      bankRequiredIncome[Number.parseInt(years)] = monthly / 0.40
    })

    setResults({
      price: priceValue,
      downPaymentPercent,
      downPaymentAmount: dpAmount,
      reservationFee: resFee,
      option1Monthly: option1,
      option1RequiredIncome,
      option2Year1Monthly: option2Year1,
      option2Year2WithInterest: option2Year2Interest,
      option2Year2Waived: option2Year2Waived,
      option2Year2WithInterestRequiredIncome,
      balanceAmount: balance,
      inHouseMonthly,
      inHouseRequiredIncome,
      pagibigMonthly,
      pagibigRequiredIncome,
      pagibigMaxMonthly,
      pagibigMaxRequiredIncome,
      remainingAmountMonthly,
      remainingAmountRequiredIncome,
      bankMonthly,
      bankRequiredIncome,
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

    const unitImageHtml = unitImage
      ? `<div class="two-column-layout">
          <div class="image-column">
            <img src="${unitImage}" alt="${unitName}" style="max-width: 300px; max-height: 225px; border-radius: 8px; border: 1px solid #e5e7eb;" />
            <p style="font-size: 10px; color: #6b7280; margin-top: 4px;">${unitName}</p>
          </div>
          <div class="summary-column">
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
          </div>
        </div>`
      : `<div class="section">
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
        </div>`

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Loan Computation - Aman Group of Companies</title>
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            padding: 10px; 
            color: #1a1a1a; 
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.2;
            font-size: 10px;
          }
          h1 { color: #166534; margin-bottom: 4px; font-size: 16px; }
          h2 { 
            color: #166534; 
            margin-top: 12px; 
            margin-bottom: 6px; 
            font-size: 12px; 
            border-bottom: 2px solid #166534;
            padding-bottom: 2px;
          }
          h3 { 
            color: #374151; 
            margin-top: 8px; 
            margin-bottom: 4px; 
            font-size: 11px;
            font-weight: 600;
          }
          .header { 
            margin-bottom: 12px; 
            border-bottom: 2px solid #166534; 
            padding-bottom: 8px; 
          }
          .header p { margin: 1px 0; color: #6b7280; font-size: 9px; }
          .section { margin-bottom: 8px; }
          .row { 
            display: flex; 
            justify-content: space-between; 
            padding: 3px 0; 
            border-bottom: 1px solid #e5e7eb; 
          }
          .row:last-child { border-bottom: none; }
          .label { color: #6b7280; font-size: 9px; }
          .value { font-weight: 600; text-align: right; font-size: 9px; }
          .highlight { 
            background: #f0fdf4; 
            padding: 6px; 
            border-radius: 4px; 
            margin: 6px 0;
            border: 1px solid #bbf7d0;
          }
          .highlight .row { border-bottom: none; padding: 2px 0; }
          .highlight .value { color: #166534; font-size: 11px; }
          .two-column { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-bottom: 8px; 
          }
          .column { 
            padding: 8px; 
            border: 1px solid #e5e7eb; 
            border-radius: 4px; 
            background: #f9fafb; 
          }
          .column h3 { 
            margin-top: 0; 
            margin-bottom: 6px; 
            font-size: 10px; 
            color: #166534; 
          }
          .two-column-layout { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-bottom: 15px; 
          }
          .image-column { 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
          }
          .summary-column { 
            display: flex; 
            flex-direction: column; 
          }
          @media print { 
            body { padding: 15px; font-size: 11px; } 
            .section { page-break-inside: avoid; }
            .page-break { page-break-before: always; }
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

        ${unitImageHtml}

        <div class="section">
          <h2>Down Payment Options</h2>
          <div class="two-column">
            <div class="column">
              <h3>Option 1: Monthly DP in 12 Months (0% Interest)</h3>
              <div class="row">
                <span class="label">Monthly Payment</span>
                <span class="value">${formatCurrency(results.option1Monthly)}</span>
              </div>
              <div class="row">
                <span class="label">Required Income</span>
                <span class="value">${formatCurrency(results.option1RequiredIncome)}</span>
              </div>
            </div>
            
            <div class="column">
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
                <span class="label">Required Income</span>
                <span class="value">${formatCurrency(results.option2Year2WithInterestRequiredIncome)}</span>
              </div>
              <div class="row">
                <span class="label">Year 2 (Waived Interest) - Monthly</span>
                <span class="value">${formatCurrency(results.option2Year2Waived)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Financing Options</h2>
          <div class="two-column">
            <div class="column">
              <h3>Monthly Amortization - In-House Bridge Financing (8.5% Interest)</h3>
              ${Object.entries(results.inHouseMonthly)
                .map(
                  ([years, amount]) => `
                <div class="row">
                  <span class="label">${years} Years  / Required Income</span>
                  <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.inHouseRequiredIncome[Number.parseInt(years)])}</span>
                </div>
              `,
                )
                .join("")}
            </div>

            <div class="column">
              <h3>Pag-IBIG Financing (6.25% Interest)</h3>
              ${Object.entries(results.pagibigMonthly)
                .map(
                  ([years, amount]) => `
                <div class="row">
                  <span class="label">${years} Years / Required Income</span>
                  <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.pagibigRequiredIncome[Number.parseInt(years)])}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="two-column">
            <div class="column">
              <h3>Pag-IBIG Max Loanable (${formatCurrency(results.pagibigMaxLoanAmount || 0)})</h3>
              ${results.hasRemainingAmount && results.pagibigMaxLoanAmount
                ? Object.entries(results.pagibigMaxMonthly)
                    .map(
                      ([years, amount]) => `
                    <div class="row">
                      <span class="label">${years} Years / Required Income</span>
                      <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.pagibigMaxRequiredIncome[Number.parseInt(years)])}</span>
                    </div>
                  `,
                    )
                    .join("")
                : "<div class='row'><span class='label'>No max loan calculation available</span></div>"}
            </div>

            <div class="column">
              <h3>Outstanding Balance to Developer (8.5% Interest)</h3>
              ${Object.entries(results.remainingAmountMonthly)
                .map(
                  ([years, amount]) => `
                <div class="row">
                  <span class="label">${years} Years / Required Income</span>
                  <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.remainingAmountRequiredIncome[Number.parseInt(years)])}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="two-column">
            <div class="column" style="grid-column: 1 / -1;">
              <h3>Bank Financing (7.5% Interest)</h3>
              ${Object.entries(results.bankMonthly)
                .map(
                  ([years, amount]) => `
                <div class="row">
                  <span class="label">${years} Years / Required Income</span>
                  <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.bankRequiredIncome[Number.parseInt(years)])}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="note">
          <p className="font-medium text-amber-800 mb-1 text-xs">Important Notes</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
              <li>
                This calculation is for estimation purposes only. Actual rates and terms may vary. Please consult with Aman Group of Companies for accurate computations.
              </li>
              <li>
                Additional charges such as reservation fees, processing fees, and documentary stamp taxes are not included in these calculations.
              </li>
              <li>
                The standard reservation fee is ₱25,000.00 and is non-refundable but deductible from the total contract price.
              </li>
              <li>
                Interest rates are subject to change without prior notice.</li>
              <li> 
                Please consult with our sales representatives for the most current rates and terms.
              </li>
            </ul>
        </div>
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  // Helper function to convert image URL to data URL
  const imageUrlToDataUrl = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Error converting image to data URL:', error)
      return ''
    }
  }

  const exportToImage = async (format: 'jpg' | 'png') => {
    if (!results) return

    const preparedForText =
      clientName && agentName
        ? `<p><strong>Prepared for:</strong> ${clientName}</p><p><strong>Prepared by:</strong> ${agentName}</p>`
        : clientName
          ? `<p><strong>Prepared for:</strong> ${clientName}</p>`
          : agentName
            ? `<p><strong>Prepared by:</strong> ${agentName}</p>`
            : ""

    // Convert image to data URL if available
    let unitImageDataUrl = ''
    if (unitImage) {
      unitImageDataUrl = await imageUrlToDataUrl(unitImage)
    }

    const unitImageHtml = unitImageDataUrl
      ? `<div class="two-column-layout">
          <div class="image-column">
            <img src="${unitImageDataUrl}" alt="${unitName}" style="max-width: 300px; max-height: 225px; border-radius: 8px; border: 1px solid #e5e7eb;" />
            <p style="font-size: 10px; color: #6b7280; margin-top: 4px;">${unitName}</p>
          </div>
          <div class="summary-column">
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
          </div>
        </div>`
      : `<div class="section">
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
        </div>`

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Loan Computation - Aman Group of Companies</title>
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            padding: 10px; 
            color: #1a1a1a; 
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.2;
            font-size: 10px;
            background: white;
          }
          h1 { color: #166534; margin-bottom: 4px; font-size: 16px; }
          h2 { 
            color: #166534; 
            margin-top: 12px; 
            margin-bottom: 6px; 
            font-size: 12px; 
            border-bottom: 2px solid #166534;
            padding-bottom: 8px;
          }
          h3 { 
            color: #374151; 
            margin-top: 8px; 
            margin-bottom: 4px; 
            font-size: 11px;
            font-weight: 600;
          }
          .header { 
            margin-bottom: 12px; 
            border-bottom: 2px solid #166534; 
            padding-bottom: 8px; 
          }
          .header p { margin: 1px 0; color: #6b7280; font-size: 9px; }
          .section { margin-bottom: 8px; }
          .row { 
            display: flex; 
            justify-content: space-between; 
            padding: 3px 0; 
            padding-bottom: 6px; 
            border-bottom: 1px solid #e5e7eb; 
          }
          .row:last-child { border-bottom: none; }
          .label { color: #6b7280; font-size: 9px; }
          .value { font-weight: 600; text-align: right; font-size: 9px; }
          .highlight { 
            background: #f0fdf4; 
            padding: 5px; 
            border-radius: 4px; 
            margin: 6px 0;
            border: 1px solid #bbf7d0;
          }
          .highlight .row { border-bottom: none; padding: 2px 0; }
          .highlight .value { color: #166534; font-size: 11px; }
          .two-column { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-bottom: 8px; 
          }
          .column { 
            padding: 8px; 
            border: 1px solid #e5e7eb; 
            border-radius: 4px; 
            background: #f9fafb; 
          }
          .column h3 { 
            margin-top: 0; 
            margin-bottom: 6px; 
            font-size: 10px; 
            color: #166534; 
          }
          .two-column-layout { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-bottom: 15px; 
          }
          .image-column { 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
          }
          .summary-column { 
            display: flex; 
            flex-direction: column; 
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

        ${unitImageHtml}

        <div class="section">
          <h2>Downpayment Options</h2>
          <div class="two-column">
            <div class="column">
              <h3>Option 1: Monthly DP in 12 Months (0% Interest)</h3>
              <div class="row">
                <span class="label">Monthly Payment</span>
                <span class="value">${formatCurrency(results.option1Monthly)}</span>
              </div>
              <div class="row">
                <span class="label">Required Income</span>
                <span class="value">${formatCurrency(results.option1RequiredIncome)}</span>
              </div>
            </div>
            
            <div class="column">
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
                <span class="label">Required Income</span>
                <span class="value">${formatCurrency(results.option2Year2WithInterestRequiredIncome)}</span>
              </div>
              <div class="row">
                <span class="label">Year 2 (Waived Interest) - Monthly</span>
                <span class="value">${formatCurrency(results.option2Year2Waived)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Financing Options</h2>
          <div class="two-column">
            <div class="column">
              <h3>Monthly Amortization - In-House Bridge Financing (8.5% Interest)</h3>
              ${Object.entries(results.inHouseMonthly)
                .map(
                  ([years, amount]) => `
                <div class="row">
                  <span class="label">${years} Years  / Required Income</span>
                  <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.inHouseRequiredIncome[Number.parseInt(years)])}</span>
                </div>
              `,
                )
                .join("")}
            </div>

            <div class="column">
              <h3>Pag-IBIG Financing (6.25% Interest)</h3>
              ${Object.entries(results.pagibigMonthly)
                .map(
                  ([years, amount]) => `
                <div class="row">
                  <span class="label">${years} Years / Required Income</span>
                  <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.pagibigRequiredIncome[Number.parseInt(years)])}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="two-column">
            <div class="column">
              <h3>Pag-IBIG Max Loanable (${formatCurrency(results.pagibigMaxLoanAmount || 0)})</h3>
              ${results.hasRemainingAmount && results.pagibigMaxLoanAmount
                ? Object.entries(results.pagibigMaxMonthly)
                    .map(
                      ([years, amount]) => `
                    <div class="row">
                      <span class="label">${years} Years / Required Income</span>
                      <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.pagibigMaxRequiredIncome[Number.parseInt(years)])}</span>
                    </div>
                  `,
                    )
                    .join("")
                : "<div class='row'><span class='label'>No max loan calculation available</span></div>"}
            </div>

            <div class="column">
              <h3>Outstanding Balance to Developer (8.5% Interest)</h3>
              ${Object.entries(results.remainingAmountMonthly)
                .map(
                  ([years, amount]) => `
                <div class="row">
                  <span class="label">${years} Years / Required Income</span>
                  <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.remainingAmountRequiredIncome[Number.parseInt(years)])}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="two-column">
            <div class="column" style="grid-column: 1 / -1;">
              <h3>Bank Financing (7.5% Interest)</h3>
              ${Object.entries(results.bankMonthly)
                .map(
                  ([years, amount]) => `
                <div class="row">
                  <span class="label">${years} Years / Required Income</span>
                  <span class="value">${formatCurrency(amount)} / ${formatCurrency(results.bankRequiredIncome[Number.parseInt(years)])}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="note">
          <p style="font-weight: 500; color: #92400e; margin-bottom: 4px;">Important Notes</p>
            <ul style="color: #6b7280; font-size: 12px; line-height: 1.25; list-style-type: disc; padding-left: 16px;">
              <li style="margin-bottom: 4px;">
                This calculation is for estimation purposes only. Actual rates and terms may vary. Please consult with Aman Group of Companies for accurate computations.
              </li>
              <li style="margin-bottom: 4px;">
                Additional charges such as reservation fees, processing fees, and documentary stamp taxes are not included in these calculations.
              </li>
              <li style="margin-bottom: 4px;">
                The standard reservation fee is ₱25,000.00 and is non-refundable but deductible from the total contract price.
              </li>
              <li style="margin-bottom: 4px;">
                Interest rates are subject to change without prior notice.</li>
              <li> 
                Please consult with our sales representatives for the most current rates and terms.
              </li>
            </ul>
        </div>
      </body>
      </html>
    `

    // Create an iframe to isolate the content
    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.left = '-9999px'
    iframe.style.top = '-9999px'
    iframe.style.width = '800px'
    iframe.style.height = '2500px'
    iframe.style.border = 'none'
    document.body.appendChild(iframe)

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!iframeDoc) return

    iframeDoc.open()
    iframeDoc.write(htmlContent)
    iframeDoc.close()

    // Wait for the iframe to load
    await new Promise(resolve => {
      iframe.onload = resolve
      if (iframeDoc.readyState === 'complete') resolve(undefined)
    })

    try {
      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: iframeDoc.body.scrollHeight
      })

      // Create download link
      const link = document.createElement('a')
      link.download = `loan-computation.${format}`
      link.href = canvas.toDataURL(`image/${format}`)
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      document.body.removeChild(iframe)
    }
  }

  const exportToJPG = () => exportToImage('jpg')
  const exportToPNG = () => exportToImage('png')

  return (
    <div className="space-y-3 max-w-5xl mx-auto">
      {/* Calculator Form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-4 w-4" />
            Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {unitName && (
            <div className="p-2 bg-secondary rounded-md">
              <p className="text-xs text-muted-foreground">Calculating for:</p>
              <p className="font-semibold text-primary text-sm">{unitName}</p>
            </div>
          )}

          {agentName && (
            <div className="p-2 bg-primary/10 rounded-md flex items-center gap-2">
              <User className="h-3 w-3 text-primary" />
              <span className="text-xs">
                Agent: <strong>{agentName}</strong>
              </span>
            </div>
          )}

          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="client-name" className="text-sm">Client Name (Optional)</Label>
              <Input
                id="client-name"
                placeholder="Enter client name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="h-8"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="price" className="text-sm">Total Contract Price (PHP)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-8"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="property-option" className="text-sm">Property Option</Label>
              <Select value={propertyOption} onValueChange={(value: PropertyOption) => setPropertyOption(value)}>
                <SelectTrigger className="w-full h-8" id="property-option">
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

            <div className="space-y-1">
              <Label htmlFor="downpayment" className="text-sm">Down Payment</Label>
              <Select
                value={downPaymentPercent.toString()}
                onValueChange={(value) => setDownPaymentPercent(Number.parseInt(value))}
              >
                <SelectTrigger className="w-full h-8" id="downpayment">
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

          <div className="flex justify-center">
            <Button onClick={calculateLoan} className="w-full md:w-auto" size="sm">
              <Calculator className="h-3 w-3 mr-1" />
              Calculate Loan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div ref={resultsRef} id="loan-results" className="space-y-3">
          {/* Unit Image */}
          {unitImage && (
            <Card>
              <CardContent className="p-4">
                <div className="aspect-[4/3] max-w-md mx-auto overflow-hidden rounded-lg border">
                  <Image
                    src={unitImage}
                    alt={unitName}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">{unitName}</p>
              </CardContent>
            </Card>
          )}

          {/* Summary Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-2">
              <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Contract Price</p>
                  <p className="text-sm font-bold text-primary">{formatCurrency(results.price)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">{results.downPaymentPercent}% Down Payment</p>
                  <p className="text-sm font-bold">{formatCurrency(results.downPaymentAmount)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Reservation Fee</p>
                  <p className="text-sm font-bold">{formatCurrency(results.reservationFee)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Balance Amount</p>
                  <p className="text-sm font-bold text-primary">{formatCurrency(results.balanceAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {/* Down Payment Options */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Banknote className="h-4 w-4" />
                  Down Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2 text-sm">Option 1: Monthly DP in 12 Months (0% Interest)</h4>
                  <div className="border rounded-md p-2 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Monthly Payment</p>
                        <p className="text-sm font-bold text-primary">{formatCurrency(results.option1Monthly)}</p>
                      </div>
                      <Separator orientation="vertical" className="h-8 mx-2" />
                      <div>
                        <p className="text-xs text-muted-foreground">Required Income</p>
                        <p className="text-sm font-bold text-primary">{formatCurrency(results.option1RequiredIncome)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Option 2: Down Payment (2 Years to Pay)</h4>
                  <div className="space-y-2">
                    <div className="border rounded-md p-2 bg-gray-50">
                      <p className="text-xs text-muted-foreground mb-1">Year 1 (0% Interest)</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly Payment</p>
                          <p className="text-sm font-bold">{formatCurrency(results.option2Year1Monthly)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-md p-2 bg-gray-50">
                      <p className="text-xs text-muted-foreground mb-1">Year 2 (8.5% Interest)</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly Payment</p>
                          <p className="text-sm font-bold">{formatCurrency(results.option2Year2WithInterest)}</p>
                        </div>
                        <Separator orientation="vertical" className="h-8 mx-2" />
                        <div>
                          <p className="text-xs text-muted-foreground">Required Income</p>
                          <p className="text-sm font-bold text-primary">{formatCurrency(results.option2Year2WithInterestRequiredIncome)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-md p-2 bg-gray-50">
                      <p className="text-xs text-muted-foreground mb-1">Year 2 (Waived Interest)</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly Payment</p>
                          <p className="text-sm font-bold">{formatCurrency(results.option2Year2Waived)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* In-House Financing */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building className="h-4 w-4" />
                  Monthly Amortization - In-House Bridge Financing (8.5% Interest)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(results.inHouseMonthly).map(([years, amount]) => (
                    <div key={years} className="p-2 bg-secondary rounded-md border">
                      <div className="text-xs text-muted-foreground mb-1">{years} Years</div>
                      <div className="text-sm font-bold mb-1 border-b border-gray-300 pb-1">{formatCurrency(amount)}</div>
                      <div className="text-xs text-muted-foreground">Required Income</div>
                      <div className="text-sm font-bold text-primary">{formatCurrency(results.inHouseRequiredIncome[Number.parseInt(years)])}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pag-IBIG Financing */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Landmark className="h-4 w-4" />
                  Pag-IBIG Financing (6.25% Interest)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(results.pagibigMonthly).map(([years, amount]) => (
                    <div key={years} className="p-2 bg-secondary rounded-md border">
                      <div className="text-xs text-muted-foreground mb-1">{years} Years</div>
                      <div className="text-sm font-bold mb-1 border-b border-gray-300 pb-1">{formatCurrency(amount)}</div>
                      <div className="text-xs text-muted-foreground">Required Income</div>
                      <div className="text-sm font-bold text-primary">{formatCurrency(results.pagibigRequiredIncome[Number.parseInt(years)])}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {results.hasRemainingAmount && results.pagibigMaxLoanAmount && (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Landmark className="h-4 w-4" />
                      Pag-IBIG Max Loanable ({formatCurrency(results.pagibigMaxLoanAmount)})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(results.pagibigMaxMonthly).map(([years, amount]) => (
                        <div key={years} className="p-2 bg-secondary rounded-md border">
                          <div className="text-xs text-muted-foreground mb-1">{years} Years</div>
                          <div className="text-sm font-bold mb-1 border-b border-gray-300 pb-1">{formatCurrency(amount)}</div>
                          <div className="text-xs text-muted-foreground">Required Income</div>
                          <div className="text-sm font-bold text-primary">{formatCurrency(results.pagibigMaxRequiredIncome[Number.parseInt(years)])}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Home className="h-4 w-4" />
                      Outstanding Balance to Developer (8.5% Interest)
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Amount: {formatCurrency(results.remainingForDeveloper)}
                    </p>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(results.remainingAmountMonthly).map(([years, amount]) => (
                        <div key={years} className="p-2 bg-secondary rounded-md">
                          <div className="text-xs text-muted-foreground">{years} Year{Number.parseInt(years) > 1 ? "s" : ""} to Pay</div>
                          <div className="text-sm font-bold">{formatCurrency(amount)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Bank Financing */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Banknote className="h-4 w-4" />
                  Bank Financing (7.5% Interest)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(results.bankMonthly).map(([years, amount]) => (
                    <div key={years} className="p-2 bg-secondary rounded-md border">
                      <div className="text-xs text-muted-foreground mb-1">{years} Years</div>
                      <div className="text-sm font-bold mb-1 border-b border-gray-300 pb-1">{formatCurrency(amount)}</div>
                      <div className="text-xs text-muted-foreground">Required Income</div>
                      <div className="text-sm font-bold text-primary">{formatCurrency(results.bankRequiredIncome[Number.parseInt(years)])}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Buttons */}
          <div className="flex justify-center gap-2 pt-2">
            <Button onClick={exportToPDF} variant="outline" size="sm" className="gap-1">
              <Download className="h-3 w-3" />
              Export to PDF
            </Button>
            <Button onClick={exportToJPG} variant="outline" size="sm" className="gap-1">
              <Download className="h-3 w-3" />
              Export to JPG
            </Button>
            <Button onClick={exportToPNG} variant="outline" size="sm" className="gap-1">
              <Download className="h-3 w-3" />
              Export to PNG
            </Button>
          </div>

          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-3">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 mb-1 text-sm">Important Notes</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5 list-disc pl-3">
                    <li>This calculation is for estimation purposes only. Actual rates and terms may vary. Please consult with Aman Group of Companies for accurate computations.</li>
                    <li>Additional charges such as reservation fees, processing fees, and documentary stamp taxes are not included in these calculations.</li>
                    <li>The standard reservation fee is ₱25,000.00 and is non-refundable but deductible from the total contract price.</li>
                    <li>Interest rates are subject to change without prior notice.</li>
                    <li>Please consult with our sales representatives for the most current rates and terms.</li>
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
