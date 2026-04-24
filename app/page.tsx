"use client"

import { useState, useEffect, useRef } from "react"
import {
  User,
  Globe,
  IndianRupee,
  Wallet,
  QrCode,
  CreditCard,
  Clock,
  Map,
  Info,
  Headphones,
  Route,
  Ticket,
  History,
  ArrowLeft,
  ArrowUpDown,
} from "lucide-react"

export default function NammaMetro() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "plan-journey">("home")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("Feature available in current app")
  const [showResults, setShowResults] = useState(false)
  const [showInputCard, setShowInputCard] = useState(true)
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Step mapping: Walk(0), Metro1(1), Change(2), Metro2(3), Exit(4), Ride(5)
  // Cards map 1:1 to steps now
  const cardToStepMap = [0, 1, 2, 3, 4, 5]

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || !showResults) return

    const handleScroll = () => {
      const containerTop = container.scrollTop + 100
      let newActiveStep = 0

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardTop = card.offsetTop - container.offsetTop
          if (containerTop >= cardTop) {
            newActiveStep = cardToStepMap[index]
          }
        }
      })

      setActiveStep(newActiveStep)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [showResults])

  const handleTileClick = (isNew: boolean | undefined) => {
    if (isNew) {
      setCurrentScreen("plan-journey")
    } else {
      showToastMessage("Feature available in current app")
    }
  }

  const handlePlanJourney = () => {
    setShowInputCard(false)
    setTimeout(() => {
      setShowResults(true)
    }, 200)
  }

  const handleBack = () => {
    if (showResults) {
      setShowResults(false)
      setActiveStep(0)
      setTimeout(() => {
        setShowInputCard(true)
      }, 100)
    } else {
      setCurrentScreen("home")
    }
  }

  const handleSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleOpenMaps = (message: string) => {
    showToastMessage(message)
  }
  
  const tiles = [
    { icon: Wallet, label: "Top Up" },
    { icon: QrCode, label: "QR Tickets" },
    { icon: CreditCard, label: "QR Pass" },
    { icon: Clock, label: "Time Table" },
    { icon: Map, label: "Map" },
    { icon: Info, label: "Fare Info" },
    { icon: Headphones, label: "Support" },
    { icon: History, label: "My Trips" },
    { icon: Route, label: "Plan Journey", isNew: true },
  ]

  const StepNumber = ({ number }: { number: number }) => (
    <div className="w-6 h-6 rounded-full bg-[#6B21A8] flex items-center justify-center flex-shrink-0">
      <span className="text-white text-xs font-bold">{number}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F0EDF5] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] bg-[#F0EDF5] min-h-[700px] flex flex-col rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* HOME SCREEN */}
        <div 
          className={`absolute inset-0 flex flex-col transition-opacity duration-200 ease-out ${
            currentScreen === "home" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Header */}
          <header className="bg-[#6B21A8] px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-[#6B21A8] font-semibold text-lg">U</span>
              </div>
              <span className="text-white font-medium text-lg">User</span>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="w-6 h-6 text-white" strokeWidth={1.5} />
              <IndianRupee className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 px-4 pb-24 bg-[#F0EDF5]">
            <h2 className="text-gray-700 font-semibold text-lg py-4">Travel</h2>
            <div className="grid grid-cols-3 gap-3">
              {tiles.map((tile, index) => (
                <div
                  key={index}
                  onClick={() => handleTileClick(tile.isNew)}
                  className={`
                    aspect-square rounded-[16px] flex flex-col items-center justify-center gap-2 relative cursor-pointer transition-all duration-[250ms] ease-out
                    ${tile.isNew ? "border-2 border-[#E9D5FF]" : ""}
                  `}
                  style={{
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                    background: tile.isNew 
                      ? "linear-gradient(to bottom, #FAFAFF, #F3E8FF)" 
                      : "#FFFFFF"
                  }}
                >
                  {tile.isNew && (
                    <div className="absolute -top-1 -right-1 bg-[#6B21A8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </div>
                  )}
                  {tile.icon && (
                    <>
                      <tile.icon
                        className="w-8 h-8 text-[#6B21A8]"
                        strokeWidth={1.5}
                      />
                      <span
                        className={`text-xs font-medium text-center px-1 ${
                          tile.isNew ? "text-[#6B21A8] font-bold" : "text-gray-700"
                        }`}
                      >
                        {tile.label}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </main>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 pointer-events-none">
            <div className="w-full max-w-[358px] bg-[#3B0764] rounded-full px-6 py-4 flex items-center justify-between pointer-events-auto">
              <button className="flex items-center gap-2 text-white">
                <Ticket className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">Active Tickets/Passes</span>
              </button>
              <button className="flex items-center gap-2 text-white">
                <QrCode className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">Purchase</span>
              </button>
            </div>
          </div>
        </div>

        {/* PLAN JOURNEY SCREEN */}
        <div 
          className={`absolute inset-0 flex flex-col transition-opacity duration-200 ease-out ${
            currentScreen === "plan-journey" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Header */}
          <header className="bg-[#6B21A8] px-4 py-4 flex items-center gap-3">
            <button onClick={handleBack} className="text-white">
              <ArrowLeft className="w-6 h-6" strokeWidth={2} />
            </button>
            <h1 className="text-white font-semibold text-lg">Plan Journey</h1>
          </header>

          {/* Scrollable Content */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pb-20 bg-[#F0EDF5]">
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
                  Plan My Journey
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                e.g. Koramangala to Orion Mall
              </p>
            </div>

            {/* Results Section */}
            {showResults && (
              <>
                {/* Stepper Bar - 6 dots */}
                <div 
                  className="mx-4 mb-3 bg-white rounded-[16px] p-3 animate-fade-in-up"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0s" }}
                >
                  <div className="flex items-center justify-between px-1">
                    {["Walk", "Metro 1", "Change", "Metro 2", "Exit", "Ride"].map((label, index) => {
                      const isActive = index <= activeStep
                      return (
                        <div key={label} className="flex flex-col items-center relative">
                          <div 
                            className={`rounded-full transition-all duration-200 ${
                              isActive 
                                ? "w-3 h-3 bg-[#6B21A8]" 
                                : "w-2 h-2 border-2 border-gray-300 bg-white"
                            }`}
                          ></div>
                          <span className={`text-[9px] mt-1 whitespace-nowrap ${isActive ? "text-[#6B21A8] font-medium" : "text-gray-400"}`}>
                            {label}
                          </span>
                          {index < 5 && (
                            <div 
                              className={`absolute top-[6px] left-[14px] w-[calc(100%+8px)] h-[2px] ${
                                index < activeStep ? "bg-[#6B21A8]" : "bg-gray-200"
                              }`}
                            ></div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Card 1 - Walk to Station */}
                <div 
                  ref={(el) => { cardRefs.current[0] = el }}
                  className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.1s" }}
                >
                  <div className="w-1 bg-[#6B21A8] self-stretch"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StepNumber number={1} />
                        <span className="text-lg">🚶</span>
                        <span className="font-bold text-sm">Walk to Station</span>
                      </div>
                      <span className="text-xs bg-[#F3E8FF] text-[#6B21A8] px-2 py-1 rounded-full">
                        5 min
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      Head to Gate 2 — look for the Namma Metro purple sign. It is 400m away, about a 5 minute walk straight ahead from your location.
                    </p>
                    <button 
                      onClick={() => handleOpenMaps("Opening Google Maps for Gate 2 directions...")}
                      className="w-full py-2 border border-[#6B21A8] text-[#6B21A8] rounded-xl text-sm font-medium bg-white"
                    >
                      📍 Open walking route in Google Maps
                    </button>
                  </div>
                </div>

                {/* Card 2 - Board Metro (Purple Line) */}
                <div 
                  ref={(el) => { cardRefs.current[1] = el }}
                  className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.2s" }}
                >
                  <div className="w-1 bg-[#6B21A8] self-stretch"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StepNumber number={2} />
                        <span className="text-lg">🚇</span>
                        <span className="font-bold text-sm">Board Metro</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Platform 2
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      Get on the Purple Line train going towards Mysore Road. Board from the middle of the platform for easier access.
                    </p>
                    {/* Train Timing Box */}
                    <div className="bg-white border-l-4 border-[#6B21A8] rounded-lg p-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                      <p className="text-[#6B21A8] font-bold text-base">🕐 Next train: 3 min</p>
                      <p className="text-gray-500 text-xs mt-1">Then every 6 min after that</p>
                      <p className="text-[#D97706] text-[11px] italic mt-1">Tip: Trains from Whitefield are less crowded at peak hour</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Interchange at Silk Board */}
                <div 
                  ref={(el) => { cardRefs.current[2] = el }}
                  className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.3s" }}
                >
                  <div className="w-1 bg-[#7C3AED] self-stretch"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StepNumber number={3} />
                        <span className="text-lg">🔄</span>
                        <span className="font-bold text-sm">Interchange at Silk Board</span>
                      </div>
                      <span className="text-xs bg-[#F3E8FF] text-[#7C3AED] px-2 py-1 rounded-full">
                        3 min
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      When you get off at Silk Board, follow the YELLOW signs on the ceiling. Walk straight for about 3 minutes to reach Platform 1 downstairs.
                    </p>
                    <button 
                      onClick={() => handleOpenMaps("Opening station map for Silk Board interchange...")}
                      className="w-full py-2 border border-[#6B21A8] text-[#6B21A8] rounded-xl text-sm font-medium bg-white"
                    >
                      📍 Show me the way to Platform 1
                    </button>
                  </div>
                </div>

                {/* Card 4 - Board Yellow Line */}
                <div 
                  ref={(el) => { cardRefs.current[3] = el }}
                  className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.4s" }}
                >
                  <div className="w-1 bg-[#6B21A8] self-stretch"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StepNumber number={4} />
                        <span className="text-lg">🚇</span>
                        <span className="font-bold text-sm">Board Yellow Line</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Platform 1
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      Board the Yellow Line — it is the yellow colored train. Stay on for 4 stops and get off when you hear Mantri Square announced.
                    </p>
                    <p className="text-xs text-gray-500">
                      Next train: 3 min · Then every 8 min
                    </p>
                  </div>
                </div>

                {/* Card 5 - Exit Recommendation */}
                <div 
                  ref={(el) => { cardRefs.current[4] = el }}
                  className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.5s" }}
                >
                  <div className="w-1 bg-[#16A34A] self-stretch"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StepNumber number={5} />
                        <span className="text-lg">🚪</span>
                        <span className="font-bold text-sm">Exit Recommendation</span>
                      </div>
                      <span className="text-xs bg-[#DCFCE7] text-[#16A34A] px-2 py-1 rounded-full">
                        Saves 5 min
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      When you get off the train, walk towards Exit 3 — look for the exit sign with the Orion Mall logo. It is the closest exit to your destination and saves you 5 minutes of extra walking.
                    </p>
                  </div>
                </div>

                {/* Card 6 - Last Mile Options */}
                <div 
                  ref={(el) => { cardRefs.current[5] = el }}
                  className="mx-4 mb-3 bg-white rounded-[16px] overflow-hidden flex animate-fade-in-up"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", animationDelay: "0.6s" }}
                >
                  <div className="w-1 bg-[#0EA5E9] self-stretch"></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <StepNumber number={6} />
                      <span className="text-lg">🛵</span>
                      <span className="font-bold text-sm">Last Mile Options</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      You have reached the station. Here are your options to get to Orion Mall.
                    </p>

                    {/* Row 1 - Namma Yatri Bike */}
                    <div className="flex items-center justify-between py-2 px-2 rounded-lg bg-[#F0FDF4]">
                      <div className="flex items-center gap-2">
                        <span>🛵</span>
                        <span className="text-sm">Namma Yatri Bike</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">4 min</span>
                        <span className="text-sm font-bold">₹35</span>
                        <span className="text-[10px] bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded-full">
                          Cheapest
                        </span>
                        <button className="text-xs bg-[#F97316] text-white px-3 py-1 rounded-full">
                          Book →
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Row 2 - Namma Yatri Auto */}
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <span>🚗</span>
                        <span className="text-sm">Namma Yatri Auto</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">7 min</span>
                        <span className="text-sm font-bold">₹58</span>
                        <button className="text-xs border border-[#F97316] text-[#F97316] px-3 py-1 rounded-full">
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

                    <p className="text-[11px] text-gray-400 mt-2">
                      Namma Yatri fares are estimates via ONDC
                    </p>
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
            <div className="h-px bg-white/30"></div>
            <div className="flex h-14">
              <div className="flex-1 flex flex-col items-center justify-center border-r border-white/20">
                <span className="text-[10px] text-gray-200">Duration</span>
                <span className="text-white font-bold text-sm">28 min total</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center border-r border-white/20">
                <span className="text-[10px] text-gray-200">Breakdown</span>
                <span className="text-white font-bold text-sm">Metro ₹57 + Last mile ₹35</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-[10px] text-gray-200">Total</span>
                <span className="text-white font-bold text-sm">₹92</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Message */}
        <div
          className={`absolute bottom-24 left-1/2 -translate-x-1/2 bg-[#1F2937] text-white text-[13px] px-5 py-2.5 rounded-xl transition-all duration-300 z-50 whitespace-nowrap ${
            showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          {toastMessage}
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
