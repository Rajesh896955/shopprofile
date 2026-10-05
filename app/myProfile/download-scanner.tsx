

"use client"

import React, { useState, useEffect } from "react"
import QRCode from "qrcode"
import { QrCode, Download, X, Smartphone, Loader2, Lock, Sparkles, Clock, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { ShopProfile, ProductItem, getOrCreateGuestUserId, checkTrialStatus } from "./types"

export interface DownloadScannerProps {
    isOpen?: boolean
    onClose?: () => void
    shopProfile: ShopProfile | null
    products: ProductItem[]
    userId?: string
    userEmail?: string
    onUpgradeClick?: () => void
}

export const DownloadScanner: React.FC<DownloadScannerProps> = ({
    isOpen = true,
    onClose,
    shopProfile,
    userId: propUserId,
    onUpgradeClick
}) => {
    const [qrDataUrl, setQrDataUrl] = useState<string>("")
    const [isGenerating, setIsGenerating] = useState<boolean>(true)

    // Check 14-day free trial status
    const trial = checkTrialStatus(shopProfile)

    // Resolve userId
    const activeUserId =
        propUserId ||
        shopProfile?.userId ||
        (typeof window !== "undefined" ? getOrCreateGuestUserId() : "kiosk_user")

    const businessName = shopProfile?.businessName || "My Kiosk Store"

    // Public Customer-facing shop URL
    const [originUrl, setOriginUrl] = useState<string>("")
    useEffect(() => {
        if (typeof window !== "undefined") {
            setOriginUrl(window.location.origin)
        }
    }, [])

    const businessSlug = shopProfile?.businessName
        ? shopProfile.businessName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        : ""
    const shopIdentifier = businessSlug || activeUserId

    const shopUrl = `${originUrl || "https://diiconnect.com"}/shop/${shopIdentifier}`

    // Generate High-Res QR Code Data URL
    useEffect(() => {
        let isMounted = true
        setIsGenerating(true)

        QRCode.toDataURL(
            shopUrl,
            {
                width: 600,
                margin: 2,
                color: {
                    dark: "#0A2540",
                    light: "#FFFFFF"
                },
                errorCorrectionLevel: "H"
            },
            (err, url) => {
                if (!isMounted) return
                if (err) {
                    console.error("QR Code generation error:", err)
                    toast.error("Failed to generate Scanner QR")
                } else {
                    setQrDataUrl(url)
                }
                setIsGenerating(false)
            }
        )

        return () => {
            isMounted = false
        }
    }, [shopUrl])

    // Download QR Code Handler
    const handleDownload = () => {
        if (trial.isExpired) {
            toast.error("Free trial expired! Please upgrade your plan to download and activate the scanner.")
            if (onUpgradeClick) onUpgradeClick()
            return
        }

        if (!qrDataUrl) return
        const cleanName = businessName.toLowerCase().replace(/[^a-z0-9]/g, "-")
        const link = document.createElement("a")
        link.href = qrDataUrl
        link.download = `${cleanName}-scanner-qr.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("Scanner QR code downloaded successfully!")
    }

    if (!isOpen) return null

    return (
        <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl w-full max-w-[340px] sm:max-w-sm text-center space-y-3.5 relative animate-in zoom-in-95 duration-150 mx-auto">
            {/* Header with Title & Close Button */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 min-w-0 text-left">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center shrink-0 border border-blue-100">
                        <QrCode className="w-4 h-4 text-[#0052FF]" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-black text-[#0A2540] truncate max-w-[190px] sm:max-w-[210px]">
                            {businessName}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold leading-none">QR Code Menu</p>
                    </div>
                </div>

                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                        title="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Trial Status Pill */}
            {trial.isExpired ? (
                <div className="flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold">
                    <span className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Trial Expired</span>
                    </span>
                    <button
                        type="button"
                        onClick={onUpgradeClick}
                        className="underline hover:text-rose-900 cursor-pointer font-black"
                    >
                        Upgrade Now
                    </button>
                </div>
            ) : trial.isTrial ? (
                <div className="flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Trial: {trial.daysLeft} {trial.daysLeft === 1 ? "day" : "days"} left</span>
                    </span>
                    <button
                        type="button"
                        onClick={onUpgradeClick}
                        className="text-[#0052FF] hover:underline cursor-pointer font-black"
                    >
                        Upgrade
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Pro Plan Active</span>
                </div>
            )}

            {/* QR Scanner Display Box with Trial Expiry Guard */}
            <div className="relative bg-slate-50 border border-slate-200/80 p-3 sm:p-3.5 rounded-2xl shadow-inner inline-flex items-center justify-center mx-auto">
                {isGenerating ? (
                    <div className="w-44 h-44 sm:w-48 sm:h-48 flex flex-col items-center justify-center bg-white rounded-xl shadow-xs">
                        <Loader2 className="w-6 h-6 text-[#0052FF] animate-spin mb-2" />
                        <span className="text-[11px] font-bold text-slate-500">Generating QR...</span>
                    </div>
                ) : qrDataUrl ? (
                    <div className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto">
                        <img
                            src={qrDataUrl}
                            alt={`Scanner for ${businessName}`}
                            className={`w-full h-full object-contain mx-auto rounded-xl bg-white p-2 shadow-xs transition-all ${trial.isExpired ? "blur-xs opacity-30 grayscale" : ""
                                }`}
                        />

                        {/* Lock Overlay when Trial Expired */}
                        {trial.isExpired && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-[2px] rounded-xl p-3 text-white text-center">
                                <div className="w-9 h-9 rounded-full bg-rose-500/90 text-white flex items-center justify-center mb-1.5 shadow-md">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-black tracking-tight leading-tight">Scanner Inactive</span>
                                <span className="text-[10px] text-slate-200 font-medium mt-0.5 leading-tight">
                                    14-day trial expired
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center bg-white rounded-xl text-xs text-slate-400">
                        Scanner Unavailable
                    </div>
                )}
            </div>

            <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                <span>
                    {trial.isExpired
                        ? "Scanner disabled — Upgrade required"
                        : "Scan with phone camera to view menu"}
                </span>
            </p>

            {/* Direct Shop Link Preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 flex items-center justify-between gap-2 text-left">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 truncate flex-1 font-mono">
                    {shopUrl}
                </span>
                <button
                    type="button"
                    onClick={() => {
                        if (typeof navigator !== "undefined") {
                            navigator.clipboard.writeText(shopUrl)
                            toast.success("Shop Link copied!")
                        }
                    }}
                    className="text-[10px] font-bold text-[#0052FF] hover:underline cursor-pointer shrink-0 px-1.5 py-0.5 rounded hover:bg-blue-50"
                >
                    Copy
                </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-0.5 space-y-2">
                {trial.isExpired ? (
                    <button
                        type="button"
                        onClick={onUpgradeClick}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 cursor-pointer animate-pulse"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Upgrade to Reactivate Scanner</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleDownload}
                        disabled={!qrDataUrl || isGenerating}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0052FF] hover:bg-blue-600 active:scale-98 disabled:opacity-50 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/25 cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Scanner</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default DownloadScanner