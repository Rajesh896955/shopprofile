"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
    Sparkles,
    CheckCircle2,
    X,
    User,
    Building2,
    Mail,
    Phone,
    Loader2,
    Send
} from "lucide-react"
import { toast } from "sonner"
import { ShopProfile } from "./types"

export interface UpgradeFormModalProps {
    isOpen: boolean
    onClose: () => void
    shopProfile: ShopProfile | null
    lang?: string
}

export const UpgradeFormModal: React.FC<UpgradeFormModalProps> = ({
    isOpen,
    onClose,
    shopProfile,
    lang = "en"
}) => {
    const [mounted, setMounted] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [email, setEmail] = useState("")
    const [whatsapp, setWhatsapp] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Pre-populate fields from shopProfile when modal opens
    useEffect(() => {
        if (isOpen && shopProfile) {
            setBusinessName(shopProfile.businessName || "")
            setEmail(shopProfile.businessEmail || shopProfile.userEmail || "")
            setWhatsapp(shopProfile.businessPhone || "")
        }
        if (isOpen) {
            setIsSuccess(false)
        }
    }, [isOpen, shopProfile])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!firstName.trim()) {
            toast.error("Please enter your First Name")
            return
        }

        if (!businessName.trim()) {
            toast.error("Please enter your Business Name")
            return
        }

        if (!email.trim()) {
            toast.error("Please enter your Email Address")
            return
        }

        if (!whatsapp.trim()) {
            toast.error("Please enter your WhatsApp Number")
            return
        }

        setIsSubmitting(true)

        try {
            const res = await fetch("/api/kiosk-upgrade-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    businessName: businessName.trim(),
                    email: email.trim(),
                    whatsapp: whatsapp.trim(),
                    currentPlan: shopProfile?.plan || "14-Day Free Trial",
                    shopId: shopProfile?.id || "",
                    userId: shopProfile?.userId || ""
                })
            })

            const data = await res.json()

            if (res.ok && data.success) {
                setIsSuccess(true)
                toast.success("Upgrade request sent successfully!")
            } else {
                throw new Error(data.error || "Failed to send request")
            }
        } catch (err: any) {
            console.error("Error submitting upgrade form:", err)
            toast.error(err?.message || "Failed to send request. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3.5 sm:p-4 overflow-y-auto">
                    {/* Backdrop - covers header and full viewport */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-0"
                    />

                    {/* Modal / Dialog Box (Smooth entrance on top of header) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{
                            type: "spring",
                            damping: 28,
                            stiffness: 350,
                            mass: 0.85
                        }}
                        className="relative bg-white border border-slate-200/90 rounded-3xl max-w-lg w-full shadow-2xl z-10 text-slate-900 overflow-hidden max-h-[92vh] flex flex-col my-auto"
                    >
                        {/* Header with Gradient & Pro Badge */}
                        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 sm:p-6 text-white relative shrink-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                                title="Close"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-black uppercase tracking-wider text-white mb-2">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                <span>Kiosk Pro Upgrade</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                                Upgrade to Kiosk Pro
                            </h3>
                            <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1 leading-snug">
                                Fill in your details below to activate your Kiosk Pro subscription smoothly.
                            </p>
                        </div>

                        {/* Body / Scrollable Content */}
                        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                            {isSuccess ? (
                                /* ── SUCCESS STATE ── */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", damping: 24, stiffness: 300 }}
                                    className="py-6 px-3 text-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                                        <CheckCircle2 className="w-9 h-9" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <h4 className="text-xl font-black text-[#0A2540]">
                                            Upgrade Request Received! 🎉
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                                            Thank you, {firstName}! Our team will contact you on WhatsApp ({whatsapp}) or Email shortly to activate your Pro plan.
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="py-2.5 px-6 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
                                        >
                                            Done / Close
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                /* ── FORM STATE ── */
                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    {/* First Name & Last Name Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold text-slate-700">
                                                First Name *
                                            </label>
                                            <div className="relative">
                                                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. John"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all shadow-2xs"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold text-slate-700">
                                                Last Name
                                            </label>
                                            <div className="relative">
                                                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Doe"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all shadow-2xs"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Name */}
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-slate-700">
                                            Business Name *
                                        </label>
                                        <div className="relative">
                                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. City Kiosk & Bistro"
                                                value={businessName}
                                                onChange={(e) => setBusinessName(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all shadow-2xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Email ID */}
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-slate-700">
                                            Email ID *
                                        </label>
                                        <div className="relative">
                                            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type="email"
                                                required
                                                placeholder="your-email@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all shadow-2xs"
                                            />
                                        </div>
                                    </div>

                                    {/* WhatsApp Number */}
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-slate-700">
                                            WhatsApp Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+49 170 1234567"
                                                value={whatsapp}
                                                onChange={(e) => setWhatsapp(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all shadow-2xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={isSubmitting}
                                            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all cursor-pointer disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs font-black text-white transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 active:scale-95"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-3.5 h-3.5" />
                                                    <span>Submit Request ➔</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    )
}

export default UpgradeFormModal
