"use client"

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
    <div className="min-h-screen bg-[#F5F3F7] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] bg-[#F5F3F7] min-h-[700px] flex flex-col rounded-3xl overflow-hidden shadow-2xl">
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
                onClick={() => tile.isNew && router.push("/plan-journey")}
                className={`
                  aspect-square rounded-xl flex flex-col items-center justify-center gap-2 relative
                  ${tile.icon ? "bg-white shadow-sm" : "bg-white shadow-sm"}
                  ${tile.isNew ? "border-2 border-[#E9D5FF] cursor-pointer" : ""}
                `}
              >
                {tile.isNew && (
                  <div className="absolute -top-1 -right-1 bg-[#6B21A8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    NEW
                  </div>
                )}
                {tile.icon && (
                  <>
                    <tile.icon
                      className={`w-8 h-8 ${tile.isNew ? "text-[#6B21A8]" : "text-[#6B21A8]"}`}
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
        <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 pointer-events-none">
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
    </div>
  )
}
