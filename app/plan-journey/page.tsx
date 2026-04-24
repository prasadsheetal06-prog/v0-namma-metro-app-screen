"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowUpDown } from "lucide-react"

export default function PlanJourney() {
  const router = useRouter()
  const [showResults, setShowResults] = useState(false)
  const [showInputCard, setShowInputCard] = useState(true)
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const handlePlanJourney = () => {
    setShowInputCard(false)
    setTimeout(() => {
      setShowResults(true)
    }, 200)
  }

  const handleBack = () => {
    if (showResults) {
      setShowResults(false)
      setTimeout(() => {
        setShowInputCard(true)
      }, 100)
    } else {
      router.push("/")
    }
  }

  const handleSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const CoachDiagram = () => (
    <div className="space-y-2">
      <div className="flex w-full">
        {[
          { num: 1, color: "#DC2626", dots: 4, rounded: "rounded-l-lg" },
          { num: 2, color: "#F59E0B", dots: 3, rounded: "" },
          { num: 3, color: "#16A34A", dots: 1, rounded: "" },
          { num: 4, color: "#16A34A", dots: 1, rounded: "" },
          { num: 5, color: "#F59E0B", dots: 2, rounded: "" },
          { num: 6, color: "#DC2626", dots: 3, rounded: "rounded-r-lg" },
        ].map((coach) => (
          <div key={coach.num} className="flex-1 flex flex-col items-center">
            <div
              className={`w-full h-8 flex items-center justify-center text-white font-bold text-sm ${coach.rounded}`}
              style={{ backgroundColor: coach.color }}
            >
              {coach.num}
            </div>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: coach.dots }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: coach.color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500">← Direction of travel</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#16A34A]"></div>
            <span className="text-[10px] text-gray-500">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
            <span className="text-[10px] text-gray-500">Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#DC2626]"></div>
            <span className="text-[10px] text-gray-500">High</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F0EDF5] flex items-center justify-center p-4 transition-all duration-[250ms] ease-out">
      <div className="w-full max-w-[390px] bg-[#F0EDF5] min-h-[700px] flex flex-col rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <header className="bg-[#6B21A8] px-4 py-4 flex items-center gap-3">
          <button onClick={handleBack} className="text-white">
            <ArrowLeft className="w-6 h-6" strokeWidth={2} />
          </button>
          <h1 className="text-white font-semibold text-lg">Plan Journey</h1>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-[128px]">
          {/* Input Card */}
          <div 
            className={`m-4 bg-white rounded-[16px] p-4 transition-all duration-[250ms] ease-out ${
              showInputCard ? "opacity-100" : "opacity-0 hidden"
            }`}
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
          >
            <div className="relative">
              <div className="space-y-1">
                <label className="text-xs text-gray-500">From</label>
                <input
                  type="text"
                  placeholder="Your location"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full text-sm py-2 outline-none placeholder:text-gray-400 border-b border-transparent focus:border-[#6B21A8] transition-colors"
                />
              </div>
              
              {/* Swap Button */}
              <button 
                onClick={handleSwap}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#F3E8FF] rounded-full flex items-center justify-center"
              >
                <ArrowUpDown className="w-4 h-4 text-[#6B21A8]" />
              </button>
              
              <div className="space-y-1 pt-2">
                <label className="text-xs text-gray-500">To</label>
                <input
                  type="text"
                  placeholder="Destination"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full text-sm py-2 outline-none placeholder:text-gray-400 border-b border-transparent focus:border-[#6B21A8] transition-colors"
                />
              </div>
            </div>
            <div className="pt-3">
              <button
                onClick={handlePlanJourney}
                onMouseDown={() => setIsButtonPressed(true)}
                onMouseUp={() => setIsButtonPressed(false)}
                onMouseLeave={() => setIsButtonPressed(false)}
                className="w-full bg-[#6B21A8] text-white font-medium py-3 rounded-xl transition-transform duration-100"
                style={{ transform: isButtonPressed ? "scale(0.98)" : "scale(1)" }}
              >
                Plan My Journey →
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              e.g. Koramangala → Orion Mall
            </p>
          </div>

          {/* Results Section */}
          {showResults && (
            <>
              {/* Stepper Bar */}
              <div 
                className="mx-4 mb-3 bg-white rounded-[16px] p-3 animate-fade-in-up"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0s" }}
              >
                <div className="flex items-center justify-between px-2">
                  {["Walk", "Metro", "Change", "Exit", "Ride"].map((label, index) => (
                    <div key={label} className="flex flex-col items-center relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#6B21A8]"></div>
                      <span className="text-[9px] text-gray-500 mt-1">{label}</span>
                      {index < 4 && (
                        <div className="absolute top-[5px] left-[14px] w-[calc(100%+20px)] h-[2px] bg-[#6B21A8]"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 1 - Walk to Station */}
              <div 
                className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.1s" }}
              >
                <div className="w-1 bg-[#6B21A8] self-stretch"></div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚶</span>
                      <span className="font-bold text-sm">Walk to Station</span>
                    </div>
                    <span className="text-xs bg-[#F3E8FF] text-[#6B21A8] px-2 py-1 rounded-full">
                      5 min
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    Bommanahalli Station · Gate 2, North entrance
                  </p>
                  <p className="text-xs text-gray-500">400m · approx 5 min walk</p>
                </div>
              </div>

              {/* Card 2 - Board Metro */}
              <div 
                className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.2s" }}
              >
                <div className="w-1 bg-[#6B21A8] self-stretch"></div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚇</span>
                      <span className="font-bold text-sm">Board Metro</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      Platform 2
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    Purple Line → towards Mysore Road
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Board MIDDLE coaches — Coach 3 or 4
                  </p>
                  <CoachDiagram />
                </div>
              </div>

              {/* Card 3 - Peak Hour Alert */}
              <div 
                className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.3s" }}
              >
                <div className="w-1 bg-[#F59E0B] self-stretch"></div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      <span className="font-bold text-sm">Peak Hour Alert</span>
                    </div>
                    <span className="text-xs bg-[#FEF3C7] text-[#D97706] px-2 py-1 rounded-full">
                      8:45 AM
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    Avoid Coach 1 — high crowd near entry gate
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Best boarding: Coach 3 or 4
                  </p>
                  <CoachDiagram />
                </div>
              </div>

              {/* Card 4 - Exit Recommendation */}
              <div 
                className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.4s" }}
              >
                <div className="w-1 bg-[#16A34A] self-stretch"></div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚪</span>
                      <span className="font-bold text-sm">Exit Recommendation</span>
                    </div>
                    <span className="text-xs bg-[#DCFCE7] text-[#16A34A] px-2 py-1 rounded-full">
                      Saves 5 min
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    Alight at Mantri Square · Use Exit 3, West Side
                  </p>
                  <p className="text-xs text-gray-500">
                    200m to destination · Exit 1 adds 700m extra
                  </p>
                </div>
              </div>

              {/* Card 5 - Last Mile Options */}
              <div 
                className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.5s" }}
              >
                <div className="w-1 bg-[#0EA5E9] self-stretch"></div>
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🛵</span>
                    <span className="font-bold text-sm">Last Mile Options</span>
                  </div>

                  {/* Row 1 - Rapido */}
                  <div className="flex items-center justify-between py-2 px-2 rounded-lg bg-[#F0FDF4]">
                    <div className="flex items-center gap-2">
                      <span>🛵</span>
                      <span className="text-sm">Rapido Bike</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">4 min</span>
                      <span className="text-sm font-bold">₹38</span>
                      <span className="text-[10px] bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded-full">
                        Cheapest
                      </span>
                      <button className="text-xs bg-[#6B21A8] text-white px-3 py-1 rounded-full">
                        Book →
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-1"></div>

                  {/* Row 2 - Ola Auto */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span>🚗</span>
                      <span className="text-sm">Ola Auto</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">6 min</span>
                      <span className="text-sm font-bold">₹65</span>
                      <button className="text-xs border border-[#6B21A8] text-[#6B21A8] px-3 py-1 rounded-full">
                        Book →
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-100"></div>

                  {/* Row 3 - Walk */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span>🚶</span>
                      <span className="text-sm">Walk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">12 min</span>
                      <span className="text-sm font-bold text-[#16A34A]">Free</span>
                      <span className="text-[10px] bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded-full">
                        Eco
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Fixed Bottom Bar */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-[#6B21A8] transition-all duration-300 ${
            showResults ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          {/* White top divider */}
          <div className="h-px bg-white/30"></div>
          
          {/* Stat Bar */}
          <div className="flex h-14">
            {/* Time Section */}
            <div className="flex-1 flex flex-col items-center justify-center border-r border-white/20">
              <span className="text-[10px] text-gray-200">Duration</span>
              <span className="text-white font-bold text-sm">28 min</span>
            </div>
            
            {/* Cost Section */}
            <div className="flex-1 flex flex-col items-center justify-center border-r border-white/20">
              <span className="text-[10px] text-gray-200">Cost</span>
              <span className="text-white font-bold text-sm">₹38–65</span>
            </div>
            
            {/* Savings Section */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-[10px] text-gray-200">vs Direct Ola</span>
              <span className="text-white font-bold text-sm">Save ₹172</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
