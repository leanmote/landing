"use client"

import { useState, useMemo } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export function ROICalculator() {
  const [engineers, setEngineers] = useState(25)
  const [avgSalary, setAvgSalary] = useState(120000)
  const [investmentPrioritization, setInvestmentPrioritization] = useState(10)
  const [throughputIncrease, setThroughputIncrease] = useState(8)
  const [managerHoursSaved, setManagerHoursSaved] = useState(10)

  const calculations = useMemo(() => {
    const investmentSavings = (engineers * avgSalary * investmentPrioritization) / 100
    const throughputSavings = (engineers * avgSalary * throughputIncrease) / 100
    const managerHourlyRate = avgSalary / 2080 // 40hrs * 52 weeks
    const reportingSavings = managerHoursSaved * 12 * managerHourlyRate * Math.ceil(engineers / 8)
    
    const totalSavings = investmentSavings + throughputSavings + reportingSavings
    
    // Estimated Leanmote cost based on team size
    let annualCost = 0
    if (engineers <= 20) {
      annualCost = engineers * 35 * 12
    } else if (engineers <= 100) {
      annualCost = engineers * 30 * 12
    } else {
      annualCost = engineers * 25 * 12
    }
    
    const roi = annualCost > 0 ? totalSavings / annualCost : 0

    return {
      investmentSavings,
      throughputSavings,
      reportingSavings,
      totalSavings,
      annualCost,
      roi
    }
  }, [engineers, avgSalary, investmentPrioritization, throughputIncrease, managerHoursSaved])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-6">Your Company Details</h3>
          <div className="space-y-6">
            {/* Number of Engineers */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Number of Engineers</label>
                <Input
                  type="number"
                  value={engineers}
                  onChange={(e) => setEngineers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-8 text-center bg-muted border-border text-foreground"
                />
              </div>
              <Slider
                value={[engineers]}
                onValueChange={([value]) => setEngineers(value)}
                min={5}
                max={500}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5</span>
                <span>500+</span>
              </div>
            </div>

            {/* Average Salary */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Average Annual Engineer Salary ($)</label>
                <Input
                  type="number"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-28 h-8 text-center bg-muted border-border text-foreground"
                />
              </div>
              <Slider
                value={[avgSalary]}
                onValueChange={([value]) => setAvgSalary(value)}
                min={50000}
                max={300000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$50k</span>
                <span>$300k</span>
              </div>
            </div>

            {/* Investment Prioritization */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Improved Investment Prioritization</label>
                <span className="text-sm font-semibold text-accent">{investmentPrioritization}%</span>
              </div>
              <Slider
                value={[investmentPrioritization]}
                onValueChange={([value]) => setInvestmentPrioritization(value)}
                min={0}
                max={30}
                step={1}
                className="w-full"
              />
            </div>

            {/* Throughput Increase */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Increased Engineering Throughput</label>
                <span className="text-sm font-semibold text-accent">{throughputIncrease}%</span>
              </div>
              <Slider
                value={[throughputIncrease]}
                onValueChange={([value]) => setThroughputIncrease(value)}
                min={0}
                max={25}
                step={1}
                className="w-full"
              />
            </div>

            {/* Manager Hours Saved */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Reduced Manager Reporting Time</label>
                <span className="text-sm font-semibold text-accent">{managerHoursSaved} hrs/month</span>
              </div>
              <Slider
                value={[managerHoursSaved]}
                onValueChange={([value]) => setManagerHoursSaved(value)}
                min={0}
                max={40}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gradient-to-br from-navy-light to-navy p-8 rounded-2xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Your ROI Analysis</h3>
        
        {/* Main ROI Display */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <p className="text-sm text-gray-400 mb-1">Total Estimated Annual Savings</p>
            <p className="text-3xl font-bold text-accent">{formatCurrency(calculations.totalSavings)}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <p className="text-sm text-gray-400 mb-1">Potential ROI</p>
            <p className="text-3xl font-bold text-white">{calculations.roi.toFixed(1)}x</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-400">Savings from Investment Prioritization</span>
            <span className="font-semibold text-white">{formatCurrency(calculations.investmentSavings)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-400">Increased Throughput Savings</span>
            <span className="font-semibold text-white">{formatCurrency(calculations.throughputSavings)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-400">Reporting Overhead Savings</span>
            <span className="font-semibold text-white">{formatCurrency(calculations.reportingSavings)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-400">Annual Leanmote Investment</span>
            <span className="font-semibold text-accent">{formatCurrency(calculations.annualCost)}</span>
          </div>
          <p className="text-xs text-gray-500">(Calculated based on team size)</p>
        </div>

        {/* CTA */}
        <a 
          href="https://be.leanmote.com/book-a-demo-0"
          className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-navy font-semibold py-3 px-6 rounded-lg transition-all"
        >
          See Your Savings in Action
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
