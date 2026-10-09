"use client"

import React, { useState, useEffect } from "react"
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    Upload,
    Trash2,
    Plus,
    Loader2,
    ArrowLeft,
    Check,
    X,
    ImageIcon,
    Share2,
    AlertTriangle,
    CheckCircle2
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { OpeningHourItem, ShopProfile, SocialLinks, TEXTS, TIME_OPTIONS, getOrCreateGuestUserId } from "./types"

// ── Social Media Icons ──
export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}

export function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    )
}

export function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    )
}

export function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    )
}

export interface ContactInfoFormProps {
    shopProfile: ShopProfile | null
    lang?: string
    t?: typeof TEXTS
    onBack: () => void
    businessName: string
    setBusinessName: (val: string) => void
    businessAddress: string
    setBusinessAddress: (val: string) => void
    postalCode: string
    setPostalCode: (val: string) => void
    city: string
    setCity: (val: string) => void
    country: string
    setCountry: (val: string) => void
    businessPhone: string
    setBusinessPhone: (val: string) => void
    businessEmail: string
    setBusinessEmail: (val: string) => void
    websiteUrl: string
    setWebsiteUrl: (val: string) => void
    socialMedia: SocialLinks
    setSocialMedia: React.Dispatch<React.SetStateAction<SocialLinks>>
    activeSocialTab: string | null
    setActiveSocialTab: (tab: string | null) => void
    openingHours: OpeningHourItem[]
    handleToggleStatus: (id: string) => void
    handleChangeTime: (id: string, field: "from" | "to", value: string) => void
    handleDeleteOpeningHour: (id: string) => void
    handleAddOpeningHourSlot: () => void
    handleSaveBusinessInfo: (e: React.FormEvent) => Promise<void>
    isSavingProfile: boolean
    image: string[]
    handleStoreImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    handleRemoveStoreImage: (index: number) => void
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
    shopProfile,
    lang,
    t = TEXTS,
    onBack,
    businessName,
    setBusinessName,
    businessAddress,
    setBusinessAddress,
    postalCode,
    setPostalCode,
    city,
    setCity,
    country,
    setCountry,
    businessPhone,
    setBusinessPhone,
    businessEmail,
    setBusinessEmail,
    websiteUrl,
    setWebsiteUrl,
    socialMedia,
    setSocialMedia,
    activeSocialTab,
    setActiveSocialTab,
    openingHours,
    handleToggleStatus,
    handleChangeTime,
    handleDeleteOpeningHour,
    handleAddOpeningHourSlot,
    handleSaveBusinessInfo,
    isSavingProfile,
    image,
    handleStoreImageUpload,
    handleRemoveStoreImage
}) => {
    const [isDuplicateStoreName, setIsDuplicateStoreName] = useState(false)
    const [isCheckingStoreName, setIsCheckingStoreName] = useState(false)

    // Debounced check for store name uniqueness
    useEffect(() => {
        const trimmed = businessName.trim().toLowerCase()
        if (!trimmed || trimmed.length < 2) {
            setIsDuplicateStoreName(false)
            setIsCheckingStoreName(false)
            return
        }

        setIsCheckingStoreName(true)
        const timer = setTimeout(async () => {
            try {
                const currentUserId = shopProfile?.userId || getOrCreateGuestUserId()
                const snap = await getDocs(collection(db, "business-shop-profile"))
                let foundDuplicate = false

                snap.forEach((docSnap) => {
                    const data = docSnap.data()
                    const existingName = (data.businessName || "").trim().toLowerCase()
                    const isSameProfile = shopProfile?.id && (docSnap.id === shopProfile.id || docSnap.id === shopProfile.id.replace("local-", ""))
                    const isSameUser = data.userId && data.userId === currentUserId

                    if (existingName === trimmed && !isSameProfile && !isSameUser) {
                        foundDuplicate = true
                    }
                })

                setIsDuplicateStoreName(foundDuplicate)
            } catch (err) {
                console.warn("Error checking store name uniqueness:", err)
            } finally {
                setIsCheckingStoreName(false)
            }
        }, 350)

        return () => clearTimeout(timer)
    }, [businessName, shopProfile?.id, shopProfile?.userId])

    const onSubmitWrapper = (e: React.FormEvent) => {
        if (isDuplicateStoreName) {
            e.preventDefault()
            return
        }
        handleSaveBusinessInfo(e)
    }

    return (
        <form onSubmit={onSubmitWrapper} className="space-y-8 max-w-4xl mx-auto pb-12">
            {/* Top Bar Header with Back Navigation */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs hover:bg-slate-50 active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{shopProfile ? t.backCatalog : t.backWelcome}</span>
                </button>

                <h1 className="text-lg sm:text-2xl font-black text-[#0A2540] tracking-tight">
                    {shopProfile ? t.editTitle : t.title}
                </h1>

                <div className="w-20" />
            </div>

            {/* SECTION 1: BUSINESS INFORMATION */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-black text-sm">
                        1
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-black text-[#0A2540]">{t.sec1}</h2>
                        <p className="text-xs text-slate-500">{t.subtitle}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Business Name */}
                    <div className="sm:col-span-2 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-slate-700">{t.businessName}</label>
                            {isCheckingStoreName ? (
                                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin text-[#0052FF]" />
                                    <span>Checking availability...</span>
                                </span>
                            ) : isDuplicateStoreName ? (
                                <span className="text-[11px] font-extrabold text-rose-600 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                                    <span>Name in use</span>
                                </span>
                            ) : businessName.trim().length >= 2 ? (
                                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span>Available</span>
                                </span>
                            ) : null}
                        </div>
                        <div className="relative">
                            <Building2 className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDuplicateStoreName ? "text-rose-500" : "text-slate-400"}`} />
                            <input
                                type="text"
                                required
                                placeholder={t.businessNamePlaceholder}
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm font-semibold rounded-xl outline-none transition-all ${
                                    isDuplicateStoreName
                                        ? "bg-rose-50/40 border-2 border-rose-400 text-rose-950 focus:border-rose-500 focus:bg-white"
                                        : "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#0052FF] focus:bg-white"
                                }`}
                            />
                            {isCheckingStoreName && (
                                <Loader2 className="w-4 h-4 text-[#0052FF] animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                            )}
                            {!isCheckingStoreName && isDuplicateStoreName && (
                                <AlertTriangle className="w-4 h-4 text-rose-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                            )}
                            {!isCheckingStoreName && !isDuplicateStoreName && businessName.trim().length >= 2 && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                            )}
                        </div>
                        {isDuplicateStoreName && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 animate-in fade-in slide-in-from-top-1 duration-200 pt-0.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>{t.storeNameInUse || "store name is already in use please change the store name"}</span>
                            </div>
                        )}
                    </div>

                    {/* Street & House Number */}
                    <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">{t.streetNumber}</label>
                        <div className="relative">
                            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                required
                                placeholder={t.streetNumberPlaceholder}
                                value={businessAddress}
                                onChange={(e) => setBusinessAddress(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Postal Code */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">{t.postalCode}</label>
                        <input
                            type="text"
                            required
                            placeholder={t.postalCodePlaceholder}
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                        />
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">{t.city}</label>
                        <input
                            type="text"
                            required
                            placeholder={t.cityPlaceholder}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                        />
                    </div>

                    {/* Country */}
                    <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">{t.country}</label>
                        <input
                            type="text"
                            placeholder={t.countryPlaceholder}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                        />
                    </div>

                    {/* Business Phone */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">{t.phone}</label>
                        <div className="relative">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="tel"
                                required
                                placeholder={t.phonePlaceholder}
                                value={businessPhone}
                                onChange={(e) => setBusinessPhone(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Business Email */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">{t.email}</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                required
                                placeholder={t.emailPlaceholder}
                                value={businessEmail}
                                onChange={(e) => setBusinessEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Website URL */}
                    <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">{t.website}</label>
                        <div className="relative">
                            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="url"
                                placeholder={t.websitePlaceholder}
                                value={websiteUrl}
                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media Tabs */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                    <label className="block text-xs font-bold text-slate-700">{t.socialMedia}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                            <InstagramIcon className="w-4 h-4 text-pink-600 shrink-0" />
                            <input
                                type="text"
                                placeholder="Instagram Profile / Handle"
                                value={socialMedia.instagram || ""}
                                onChange={(e) => setSocialMedia((prev) => ({ ...prev, instagram: e.target.value }))}
                                className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                            <FacebookIcon className="w-4 h-4 text-blue-600 shrink-0" />
                            <input
                                type="text"
                                placeholder="Facebook Page URL"
                                value={socialMedia.facebook || ""}
                                onChange={(e) => setSocialMedia((prev) => ({ ...prev, facebook: e.target.value }))}
                                className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                            <YouTubeIcon className="w-4 h-4 text-red-600 shrink-0" />
                            <input
                                type="text"
                                placeholder="YouTube Channel URL"
                                value={socialMedia.youtube || ""}
                                onChange={(e) => setSocialMedia((prev) => ({ ...prev, youtube: e.target.value }))}
                                className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                            <LinkedInIcon className="w-4 h-4 text-blue-700 shrink-0" />
                            <input
                                type="text"
                                placeholder="LinkedIn Profile URL"
                                value={socialMedia.linkedin || ""}
                                onChange={(e) => setSocialMedia((prev) => ({ ...prev, linkedin: e.target.value }))}
                                className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: OPENING HOURS */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-black text-sm">
                            2
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-black text-[#0A2540]">{t.sec2}</h2>
                            <p className="text-xs text-slate-500">{t.splitHoursNotice}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddOpeningHourSlot}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052FF] hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t.addOpeningHours}</span>
                    </button>
                </div>

                <div className="space-y-2">
                    {openingHours.map((slot) => {
                        const isOpen = slot.status === "open"
                        const dayLabel = slot.day

                        return (
                            <div
                                key={slot.id}
                                className={`flex items-center justify-between p-3 rounded-2xl border transition-all gap-3 flex-wrap sm:flex-nowrap ${isOpen ? "bg-slate-50/70 border-slate-200" : "bg-slate-100/60 border-slate-200/60 opacity-60"
                                    }`}
                            >
                                <div className="w-28 sm:w-36 shrink-0 font-bold text-xs sm:text-sm text-[#0A2540]">
                                    {dayLabel}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleStatus(slot.id)}
                                        className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${isOpen
                                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                            : "bg-slate-200 text-slate-600 border border-slate-300"
                                            }`}
                                    >
                                        {isOpen ? t.open : t.closed}
                                    </button>
                                </div>

                                {isOpen ? (
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={slot.from}
                                            onChange={(e) => handleChangeTime(slot.id, "from", e.target.value)}
                                            className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg outline-none cursor-pointer"
                                        >
                                            {TIME_OPTIONS.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-xs text-slate-400 font-bold">-</span>
                                        <select
                                            value={slot.to}
                                            onChange={(e) => handleChangeTime(slot.id, "to", e.target.value)}
                                            className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg outline-none cursor-pointer"
                                        >
                                            {TIME_OPTIONS.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="text-xs font-bold text-slate-400 italic">--</div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteOpeningHour(slot.id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer ml-auto"
                                    title="Delete Slot"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* SECTION 3: STORE LOGO / IMAGES */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-black text-sm">
                        3
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-black text-[#0A2540]">{t.sec3}</h2>
                        <p className="text-xs text-slate-500">{t.uploadSub}</p>
                    </div>
                </div>

                {image && image.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {image.map((imgUrl, idx) => (
                            <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
                                <img src={imgUrl} alt={`Store Logo ${idx + 1}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveStoreImage(idx)}
                                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 cursor-pointer shadow-md"
                                    title="Remove Image"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}

                        <label className="cursor-pointer aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#0052FF] bg-slate-50 hover:bg-blue-50/40 flex flex-col items-center justify-center transition-all group">
                            <Plus className="w-5 h-5 text-slate-400 group-hover:text-[#0052FF]" />
                            <span className="text-[11px] font-bold text-slate-600 group-hover:text-[#0052FF] mt-1">Add Image</span>
                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleStoreImageUpload} />
                        </label>
                    </div>
                ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-slate-300 hover:border-[#0052FF] bg-slate-50 hover:bg-blue-50/40 rounded-2xl transition-all group">
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#0052FF] mb-2 transition-transform group-hover:-translate-y-0.5" />
                        <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#0052FF]">{t.uploadLogo}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">{t.uploadSub}</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleStoreImageUpload} />
                    </label>
                )}
            </div>

            {/* Submit / Action Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="py-3.5 px-8 rounded-2xl bg-[#0052FF] hover:bg-blue-600 active:scale-98 disabled:opacity-60 text-white font-black text-sm transition-all shadow-lg shadow-blue-500/25 cursor-pointer flex items-center gap-2"
                >
                    {isSavingProfile ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{t.saving}</span>
                        </>
                    ) : (
                        <span>{t.saveContinue}</span>
                    )}
                </button>
            </div>
        </form>
    )
}

export default ContactInfoForm
