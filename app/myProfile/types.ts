
// ── Types ──
export interface OpeningHourItem {
    id: string
    day: string
    dayDe?: string
    status: "open" | "closed"
    from: string
    to: string
}

export interface SocialLinks {
    instagram?: string
    facebook?: string
    youtube?: string
    linkedin?: string
}

export interface ShopProfile {
    id?: string
    businessName: string
    businessAddress: string
    postalCode: string
    city: string
    country?: string
    businessPhone: string
    landlineNo?: string
    businessEmail: string
    socialMedia?: SocialLinks
    instagram?: string
    facebook?: string
    youtube?: string
    linkedin?: string
    websiteUrl: string
    openingHoursList?: OpeningHourItem[]
    openingHours?: string
    status: "approved" | "pending" | "active" | "inactive" | string
    plan?: "free_trial" | "pro" | "enterprise" | string
    subscriptionStatus?: "trial" | "active" | "expired" | "cancelled" | string
    trialStartDate?: any
    trialEndsAt?: any
    image?: string[]
    userId?: string
    userEmail?: string
    createdAt?: any
    updatedAt?: any
}

export interface ProductCategory {
    id: string
    name: string
    description?: string
    userId?: string
    createdAt?: string
}

export interface ProductItem {
    id: string
    name: string
    price: string
    quantity?: string
    description?: string
    images?: string[]
    categoryName?: string
    userId?: string
    userEmail?: string
    createdAt?: string
    updatedAt?: string
}

export interface CategoryFormData {
    categoryName: string
    productName: string
    price: string
    quantity: string
    images?: string[]
}

export interface ProductFormData {
    categoryName: string
    name: string
    price: string
    quantity: string
    images?: string[]
}
export const INITIAL_OPENING_HOURS: OpeningHourItem[] = [
    { id: "mon", day: "Monday", status: "open", from: "09:00", to: "20:00" },
    { id: "tue", day: "Tuesday", status: "open", from: "09:00", to: "20:00" },
    { id: "wed", day: "Wednesday", status: "open", from: "09:00", to: "20:00" },
    { id: "thu", day: "Thursday", status: "open", from: "09:00", to: "20:00" },
    { id: "fri", day: "Friday", status: "open", from: "09:00", to: "20:00" },
    { id: "sat", day: "Saturday", status: "open", from: "09:00", to: "20:00" },
    { id: "sun", day: "Sunday", status: "closed", from: "--", to: "--" },
]

export const TIME_OPTIONS = [
    "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
    "22:00", "22:30", "23:00", "23:30", "00:00"
]

export const DEFAULT_CATEGORIES: ProductCategory[] = [
    { id: "cat-all", name: "All Products" }
]

export const LOCAL_STORAGE_SHOP_KEY = "diiconnect_kiosk_shop_profile"
export const LOCAL_STORAGE_PRODUCTS_KEY = "diiconnect_kiosk_products"
export const LOCAL_STORAGE_CATEGORIES_KEY = "diiconnect_kiosk_categories"

// ── Helpers ──
export const getOrCreateGuestUserId = (): string => {
    if (typeof window === "undefined") return "guest_user"
    try {
        let guestId = localStorage.getItem("diiconnect_guest_user_id")
        if (!guestId) {
            guestId = "guest_" + Math.random().toString(36).substring(2, 11)
            localStorage.setItem("diiconnect_guest_user_id", guestId)
        }
        return guestId
    } catch {
        return "guest_user"
    }
}

export const getLocalShopProfile = (): ShopProfile | null => {
    if (typeof window === "undefined") return null
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_SHOP_KEY)
        if (saved) return JSON.parse(saved)
    } catch { }
    return null
}

export const saveLocalShopProfile = (profile: ShopProfile | null) => {
    if (typeof window === "undefined") return
    try {
        if (profile) {
            localStorage.setItem(LOCAL_STORAGE_SHOP_KEY, JSON.stringify(profile))
        } else {
            localStorage.removeItem(LOCAL_STORAGE_SHOP_KEY)
        }
    } catch { }
}

export const getLocalCategories = (): ProductCategory[] => {
    if (typeof window === "undefined") return DEFAULT_CATEGORIES
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY)
        if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed) && parsed.length > 0) {
                const uniqueMap = new Map<string, ProductCategory>()
                parsed.forEach((c: ProductCategory) => {
                    if (c && c.name && c.name.trim()) {
                        const norm = c.name.trim().toLowerCase()
                        if (
                            !uniqueMap.has(norm) &&
                            !["cat-specials", "cat-beverages", "cat-food"].includes(c.id) &&
                            !["all products", "all"].includes(norm)
                        ) {
                            uniqueMap.set(norm, {
                                id: "cat-" + norm.replace(/[^a-z0-9]/g, "-"),
                                name: c.name.trim()
                            })
                        }
                    }
                })
                const cleaned = Array.from(uniqueMap.values())
                return cleaned.length > 0 ? [DEFAULT_CATEGORIES[0], ...cleaned] : DEFAULT_CATEGORIES
            }
        }
    } catch { }
    return DEFAULT_CATEGORIES
}

export const saveLocalCategories = (cats: ProductCategory[]) => {
    if (typeof window === "undefined") return
    try {
        const uniqueMap = new Map<string, ProductCategory>()
        cats.forEach((c) => {
            if (c && c.name && c.name.trim()) {
                const norm = c.name.trim().toLowerCase()
                if (!uniqueMap.has(norm)) {
                    uniqueMap.set(norm, {
                        ...c,
                        id: "cat-" + norm.replace(/[^a-z0-9]/g, "-"),
                        name: c.name.trim()
                    })
                }
            }
        })
        localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(Array.from(uniqueMap.values())))
    } catch { }
}

export const getLocalProducts = (): ProductItem[] => {
    if (typeof window === "undefined") return []
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY)
        if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed)) {
                const uniqueMap = new Map<string, ProductItem>()
                parsed.forEach((p: ProductItem) => {
                    if (p && p.id) uniqueMap.set(p.id, p)
                })
                return Array.from(uniqueMap.values())
            }
        }
    } catch { }
    return []
}

export const saveLocalProducts = (prods: ProductItem[]) => {
    if (typeof window === "undefined") return
    try {
        const uniqueMap = new Map<string, ProductItem>()
        prods.forEach((p) => {
            if (p && p.id) uniqueMap.set(p.id, p)
        })
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(Array.from(uniqueMap.values())))
    } catch { }
}

export const formatFirestoreTimestamp = (val: any): string => {
    if (!val) return new Date().toISOString()
    if (typeof val === "object" && typeof val.toDate === "function") {
        return val.toDate().toISOString()
    }
    if (typeof val === "object" && val.seconds !== undefined) {
        return new Date(val.seconds * 1000).toISOString()
    }
    if (typeof val === "string") return val
    if (typeof val === "number") return new Date(val).toISOString()
    if (val instanceof Date) return val.toISOString()
    return new Date().toISOString()
}

export const sanitizeHtml = (rawHtml: string): string => {
    if (!rawHtml) return ""
    return rawHtml
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/on\w+="[^"]*"/gi, "")
        .replace(/on\w+='[^']*'/gi, "")
        .replace(/javascript:[^"']*/gi, "")
}

export const compressImageFile = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.75): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string
            const img = new Image()
            img.src = dataUrl
            img.onload = () => {
                let width = img.width
                let height = img.height

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width)
                        width = maxWidth
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height)
                        height = maxHeight
                    }
                }

                const canvas = document.createElement("canvas")
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext("2d")
                if (!ctx) {
                    resolve(dataUrl)
                    return
                }

                ctx.drawImage(img, 0, 0, width, height)
                resolve(canvas.toDataURL("image/jpeg", quality))
            }
            img.onerror = () => resolve(dataUrl)
        }
        reader.onerror = (err) => reject(err)
    })
}

// ── Texts (English) ──
export const TEXTS = {
    tagTitle: "Interactive Digital profile",
    welcomeTitle: "Create Store Profile",
    welcomeSub: "Set up your shop profile with business address, phone, email, and opening hours. Then organize categories, upload products with HTML formatting, and showcase your digital menu.",
    createProfileBtn: "Create Your Profile",
    title: "Create Your Profile",
    editTitle: "Edit Shop / Store Profile",
    subtitle: "Fill in your business details. After saving, you will be able to add categories and products.",
    backWelcome: "Back to Welcome",
    backCatalog: "Back to Catalog",
    sec1: "1. Business Information",
    businessName: "Business Name *",
    businessNamePlaceholder: "e.g. Gourmet Bistro & Café",
    storeNameInUse: "store name is already in use please change the store name",
    streetNumber: "Street & House Number *",
    streetNumberPlaceholder: "e.g. Bahnhofstraße 42",
    postalCode: "Postal Code *",
    postalCodePlaceholder: "e.g. 10115",
    city: "City *",
    cityPlaceholder: "e.g. Berlin",
    country: "Country *",
    countryPlaceholder: "e.g. India",
    phone: "Business Phone Number *",
    phonePlaceholder: "e.g. +49 30 12345678",
    email: "Business Email *",
    emailPlaceholder: "e.g. info@gourmetbistro.de",
    socialMedia: "Social Media (Optional)",
    website: "Website URL",
    websitePlaceholder: "e.g. https://www.gourmetbistro.de",
    sec2: "2. Opening Hours *",
    day: "Day",
    status: "Status",
    from: "From",
    to: "To",
    actions: "Actions",
    open: "Open",
    closed: "Closed",
    addOpeningHours: "+ Add Opening Hours",
    splitHoursNotice: "You can set split hours (e.g. 09:00-12:00, 14:00-18:00) if needed.",
    sec3: "3. Store Logo / Image (Optional)",
    uploadLogo: "Upload Logo",
    uploadSub: "JPG, PNG, WEBP - Max. 5 MB",
    saveContinue: "Save & Continue ➔",
    saving: "Saving Profile...",
    desktopView: "Desktop View",
    mobileView: "Mobile View"
}
export type ProfileTexts = typeof TEXTS

// ── Timestamp Parser Helper ──
export const parseTimestampToMs = (val: any): number => {
    if (!val) return 0
    if (typeof val === "object" && typeof val.toMillis === "function") {
        return val.toMillis()
    }
    if (typeof val === "object" && typeof val.toDate === "function") {
        return val.toDate().getTime()
    }
    if (typeof val === "object" && typeof val.seconds === "number") {
        return val.seconds * 1000
    }
    if (val instanceof Date) {
        return val.getTime()
    }
    if (typeof val === "number") {
        return val
    }
    if (typeof val === "string") {
        const parsed = new Date(val).getTime()
        return isNaN(parsed) ? 0 : parsed
    }
    return 0
}

// ── 14-Day Free Trial Helper ──
export interface TrialStatus {
    isActive: boolean
    isTrial: boolean
    isPro: boolean
    isExpired: boolean
    daysLeft: number
    hoursLeft: number
    formattedExpiry: string
}

export const checkTrialStatus = (shopProfile: ShopProfile | null): TrialStatus => {
    if (!shopProfile) {
        return {
            isActive: true,
            isTrial: true,
            isPro: false,
            isExpired: false,
            daysLeft: 14,
            hoursLeft: 336,
            formattedExpiry: ""
        }
    }

    // Pro / Enterprise / Active paid subscriptions
    const isPaidPlan =
        shopProfile.plan === "pro" ||
        shopProfile.plan === "enterprise" ||
        (shopProfile.subscriptionStatus === "active" && shopProfile.plan !== "free_trial")

    if (isPaidPlan) {
        return {
            isActive: true,
            isTrial: false,
            isPro: true,
            isExpired: false,
            daysLeft: 999,
            hoursLeft: 9999,
            formattedExpiry: "Unlimited Pro"
        }
    }

    // Explicitly marked expired in database
    if (shopProfile.subscriptionStatus === "expired") {
        return {
            isActive: false,
            isTrial: true,
            isPro: false,
            isExpired: true,
            daysLeft: 0,
            hoursLeft: 0,
            formattedExpiry: "Expired"
        }
    }

    // Trial Calculation (14 days = 14 * 24 * 60 * 60 * 1000 ms)
    const TRIAL_DURATION_MS = 14 * 24 * 60 * 60 * 1000
    const now = Date.now()

    let expiryTimestamp = 0

    // 1. Check trialEndsAt
    if (shopProfile.trialEndsAt) {
        expiryTimestamp = parseTimestampToMs(shopProfile.trialEndsAt)
    }

    // 2. Fallback to createdAt + 14 days
    if (!expiryTimestamp && shopProfile.createdAt) {
        const createdMs = parseTimestampToMs(shopProfile.createdAt)
        if (createdMs > 0) {
            expiryTimestamp = createdMs + TRIAL_DURATION_MS
        }
    }

    // 3. Fallback to trialStartDate + 14 days
    if (!expiryTimestamp && shopProfile.trialStartDate) {
        const startMs = parseTimestampToMs(shopProfile.trialStartDate)
        if (startMs > 0) {
            expiryTimestamp = startMs + TRIAL_DURATION_MS
        }
    }

    // 4. Default fallback: 14 days from now
    if (!expiryTimestamp) {
        expiryTimestamp = now + TRIAL_DURATION_MS
    }

    const diffMs = expiryTimestamp - now

    if (diffMs <= 0) {
        return {
            isActive: false,
            isTrial: true,
            isPro: false,
            isExpired: true,
            daysLeft: 0,
            hoursLeft: 0,
            formattedExpiry: new Date(expiryTimestamp).toLocaleDateString()
        }
    }

    const daysLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
    const hoursLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)))

    return {
        isActive: true,
        isTrial: true,
        isPro: false,
        isExpired: false,
        daysLeft,
        hoursLeft,
        formattedExpiry: new Date(expiryTimestamp).toLocaleDateString()
    }
}