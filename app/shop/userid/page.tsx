
"use client"

import React, { useState, useEffect, useMemo, use } from "react"
import Link from "next/link"
import {
    Store,
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    Search,
    ShoppingBag,
    ImageIcon,
    X,
    ShieldCheck,
    ChevronRight,
    ChevronLeft,
    Maximize2,
    ArrowLeft,
    Heart,
    Grid,
    List,
    Layers,
    Lock,
    Share2,
    MoreHorizontal,
    ShoppingCart,
    Navigation,
    Check
} from "lucide-react"
import { toast } from "sonner"
import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ShopProfile, ProductItem, OpeningHourItem, formatFirestoreTimestamp, checkTrialStatus } from "@/app/myProfile/types"
import { InstagramIcon, FacebookIcon, YouTubeIcon, LinkedInIcon } from "@/app/myProfile/contact_info"

interface ShopPageProps {
    params: Promise<{ userId: string }>
}

const t = {
    verifiedStore: "Verified",
    tagline: "Drinks · Snacks · Tobacco · Daily Essentials",
    itemsCount: (n: number) => `${n} Products`,
    location: "Location",
    openingHours: "Opening Hours",
    phone: "Phone",
    phoneNotProvided: "Phone not provided",
    weeklyHours: "Weekly Opening Hours",
    closed: "Closed",
    openNow: "Open now",
    closedNow: "Closed",
    viewMenu: "View Menu",
    directions: "Directions",
    call: "Call",
    share: "Share",
    linkCopied: "Link copied to clipboard! ✅",
    closedToday: (day: string) => `Closed Today (${day})`,
    openToday: (from: string, to: string) => `Mon - Sat ${from} - ${to}`,
    searchPlaceholder: "Search catalog & products...",
    searchButton: "Search",
    ourCategories: "Our Categories",
    categoriesSubtitle: "Click on a category to explore all products",
    allProducts: "All Products",
    all: "All",
    backToCategories: "Categories",
    backToOverview: "Back to Overview",
    backToMenu: "Back to Menu",
    productsFound: "products found",
    searchResultsFor: (q: string) => `Search results: "${q}"`,
    noProductsFound: "No products found",
    tryDifferentSearch: "Try a different search query.",
    noProductsInCategory: "No products available in this category.",
    portionSize: "Portion / Size:",
    listView: "List View",
    gridView: "Grid View",
    favorite: "Favorite",
    cart: "Cart",
    cartTitle: "Cart & Favorites",
    itemsInCart: (n: number) => `${n} Items saved`,
    emptyCart: "Your cart is empty",
    emptyCartDesc: "Click the heart icon on any product to save it here in your cart.",
    totalAmount: "Total Amount:",
    clearAll: "Clear all",
    continueShopping: "Continue shopping",
    days: {
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday",
        sun: "Sunday",
        Sunday: "Sunday",
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday"
    }
}

export default function PublicShopPage({ params }: ShopPageProps) {
    const resolvedParams = use(params)
    const userId = decodeURIComponent(resolvedParams.userId)

    const [shopProfile, setShopProfile] = useState<ShopProfile | null>(null)
    const [products, setProducts] = useState<ProductItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
    const [showCategorySearch, setShowCategorySearch] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
    const [showHoursDropdown, setShowHoursDropdown] = useState<boolean>(false)
    const [favorites, setFavorites] = useState<Record<string, boolean>>({})
    const [showCartModal, setShowCartModal] = useState<boolean>(false)
    const [viewMode, setViewMode] = useState<"list" | "grid">("list")
    const [activeShopImgIdx, setActiveShopImgIdx] = useState<number>(0)
    const [selectedShopImageModal, setSelectedShopImageModal] = useState<string | null>(null)



    // Favorited products matching heart selection
    const favoriteProducts = useMemo(() => {
        return products.filter((p) => Boolean(favorites[p.id]))
    }, [products, favorites])

    // Total price calculation for cart
    const cartTotalPrice = useMemo(() => {
        let total = 0
        favoriteProducts.forEach((p) => {
            const numStr = (p.price || "").replace(/[^0-9,.]/g, "").replace(",", ".")
            const num = parseFloat(numStr)
            if (!isNaN(num)) {
                total += num
            }
        })
        return total > 0 ? `€ ${total.toFixed(2).replace(".", ",")}` : ""
    }, [favoriteProducts])

    // ── 1. Fetch & Realtime Sync Business Profile from "business-shop-profile" matching userId, businessName or slug ──
    useEffect(() => {
        if (!userId) return

        let isMounted = true
        let unsubProfile: (() => void) | undefined

        const toSlug = (str: string) =>
            str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

        const rawParam = userId.trim().toLowerCase()
        const slugParam = toSlug(userId)

        try {
            const profileCol = collection(db, "business-shop-profile")
            unsubProfile = onSnapshot(
                profileCol,
                (snapshot) => {
                    if (!isMounted) return
                    let matched: ShopProfile | null = null

                    snapshot.forEach((docSnap) => {
                        const data = docSnap.data()
                        const bName = (data.businessName || "").trim().toLowerCase()
                        const bSlug = toSlug(data.businessName || "")

                        const isMatch =
                            data.userId === userId ||
                            docSnap.id === userId ||
                            bName === rawParam ||
                            (bSlug && bSlug === slugParam) ||
                            (data.slug && data.slug.toLowerCase() === rawParam) ||
                            (data.businessSlug && data.businessSlug.toLowerCase() === slugParam)

                        if (isMatch) {
                            matched = {
                                id: docSnap.id,
                                ...(data as ShopProfile)
                            }
                        }
                    })

                    if (matched) {
                        setShopProfile(matched)
                    } else {
                        // Fallback direct doc lookup
                        getDoc(doc(db, "business-shop-profile", userId))
                            .then((directSnap) => {
                                if (directSnap.exists() && isMounted) {
                                    setShopProfile({ id: directSnap.id, ...(directSnap.data() as any) })
                                }
                            })
                            .catch(() => { })
                    }
                },
                (err) => {
                    console.warn("Error subscribing to shop profile:", err)
                }
            )
        } catch (err) {
            console.warn("Error setting up shop profile listener:", err)
        }

        // ── 2. Realtime sync products for this userId ──
        let unsubProducts: (() => void) | undefined

        try {
            const prodCol = collection(db, "shop-products")
            unsubProducts = onSnapshot(
                prodCol,
                (snapshot) => {
                    if (!isMounted) return
                    const list: ProductItem[] = []

                    snapshot.forEach((docSnap) => {
                        const data = docSnap.data()
                        const matchesUser =
                            !data.userId ||
                            data.userId === userId ||
                            userId === "guest_user" ||
                            (shopProfile && (data.userId === shopProfile.id || data.userId === shopProfile.userId || (data.userEmail && shopProfile.userEmail && data.userEmail === shopProfile.userEmail)))

                        if (matchesUser) {
                            let imgArray: string[] = []
                            if (Array.isArray(data.images) && data.images.length > 0) {
                                imgArray = data.images.filter(Boolean)
                            } else if (data.image) {
                                imgArray = [data.image]
                            }

                            list.push({
                                id: docSnap.id,
                                name: data.name || "",
                                price: data.price || "€0.00",
                                quantity: data.quantity || "",
                                description: data.description || "",
                                images: imgArray,
                                categoryName: data.categoryName || "",
                                userId: data.userId || "",
                                userEmail: data.userEmail || "",
                                createdAt: formatFirestoreTimestamp(data.createdAt),
                                updatedAt: formatFirestoreTimestamp(data.updatedAt)
                            })
                        }
                    })

                    setProducts(list)
                    setIsLoading(false)
                },
                (err) => {
                    console.warn("Error subscribing to products:", err)
                    setIsLoading(false)
                }
            )
        } catch (e) {
            console.warn("Products setup error:", e)
            setIsLoading(false)
        }

        return () => {
            isMounted = false
            if (unsubProfile) unsubProfile()
            if (unsubProducts) unsubProducts()
        }
    }, [userId, shopProfile])

    // Derive Categories with metadata strictly from Firestore database products
    const categoryMetadata = useMemo(() => {
        const map = new Map<string, { name: string; count: number; images: string[]; subtitle: string }>()

        products.forEach((p) => {
            const catName = p.categoryName && p.categoryName.trim() ? p.categoryName.trim() : "General"
            if (!map.has(catName)) {
                map.set(catName, {
                    name: catName,
                    count: 0,
                    images: [],
                    subtitle: ""
                })
            }
            const data = map.get(catName)!
            data.count += 1
            if (p.images && p.images.length > 0) {
                p.images.forEach((img) => {
                    if (img && !data.images.includes(img)) data.images.push(img)
                })
            }
        })

        return Array.from(map.values()).map((cat) => {
            const catProducts = products.filter(
                (p) => (p.categoryName || "General").trim().toLowerCase() === cat.name.toLowerCase()
            )
            const productNames = catProducts.map((p) => p.name).slice(0, 3).join(", ")
            return {
                ...cat,
                count: catProducts.length,
                subtitle: productNames ? `${productNames}...` : t.itemsCount(catProducts.length)
            }
        })
    }, [products, t])

    // Subcategories for current selected category (strictly from database fields)
    const subCategoriesForCurrent = useMemo(() => {
        if (!selectedCategory) return []
        const catLower = selectedCategory.toLowerCase()
        const catProducts = products.filter(
            (p) =>
                selectedCategory === "all" ||
                (p.categoryName || "General").trim().toLowerCase() === catLower
        )

        // Check if products have explicit subCategory or tags in database
        const subSet = new Set<string>()
        catProducts.forEach((p: any) => {
            if (p.subCategory && typeof p.subCategory === "string" && p.subCategory.trim()) {
                subSet.add(p.subCategory.trim())
            }
            if (p.subcategory && typeof p.subcategory === "string" && p.subcategory.trim()) {
                subSet.add(p.subcategory.trim())
            }
            if (Array.isArray(p.tags)) {
                p.tags.forEach((tag: string) => {
                    if (tag && typeof tag === "string" && tag.trim()) subSet.add(tag.trim())
                })
            }
        })

        return Array.from(subSet)
    }, [selectedCategory, products])

    // Filter Products based on search, selectedCategory, and selectedSubCategory
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesSearch =
                !searchQuery ||
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.categoryName && p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.quantity && p.quantity.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))

            if (!matchesSearch) return false

            if (selectedCategory && selectedCategory !== "all") {
                const isCatMatch = (p.categoryName || "General").trim().toLowerCase() === selectedCategory.trim().toLowerCase()
                if (!isCatMatch) return false
            }

            if (selectedSubCategory && selectedSubCategory !== "all") {
                const subLower = selectedSubCategory.toLowerCase()
                const pSub = ((p as any).subCategory || (p as any).subcategory || "").toLowerCase()
                const pTags = Array.isArray((p as any).tags) ? (p as any).tags.map((t: string) => t.toLowerCase()) : []

                return pSub === subLower || pTags.includes(subLower)
            }

            return true
        })
    }, [products, searchQuery, selectedCategory, selectedSubCategory])

    const toggleFavorite = (productId: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        setFavorites((prev) => ({
            ...prev,
            [productId]: !prev[productId]
        }))
    }

    // Extract business fields
    const businessName = shopProfile?.businessName || "City Kiosk"
    const businessAddress = shopProfile?.businessAddress || ""
    const city = shopProfile?.city || ""
    const postalCode = shopProfile?.postalCode || ""
    const country = shopProfile?.country || "Germany"
    const businessPhone = shopProfile?.businessPhone || ""
    const businessEmail = shopProfile?.businessEmail || ""
    const websiteUrl = shopProfile?.websiteUrl || ""
    const openingHoursList: OpeningHourItem[] = shopProfile?.openingHoursList || []
    const isApproved = shopProfile?.status === "approved" || shopProfile?.status === "active"

    // Store / Business Images (from shopProfile.image)
    const shopImages: string[] = useMemo(() => {
        if (Array.isArray(shopProfile?.image) && shopProfile.image.length > 0) {
            return shopProfile.image.filter(Boolean)
        }
        if (Array.isArray((shopProfile as any)?.images) && (shopProfile as any).images.length > 0) {
            return (shopProfile as any).images.filter(Boolean)
        }
        if (typeof (shopProfile as any)?.image === "string" && (shopProfile as any).image.trim()) {
            return [(shopProfile as any).image.trim()]
        }
        return []
    }, [shopProfile])

    const fullAddress = [businessAddress, postalCode, city, country].filter(Boolean).join(", ")
    const mapUrl = fullAddress
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
        : ""

    // Social links
    const social = shopProfile?.socialMedia || {}
    const instagram = social.instagram || shopProfile?.instagram || ""
    const facebook = social.facebook || shopProfile?.facebook || ""
    const linkedin = social.linkedin || shopProfile?.linkedin || ""
    const youtube = social.youtube || shopProfile?.youtube || ""

    // Calculate today's status & hours
    const todayStatus = useMemo(() => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const rawTodayName = dayNames[new Date().getDay()]
        const localizedTodayName =
            (t.days as Record<string, string>)[rawTodayName] || rawTodayName

        const todayHour = openingHoursList.find(
            (h) =>
                h.day.toLowerCase() === rawTodayName.toLowerCase() ||
                h.id.toLowerCase() === rawTodayName.substring(0, 3).toLowerCase()
        )

        if (!todayHour || todayHour.status === "closed" || todayHour.from === "--") {
            return {
                isOpen: false,
                todayName: localizedTodayName,
                hoursText: t.closed,
                statusText: t.closedNow,
                text: t.closedToday(localizedTodayName)
            }
        }

        return {
            isOpen: true,
            todayName: localizedTodayName,
            hoursText: `${todayHour.from} - ${todayHour.to}`,
            statusText: t.openNow,
            text: `${todayHour.from} - ${todayHour.to}`
        }
    }, [openingHoursList, t])

    const handleShare = async () => {
        if (typeof window !== "undefined") {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: businessName,
                        text: `${businessName} - Kiosk & Shop`,
                        url: window.location.href
                    })
                } catch {
                    // user cancelled
                }
            } else {
                navigator.clipboard.writeText(window.location.href)
                toast.success(t.linkCopied)
            }
        }
    }

    // Check 14-day free trial status
    const trial = checkTrialStatus(shopProfile)

    // Format phone for tel: link
    const phoneHref = businessPhone ? `tel:${businessPhone.replace(/[^0-9+]/g, "")}` : ""

    // Format website and social URLs so they open properly on click
    const websiteHref = useMemo(() => {
        if (!websiteUrl) return ""
        const clean = websiteUrl.trim()
        if (clean.startsWith("http://") || clean.startsWith("https://")) {
            return clean
        }
        return `https://${clean}`
    }, [websiteUrl])

    const instagramHref = useMemo(() => {
        if (!instagram) return ""
        const clean = instagram.trim()
        if (clean.startsWith("http://") || clean.startsWith("https://")) {
            return clean
        }
        return `https://instagram.com/${clean.replace(/^@/, "")}`
    }, [instagram])

    const facebookHref = useMemo(() => {
        if (!facebook) return ""
        const clean = facebook.trim()
        if (clean.startsWith("http://") || clean.startsWith("https://")) {
            return clean
        }
        return `https://facebook.com/${clean.replace(/^@/, "")}`
    }, [facebook])

    const youtubeHref = useMemo(() => {
        if (!youtube) return ""
        const clean = youtube.trim()
        if (clean.startsWith("http://") || clean.startsWith("https://")) {
            return clean
        }
        return `https://youtube.com/${clean.replace(/^@/, "")}`
    }, [youtube])

    const linkedinHref = useMemo(() => {
        if (!linkedin) return ""
        const clean = linkedin.trim()
        if (clean.startsWith("http://") || clean.startsWith("https://")) {
            return clean
        }
        return `https://linkedin.com/in/${clean.replace(/^@/, "")}`
    }, [linkedin])

    // ── TRIAL EXPIRATION GUARD: Lock public shop if trial has expired ──
    if (shopProfile && trial.isExpired) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between font-sans">
                {/* Minimal Header */}
                <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-2xs">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Store className="w-5 h-5 text-[#0052FF]" />
                            <h1 className="text-base sm:text-lg font-black text-[#0A2540]">{businessName}</h1>
                        </div>
                    </div>
                </header>

                {/* Inactive Notice Body */}
                <main className="max-w-md mx-auto px-4 py-16 text-center space-y-5">
                    <div className="relative w-20 h-20 rounded-3xl bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
                        <Store className="w-10 h-10" />
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
                            <Lock className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-black text-[#0A2540]">
                            Store Temporarily Unavailable
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                            This store&apos;s 14-day free trial period has ended. The store owner needs to reactivate their subscription to restore public catalog access.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/my-store"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0052FF] hover:bg-blue-600 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
                        >
                            <span>Store Owner Login / Upgrade</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/80 bg-white">
                    Powered by diiConnect Kiosk
                </footer>
            </div>
        )
    }

    const isCategoryView = Boolean(selectedCategory || searchQuery)

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {isCategoryView ? (
                /* ══════════════════════════════════════════════════════════════════
                   SCREEN 2: CATEGORY PRODUCTS VIEW (Exact Mobile Reference UI)
                   ══════════════════════════════════════════════════════════════════ */
                <div className="min-h-screen bg-white text-slate-900 pb-16 animate-in fade-in duration-150">
                    {/* Sticky Top Header: [ ← ]   Getränke   [ 🔍 ] */}
                    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-3 max-w-2xl mx-auto">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategory(null)
                                setSelectedSubCategory(null)
                                setSearchQuery("")
                                setShowCategorySearch(false)
                            }}
                            className="w-10 h-10 rounded-full hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center text-slate-900 transition-colors cursor-pointer shrink-0 -ml-1.5"
                            title={t.backToCategories}
                        >
                            <ArrowLeft className="w-6 h-6 text-slate-900" />
                        </button>

                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 text-center truncate flex-1 tracking-tight">
                            {searchQuery && !selectedCategory
                                ? t.searchResultsFor(searchQuery)
                                : selectedCategory === "all"
                                    ? t.allProducts
                                    : selectedCategory}
                        </h1>

                        <div className="flex items-center gap-1.5 shrink-0 -mr-1.5">
                            {/* Cart / Favorites Button */}
                            <button
                                type="button"
                                onClick={() => setShowCartModal(true)}
                                className="w-10 h-10 rounded-full hover:bg-blue-50 active:bg-blue-100 flex items-center justify-center text-slate-900 hover:text-[#0052FF] transition-all cursor-pointer relative"
                                title={t.cartTitle}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {favoriteProducts.length > 0 && (
                                    <span className="absolute top-1.5 right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                                        {favoriteProducts.length}
                                    </span>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowCategorySearch((prev) => !prev)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${showCategorySearch || searchQuery
                                    ? "bg-blue-50 text-[#0052FF]"
                                    : "hover:bg-slate-100 active:bg-slate-200 text-slate-900"
                                    }`}
                                title={t.searchButton}
                            >
                                <Search className="w-6 h-6 text-slate-900" />
                            </button>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto px-4 pt-2.5 space-y-3">
                        {/* Search Input Bar (Dropdown toggle or active search) */}
                        {showCategorySearch && (
                            <div className="relative animate-in fade-in slide-in-from-top-1 duration-150">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t.searchPlaceholder}
                                    autoFocus
                                    className="w-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white pl-10 pr-9 py-2.5 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 border border-transparent focus:border-[#0052FF] focus:outline-hidden transition-all shadow-2xs"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Subcategory Filter Pills (Horizontal Scroll Row) */}
                        {subCategoriesForCurrent.length > 0 && (
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                                <button
                                    type="button"
                                    onClick={() => setSelectedSubCategory(null)}
                                    className={`py-1.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 select-none ${!selectedSubCategory
                                        ? "bg-[#0052FF] text-white shadow-xs"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                >
                                    {t.all}
                                </button>

                                {subCategoriesForCurrent.map((subCat) => {
                                    const isSelected = selectedSubCategory?.toLowerCase() === subCat.toLowerCase()
                                    return (
                                        <button
                                            key={subCat}
                                            type="button"
                                            onClick={() => setSelectedSubCategory(isSelected ? null : subCat)}
                                            className={`py-1.5 px-4 rounded-full text-xs sm:text-sm transition-all cursor-pointer shrink-0 select-none ${isSelected
                                                ? "bg-[#0052FF] text-white shadow-xs font-bold"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
                                                }`}
                                        >
                                            {subCat}
                                        </button>
                                    )
                                })}
                            </div>
                        )}

                        {/* Products List (Exact clean list row design from reference image) */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-200 max-w-sm mx-auto shadow-2xs">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center mx-auto mb-2.5">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <h3 className="text-sm font-black text-[#0A2540] mb-0.5">{t.noProductsFound}</h3>
                                <p className="text-xs text-slate-500">
                                    {searchQuery || selectedSubCategory ? t.tryDifferentSearch : t.noProductsInCategory}
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white divide-y divide-slate-100 overflow-hidden">
                                {filteredProducts.map((product) => {
                                    const coverImg = product.images && product.images.length > 0 ? product.images[0] : ""
                                    const isFav = Boolean(favorites[product.id])
                                    const subtitleText = product.quantity || product.description || ""

                                    return (
                                        <div
                                            key={product.id}
                                            onClick={() => setSelectedProduct(product)}
                                            className="py-2.5 sm:py-3 px-1 sm:px-2 flex items-stretch justify-between gap-3 sm:gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer group select-none"
                                        >
                                            {/* Left: Product Image Box (Compact & Balanced Height) */}
                                            <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 self-stretch min-h-[80px] sm:min-h-[88px] shrink-0 rounded-2xl bg-slate-100 border border-slate-200/80 overflow-hidden shadow-2xs relative flex items-center justify-center">
                                                {coverImg ? (
                                                    <img
                                                        src={coverImg}
                                                        alt={product.name}
                                                        loading="eager"
                                                        decoding="async"
                                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200 [image-rendering:-webkit-optimize-contrast]"
                                                    />
                                                ) : (
                                                    <ShoppingBag className="w-8 h-8 text-slate-300 stroke-1" />
                                                )}
                                            </div>

                                            {/* Middle: Title, Subtitle, Price */}
                                            <div className="flex-1 min-w-0 flex flex-col justify-center pr-2 py-0.5">
                                                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0052FF] transition-colors leading-tight truncate">
                                                    {product.name}
                                                </h3>
                                                {subtitleText && (
                                                    <p className="text-xs sm:text-sm text-slate-400 font-medium truncate mt-1">
                                                        {subtitleText}
                                                    </p>
                                                )}
                                                {product.price && (
                                                    <p className="text-base sm:text-lg font-bold text-[#0052FF] mt-2">
                                                        {product.price.startsWith("€") || product.price.startsWith("$") ? product.price : `€ ${product.price}`}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Right: Heart Favorite Button */}
                                            <div className="flex items-center shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={(e) => toggleFavorite(product.id, e)}
                                                    className="p-2.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                                                    title={t.favorite}
                                                >
                                                    <Heart
                                                        className={`w-6 h-6 transition-colors ${isFav
                                                            ? "text-red-500 fill-red-500"
                                                            : "text-slate-400 stroke-1.5 hover:text-red-400"
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* ══════════════════════════════════════════════════════════════════
                   SCREEN 1: STORE OVERVIEW (Hero, Store Card, Categories Grid)
                   ══════════════════════════════════════════════════════════════════ */
                <div className="pb-20">
                    {/* ── 1. HERO STORE IMAGE BANNER WITH STORE NAME DIRECTLY ON BACKGROUND ── */}
                    <div className="w-full max-w-5xl mx-auto md:px-6 md:pt-4">
                        <div className="relative w-full h-52 sm:h-60 md:h-[360px] lg:h-[420px] xl:h-[460px] bg-slate-950 overflow-hidden md:rounded-3xl md:shadow-md flex items-center justify-center">
                            {/* Blurred Ambient Backdrop for seamless edge filling */}
                            <img
                                src={
                                    (shopImages && shopImages.length > 0
                                        ? shopImages[activeShopImgIdx >= shopImages.length ? 0 : activeShopImgIdx]
                                        : "") ||
                                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                                }
                                alt=""
                                aria-hidden="true"
                                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40 pointer-events-none"
                            />

                            {/* Main Store Image: Fits cleanly without cropping */}
                            <img
                                src={
                                    (shopImages && shopImages.length > 0
                                        ? shopImages[activeShopImgIdx >= shopImages.length ? 0 : activeShopImgIdx]
                                        : "") ||
                                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                                }
                                alt={businessName}
                                className="relative z-0 w-full h-full object-contain object-center transition-transform duration-500 cursor-pointer"
                                onClick={() => {
                                    if (shopImages && shopImages.length > 0) {
                                        setSelectedShopImageModal(shopImages[activeShopImgIdx >= shopImages.length ? 0 : activeShopImgIdx])
                                    }
                                }}
                            />



                            {/* Bottom Floating Badge: Verified Store (Bottom Right on Image in Green) */}
                            <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-3.5 md:bottom-4 md:right-4 z-10">
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded-full bg-emerald-600/95 backdrop-blur-md text-white border border-emerald-400/40 shadow-md">
                                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-2xs">
                                        <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5]" />
                                    </div>
                                    <span className="text-[10px] sm:text-[11px] md:text-xs font-black tracking-tight">{t.verifiedStore}</span>
                                </div>
                            </div>

                            {/* Next/Prev Navigation on Image (if multiple photos) */}
                            {shopImages.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setActiveShopImgIdx((prev) => (prev === 0 ? shopImages.length - 1 : prev - 1))
                                        }}
                                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 w-7.5 h-7.5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                                    >
                                        <ChevronLeft className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setActiveShopImgIdx((prev) => (prev === shopImages.length - 1 ? 0 : prev + 1))
                                        }}
                                        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 w-7.5 h-7.5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                                    >
                                        <ChevronRight className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ── 2. STORE ACTIONS & 3-COLUMN INFO CARD (Location | Hours | Phone) ── */}
                    <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-1 sm:pt-3 space-y-1.5 sm:space-y-2">
                        {/* Store Business Name directly below hero image */}
                        <div className="pt-0.5 pb-0 px-0.5">
                            <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-[#0A2540] tracking-tight leading-tight">
                                {businessName}
                            </h1>
                        </div>

                        {/* 3-Column Info Card */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 py-1.5 px-1.5 sm:pt-2.5 sm:pb-3 sm:px-3 grid grid-cols-3 divide-x divide-slate-100 relative">
                            {/* Col 1: Location */}
                            {fullAddress ? (
                                <a
                                    href={mapUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex flex-col items-center justify-center text-center px-1 sm:px-2 group hover:opacity-85 transition-opacity"
                                >
                                    <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-blue-50/90 text-[#0052FF] flex items-center justify-center mb-1">
                                        <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0052FF]" />
                                    </div>
                                    <p className="text-[11px] sm:text-xs font-extrabold text-[#0A2540] leading-tight line-clamp-1">
                                        {businessAddress || t.location}
                                    </p>
                                    {(postalCode || city) && (
                                        <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 line-clamp-1 mt-0.5">
                                            {[postalCode, city].filter(Boolean).join(" ")}
                                        </p>
                                    )}
                                </a>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 text-slate-400">
                                    <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-slate-50 flex items-center justify-center mb-1">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <p className="text-[11px] sm:text-xs font-bold text-slate-700">{t.location}</p>
                                </div>
                            )}

                            {/* Col 2: Opening Hours (Clickable for weekly dropdown) */}
                            <div
                                onClick={() => setShowHoursDropdown((prev) => !prev)}
                                className="flex flex-col items-center justify-center text-center px-1 sm:px-2 cursor-pointer group hover:opacity-85 transition-opacity"
                            >
                                <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-blue-50/90 text-[#0052FF] flex items-center justify-center mb-1">
                                    <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0052FF]" />
                                </div>

                                <p className="text-[11px] sm:text-xs font-extrabold text-[#0A2540] leading-tight">
                                    {todayStatus.isOpen ? "Mo – Sa" : t.closed}
                                </p>
                                <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5">
                                    {todayStatus.hoursText}
                                </p>
                            </div>

                            {/* Col 3: Phone */}
                            {businessPhone ? (
                                <a
                                    href={phoneHref}
                                    className="flex flex-col items-center justify-center text-center px-1 sm:px-2 group hover:opacity-85 transition-opacity"
                                >
                                    <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-blue-50/90 text-[#0052FF] flex items-center justify-center mb-1">
                                        <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0052FF]" />
                                    </div>
                                    <p className="text-[11px] sm:text-xs font-extrabold text-[#0A2540] leading-tight break-all line-clamp-2">
                                        {businessPhone}
                                    </p>
                                </a>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 text-slate-400">
                                    <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-slate-50 flex items-center justify-center mb-1">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <p className="text-[11px] sm:text-xs font-bold text-slate-700">{t.phone}</p>
                                </div>
                            )}

                            {/* Weekly Opening Hours Dropdown Menu */}
                            {showHoursDropdown && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowHoursDropdown(false)}
                                    />
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full sm:w-80 min-w-[280px] bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2.5 text-left">
                                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                            <span className="font-black text-xs text-[#0A2540] flex items-center gap-1.5">
                                                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0052FF]" />
                                                <span>{t.weeklyHours}</span>
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setShowHoursDropdown(false)}
                                                className="p-1 rounded-md text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <div className="space-y-1 text-xs">
                                            {openingHoursList.map((slot) => {
                                                const isOpen = slot.status === "open"
                                                const dayLabel =
                                                    (t.days as Record<string, string>)[slot.id] || (t.days as Record<string, string>)[slot.day] || slot.day

                                                const isToday =
                                                    slot.day.toLowerCase() === todayStatus.todayName?.toLowerCase() ||
                                                    slot.id.toLowerCase() ===
                                                    todayStatus.todayName?.substring(0, 3).toLowerCase()

                                                return (
                                                    <div
                                                        key={slot.id || slot.day}
                                                        className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors ${isToday
                                                            ? "bg-blue-50/90 font-black text-[#0052FF]"
                                                            : "text-slate-700 hover:bg-slate-50"
                                                            }`}
                                                    >
                                                        <span className="font-bold flex items-center gap-1.5">
                                                            {isToday && (
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
                                                            )}
                                                            {dayLabel}
                                                        </span>
                                                        <span
                                                            className={
                                                                isOpen
                                                                    ? isToday
                                                                        ? "font-black text-[#0052FF]"
                                                                        : "font-semibold text-slate-800"
                                                                    : "font-bold text-rose-500"
                                                            }
                                                        >
                                                            {isOpen ? `${slot.from} - ${slot.to}` : t.closed}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Actions & Share Strip: Cart on Left, Icons on Right, Space in Between */}
                        <div className="flex items-center justify-between gap-2 pt-0.5 sm:pt-1">
                            {/* Left: Cart / Favorites Button */}
                            <button
                                type="button"
                                onClick={() => setShowCartModal(true)}
                                className="h-7.5 sm:h-8 px-2.5 sm:px-3 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-[#0052FF] flex items-center gap-1.5 transition-all border border-blue-200/80 shadow-2xs active:scale-90 cursor-pointer shrink-0 select-none group"
                                title={t.cartTitle}
                            >
                                <div className="relative">
                                    <ShoppingCart className="w-3.5 h-3.5 text-[#0052FF] group-hover:scale-110 transition-transform" />
                                    {favoriteProducts.length > 0 && (
                                        <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                                            {favoriteProducts.length}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[11px] sm:text-xs font-black">{t.cart}</span>

                            </button>

                            {/* Right: Direction & Social Actions */}
                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 overflow-x-auto no-scrollbar py-0.5">
                                {/* Direction / Maps Icon */}
                                {fullAddress && (
                                    <a
                                        href={mapUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-[#0052FF] flex items-center justify-center transition-all border border-blue-200/80 shadow-2xs active:scale-90 cursor-pointer shrink-0"
                                        title={t.directions}
                                    >
                                        <Navigation className="w-3.5 h-3.5 text-[#0052FF]" />
                                    </a>
                                )}
                                {websiteHref && (
                                    <a
                                        href={websiteHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-[#0052FF] flex items-center justify-center transition-all border border-blue-200/80 shadow-2xs active:scale-90 cursor-pointer shrink-0"
                                        title={`Website: ${websiteUrl}`}
                                    >
                                        <Globe className="w-3.5 h-3.5 text-[#0052FF]" />
                                    </a>
                                )}
                                {instagramHref && (
                                    <a
                                        href={instagramHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 flex items-center justify-center transition-all border border-pink-200/80 shadow-2xs active:scale-90 cursor-pointer shrink-0"
                                        title={`Instagram: ${instagram}`}
                                    >
                                        <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={handleShare}
                                    className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-[#0052FF] flex items-center justify-center transition-all border border-blue-200/80 shadow-2xs active:scale-90 cursor-pointer shrink-0"
                                    title={t.share}
                                >
                                    <Share2 className="w-3.5 h-3.5 text-[#0052FF]" />
                                </button>
                                {facebookHref && (
                                    <a
                                        href={facebookHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center transition-all border border-blue-200 shadow-2xs active:scale-90 cursor-pointer shrink-0"
                                        title="Facebook"
                                    >
                                        <FacebookIcon className="w-3.5 h-3.5 text-blue-600" />
                                    </a>
                                )}
                                {youtubeHref && (
                                    <a
                                        href={youtubeHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center transition-all border border-red-200 shadow-2xs active:scale-90 cursor-pointer shrink-0"
                                        title="YouTube"
                                    >
                                        <YouTubeIcon className="w-3.5 h-3.5 text-red-600" />
                                    </a>
                                )}
                                {linkedinHref && (
                                    <a
                                        href={linkedinHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 flex items-center justify-center transition-all border border-sky-200 shadow-2xs active:scale-90 cursor-pointer shrink-0"
                                        title="LinkedIn"
                                    >
                                        <LinkedInIcon className="w-3.5 h-3.5 text-sky-600" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── MAIN CONTENT CONTAINER (Unsere Kategorien) ── */}
                    <main id="catalog-content" className="max-w-5xl mx-auto px-3 sm:px-6 pt-0.5 sm:pt-3 space-y-2.5 sm:space-y-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-8 h-8 border-3 border-[#0052FF] border-t-transparent rounded-full animate-spin mb-2.5" />
                                <p className="text-xs font-bold text-slate-500">Loading...</p>
                            </div>
                        ) : (
                            <div className="space-y-2 sm:space-y-3.5 animate-in fade-in duration-200">
                                {/* Section Heading: [Unsere Kategorien] */}
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#0A2540] tracking-tight">
                                        {t.ourCategories}
                                    </h2>
                                </div>

                                {/* Category Cards 2-Column Grid (Matching reference UI) */}
                                {categoryMetadata.length === 0 ? (
                                    <div className="text-center py-14 px-4 bg-slate-50/80 rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center mx-auto mb-2.5">
                                            <ShoppingBag className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-sm font-bold text-[#0A2540] mb-0.5">
                                            No categories added yet
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            Once the merchant adds products to the database, categories will appear here.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                                        {categoryMetadata.map((cat) => {
                                            const coverImg = cat.images && cat.images.length > 0 ? cat.images[0] : ""

                                            return (
                                                <div
                                                    key={cat.name}
                                                    onClick={() => {
                                                        setSelectedCategory(cat.name)
                                                        setSelectedSubCategory(null)
                                                        setSearchQuery("")
                                                        setShowCategorySearch(false)
                                                    }}
                                                    className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col active:scale-[0.98] select-none"
                                                >
                                                    {/* Image (Top of card) */}
                                                    <div className="relative w-full h-28 sm:h-36 md:h-44 bg-slate-100 overflow-hidden flex items-center justify-center">
                                                        {coverImg ? (
                                                            <img
                                                                src={coverImg}
                                                                alt={cat.name}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center text-slate-300 group-hover:text-slate-400">
                                                                <ShoppingBag className="w-10 h-10 stroke-1" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Content Footer: Name on Left, ChevronRight on Right */}
                                                    <div className="p-3 sm:p-3.5 flex items-center justify-between gap-1.5 bg-white">
                                                        <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-[#0A2540] group-hover:text-[#0052FF] transition-colors truncate">
                                                            {cat.name}
                                                        </h3>
                                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            )}

            {/* ── MODAL: PRODUCT PHOTO GALLERY & FULL DETAILS ── */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 p-5 max-h-[90vh] overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {selectedProduct.images && selectedProduct.images.length > 0 && (
                            <div className="space-y-2">
                                <div className="w-full h-60 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center p-2">
                                    <img
                                        src={selectedProduct.images[0]}
                                        alt={selectedProduct.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                {selectedProduct.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-1.5">
                                        {selectedProduct.images.slice(1).map((imgUrl, idx) => (
                                            <div
                                                key={idx}
                                                className="w-full h-16 bg-slate-100 rounded-xl overflow-hidden border border-slate-100"
                                            >
                                                <img
                                                    src={imgUrl}
                                                    alt={`Photo ${idx + 2}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="space-y-2">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    {selectedProduct.categoryName && (
                                        <span className="text-[10px] font-black text-[#0052FF] uppercase tracking-wider">
                                            {selectedProduct.categoryName}
                                        </span>
                                    )}
                                    <h2 className="text-lg font-black text-[#0A2540] leading-snug">
                                        {selectedProduct.name}
                                    </h2>
                                </div>
                                {selectedProduct.price ? (
                                    <span className="text-lg font-black text-[#0052FF] bg-blue-50 px-2.5 py-0.5 rounded-xl">
                                        {selectedProduct.price}
                                    </span>
                                ) : null}
                            </div>

                            {selectedProduct.quantity && (
                                <p className="text-xs text-slate-600 font-bold">
                                    {t.portionSize} <span className="text-slate-900">{selectedProduct.quantity}</span>
                                </p>
                            )}

                            {selectedProduct.description && (
                                <div
                                    className="text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-2.5"
                                    dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                                />
                            )}
                        </div>

                        <div className="pt-1">
                            <button
                                type="button"
                                onClick={() => setSelectedProduct(null)}
                                className="w-full py-3 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white text-xs font-black transition-colors cursor-pointer"
                            >
                                {t.backToMenu}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── MODAL: FULL-SCREEN SHOP PHOTO VIEWER ── */}
            {selectedShopImageModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedShopImageModal(null)}
                >
                    <div
                        className="relative max-w-4xl w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-3 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setSelectedShopImageModal(null)}
                            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Main Image */}
                        <div className="w-full max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden bg-black">
                            <img
                                src={selectedShopImageModal}
                                alt={businessName}
                                className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-xl sm:rounded-2xl"
                            />
                        </div>

                        {/* Bottom Navigation & Controls */}
                        {shopImages.length > 1 && (
                            <div className="flex items-center justify-between px-3 pt-3 pb-1 text-white">
                                <span className="text-xs font-bold text-slate-300">
                                    {businessName} ({shopImages.indexOf(selectedShopImageModal) + 1} / {shopImages.length})
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const curr = shopImages.indexOf(selectedShopImageModal)
                                            const prev = curr <= 0 ? shopImages.length - 1 : curr - 1
                                            setSelectedShopImageModal(shopImages[prev])
                                        }}
                                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                                        title="Previous photo"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const curr = shopImages.indexOf(selectedShopImageModal)
                                            const next = curr >= shopImages.length - 1 ? 0 : curr + 1
                                            setSelectedShopImageModal(shopImages[next])
                                        }}
                                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                                        title="Next photo"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── MODAL: CART & FAVORITES (Items selected with Heart icon) ── */}
            {showCartModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
                    onClick={() => setShowCartModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center">
                                    <ShoppingCart className="w-5 h-5 text-[#0052FF]" />
                                </div>
                                <div>
                                    <h2 className="text-base sm:text-lg font-black text-[#0A2540]">
                                        {t.cartTitle}
                                    </h2>
                                    <p className="text-xs text-slate-500 font-medium">
                                        {t.itemsInCart(favoriteProducts.length)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {favoriteProducts.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setFavorites({})}
                                        className="text-xs text-rose-500 hover:text-rose-700 font-bold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                    >
                                        {t.clearAll}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowCartModal(false)}
                                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body: Favorited Products in Cart */}
                        <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100 space-y-2">
                            {favoriteProducts.length === 0 ? (
                                <div className="text-center py-12 px-4 space-y-3">
                                    <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                                        <Heart className="w-7 h-7 text-rose-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-sm sm:text-base font-bold text-slate-800">
                                            {t.emptyCart}
                                        </h3>
                                        <p className="text-xs text-slate-500 max-w-xs mx-auto">
                                            {t.emptyCartDesc}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                favoriteProducts.map((product) => {
                                    const coverImg = product.images && product.images.length > 0 ? product.images[0] : ""
                                    const subtitleText = product.quantity || product.description || ""

                                    return (
                                        <div
                                            key={product.id}
                                            className="pt-2 first:pt-0 flex items-center justify-between gap-3"
                                        >
                                            {/* Left: Product Image */}
                                            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                                                {coverImg ? (
                                                    <img
                                                        src={coverImg}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <ShoppingBag className="w-6 h-6 text-slate-300 stroke-1" />
                                                )}
                                            </div>

                                            {/* Middle: Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 truncate">
                                                    {product.name}
                                                </h4>
                                                {subtitleText && (
                                                    <p className="text-xs text-slate-400 truncate mt-0.5">
                                                        {subtitleText}
                                                    </p>
                                                )}
                                                {product.price && (
                                                    <p className="text-sm font-extrabold text-[#0052FF] mt-1">
                                                        {product.price.startsWith("€") || product.price.startsWith("$") ? product.price : `€ ${product.price}`}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Right: Remove Heart */}
                                            <button
                                                type="button"
                                                onClick={() => toggleFavorite(product.id)}
                                                className="p-2 rounded-full hover:bg-rose-50 text-red-500 transition-colors cursor-pointer shrink-0"
                                                title="Remove from favorites"
                                            >
                                                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                                            </button>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {/* Modal Footer: Total & Actions */}
                        {favoriteProducts.length > 0 && (
                            <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3">
                                {cartTotalPrice && (
                                    <div className="flex items-center justify-between text-sm font-bold text-slate-900 px-1">
                                        <span>{t.totalAmount}</span>
                                        <span className="text-base sm:text-lg font-black text-[#0052FF]">
                                            {cartTotalPrice}
                                        </span>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowCartModal(false)}
                                    className="w-full py-3 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer"
                                >
                                    {t.continueShopping}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
