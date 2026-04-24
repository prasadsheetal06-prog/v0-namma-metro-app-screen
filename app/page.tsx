"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
} from "lucide-react"

export default function NammaMetro() {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const handleTileClick = (isNew: boolean | undefined) => {
    if (isNew) {
      router.push("/plan-journey")
    } else {
      setShowToast(true)
    }
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

  return (
    <div className="min-h-screen bg-[#F0EDF5] flex items-center justify-center p-4 transition-all duration-[250ms] ease-out">
      <div className="w-full max-w-[390px] bg-[#F0EDF5] min-h-[700px] flex flex-col rounded-3xl overflow-hidden shadow-2xl relative">
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
        <main className="flex-1 px-4 pb-24">
          {/* Section Label */}
          <h2 className="text-gray-700 font-semibold text-lg py-4">Travel</h2>

          {/* Tile Grid */}
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

        {/* Toast Message */}
        <div
          className={`absolute bottom-24 left-1/2 -translate-x-1/2 bg-[#1F2937] text-white text-[13px] px-5 py-2.5 rounded-xl transition-all duration-300 ${
            showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          Feature available in current app
        </div>
      </div>
    </div>
  )
}
