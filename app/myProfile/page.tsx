
"use client"

import React, { useState, useEffect } from "react"

import { useAuth } from "@/hooks/use-auth"
import { db } from "@/lib/firebase"
import {
    collection,
    addDoc,
    doc,
    setDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from "firebase/firestore"
import { toast } from "sonner"
import {
    OpeningHourItem,
    ProductCategory,
    ProductItem,
    ShopProfile,
    SocialLinks,
    CategoryFormData,
    ProductFormData,
    INITIAL_OPENING_HOURS,
    DEFAULT_CATEGORIES,
    TEXTS,
    getOrCreateGuestUserId,
    getLocalShopProfile,
    saveLocalShopProfile,
    getLocalCategories,
    saveLocalCategories,
    getLocalProducts,
    saveLocalProducts,
    compressImageFile,
    formatFirestoreTimestamp
} from "./types"
import { WelcomeScreen } from "./welcome_screen"
import { ContactInfoForm } from "./contact_info"
import { ProductCatalogView } from "./product"

export default function KioskTemplatePage() {
    const { user } = useAuth()

    const t = TEXTS

    // ── View Mode: "welcome" | "create-profile" | "catalog" ──
    const [viewMode, setViewMode] = useState<"welcome" | "create-profile" | "catalog">("welcome")

    // ── Shop Profile State ──
    const [shopProfile, setShopProfile] = useState<ShopProfile | null>(null)
    const [, setIsProfileLoading] = useState(true)
    const [isSavingProfile, setIsSavingProfile] = useState(false)

    // Form inputs state
    const [businessName, setBusinessName] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("India")
    const [businessPhone, setBusinessPhone] = useState("")
    const [landlineNo, setLandlineNo] = useState("")
    const [businessEmail, setBusinessEmail] = useState("")
    const [websiteUrl, setWebsiteUrl] = useState("")
    const [image, setImage] = useState<string[]>([])

    // Social Media Handles
    const [activeSocialTab, setActiveSocialTab] = useState<string | null>(null)
    const [socialMedia, setSocialMedia] = useState<SocialLinks>({
        instagram: " ",
        facebook: "",
        youtube: "",
        linkedin: ""
    })

    // Opening Hours Table State
    const [openingHours, setOpeningHours] = useState<OpeningHourItem[]>(INITIAL_OPENING_HOURS)

    // ── Categories & Products State ──
    const [categories, setCategories] = useState<ProductCategory[]>(DEFAULT_CATEGORIES)
    const [activeCategoryTab, setActiveCategoryTab] = useState<string>("all")
    const [products, setProducts] = useState<ProductItem[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoadingProducts, setIsLoadingProducts] = useState(true)

    // Category Modal State
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [isSavingCategory, setIsSavingCategory] = useState(false)
    const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
        categoryName: "",
        productName: "",
        price: "",
        quantity: "",
        images: []
    })

    // Product Modal State
    const [showProductModal, setShowProductModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
    const [isSavingProduct, setIsSavingProduct] = useState(false)
    const [productFormData, setProductFormData] = useState<ProductFormData>({
        categoryName: "",
        name: "",
        price: "",
        quantity: "",
        images: []
    })

    // Upgrade Plan Modal
    const [showUpgradeModal, setShowUpgradeModal] = useState(false)

    // Helper to reset all form fields to empty state
    const resetFormFields = () => {
        setBusinessName("")
        setBusinessAddress("")
        setPostalCode("")
        setCity("")
        setCountry("India")
        setBusinessPhone("")
        setLandlineNo("")
        setBusinessEmail("")
        setWebsiteUrl("")
        setImage([])
        setSocialMedia({
            instagram: "",
            facebook: "",
            youtube: "",
            linkedin: ""
        })
        setOpeningHours(INITIAL_OPENING_HOURS)
    }

    // Helper to populate form fields from profile
    const populateFormFromProfile = (p: ShopProfile) => {
        setBusinessName(p.businessName || "")
        setBusinessAddress(p.businessAddress || "")
        setPostalCode(p.postalCode || "")
        setCity(p.city || "")
        setCountry(p.country || "India")
        setBusinessPhone(p.businessPhone || "")
        setLandlineNo(p.landlineNo || "")
        setBusinessEmail(p.businessEmail || "")
        setWebsiteUrl(p.websiteUrl || "")
        setImage(p.image && p.image.length > 0 ? p.image : ((p as any).images && (p as any).images.length > 0 ? (p as any).images : []))

        if (p.socialMedia) {
            setSocialMedia({
                instagram: p.socialMedia.instagram || "",
                facebook: p.socialMedia.facebook || "",
                youtube: p.socialMedia.youtube || "",
                linkedin: p.socialMedia.linkedin || ""
            })
        } else if (p.instagram || p.facebook || p.youtube || p.linkedin) {
            setSocialMedia({
                instagram: p.instagram || "",
                facebook: p.facebook || "",
                youtube: p.youtube || "",
                linkedin: p.linkedin || ""
            })
        }
        if (p.openingHoursList && p.openingHoursList.length > 0) {
            setOpeningHours(p.openingHoursList)
        }
    }

    // ── 1. Fetch & Sync Shop Profile from Firestore collection "business-shop-profile" ──
    useEffect(() => {
        let isMounted = true
        let unsubscribe: (() => void) | undefined

        // Load local cache first for instant initial render
        const cached = getLocalShopProfile()
        if (cached) {
            setShopProfile(cached)
            populateFormFromProfile(cached)
            setViewMode("catalog")
        }

        try {
            const currentUserId = user?.uid || getOrCreateGuestUserId()
            const profileCol = collection(db, "business-shop-profile")

            unsubscribe = onSnapshot(
                profileCol,
                (snapshot) => {
                    if (!isMounted) return
                    let matchedProfile: ShopProfile | null = null

                    snapshot.forEach((docSnap) => {
                        const data = docSnap.data()
                        if (user?.uid && data.userId === user.uid) {
                            matchedProfile = {
                                id: docSnap.id,
                                ...(data as ShopProfile),
                                status: data.status || "approved"
                            }
                        } else if (!matchedProfile && data.userId === currentUserId) {
                            matchedProfile = {
                                id: docSnap.id,
                                ...(data as ShopProfile),
                                status: data.status || "approved"
                            }
                        }
                    })

                    if (matchedProfile) {
                        setShopProfile(matchedProfile)
                        populateFormFromProfile(matchedProfile)
                        saveLocalShopProfile(matchedProfile)
                        setViewMode("catalog")
                    } else {
                        // Profile was deleted or not found in database: clear cache & reset form
                        setShopProfile(null)
                        saveLocalShopProfile(null)
                        resetFormFields()
                        setViewMode("welcome")
                    }
                    setIsProfileLoading(false)
                },
                (err) => {
                    console.warn("Firestore 'business-shop-profile' access, using local fallback:", err)
                    if (isMounted) {
                        const local = getLocalShopProfile()
                        if (local) {
                            setShopProfile(local)
                            populateFormFromProfile(local)
                            setViewMode("catalog")
                        } else {
                            setViewMode("welcome")
                        }
                        setIsProfileLoading(false)
                    }
                }
            )
        } catch (error) {
            console.warn("Error reading 'business-shop-profile':", error)
            if (isMounted) {
                const local = getLocalShopProfile()
                if (local) {
                    setShopProfile(local)
                    populateFormFromProfile(local)
                    setViewMode("catalog")
                } else {
                    setViewMode("welcome")
                }
                setIsProfileLoading(false)
            }
        }

        return () => {
            isMounted = false
            if (unsubscribe) unsubscribe()
        }
    }, [user])

    // ── 2. Fetch & Sync Products & Derived Categories from Firestore ──
    useEffect(() => {
        let isMounted = true
        let unsubProds: (() => void) | undefined

        const localCats = getLocalCategories()
        const localProds = getLocalProducts()
        if (localCats.length > 0) setCategories(localCats)
        if (localProds.length > 0) setProducts(localProds)

        try {
            const prodsCol = collection(db, "shop-products")
            unsubProds = onSnapshot(
                prodsCol,
                (snapshot) => {
                    if (!isMounted) return
                    const uniqueProdsMap = new Map<string, ProductItem>()

                    snapshot.forEach((docSnap) => {
                        const data = docSnap.data()
                        let imgArray: string[] = []
                        if (Array.isArray(data.images) && data.images.length > 0) {
                            imgArray = data.images.filter(Boolean)
                        } else if (data.image) {
                            imgArray = [data.image]
                        }

                        uniqueProdsMap.set(docSnap.id, {
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
                    })

                    const fetchedProds = Array.from(uniqueProdsMap.values())
                    fetchedProds.sort((a, b) => {
                        const timeA = a.createdAt ? new Date(formatFirestoreTimestamp(a.createdAt)).getTime() : 0
                        const timeB = b.createdAt ? new Date(formatFirestoreTimestamp(b.createdAt)).getTime() : 0
                        return timeB - timeA
                    })

                    setProducts(fetchedProds)
                    // Derive categories dynamically from products collection + defaults
                    const uniqueCatsMap = new Map<string, ProductCategory>()
                    DEFAULT_CATEGORIES.forEach((c) => uniqueCatsMap.set(c.name.trim().toLowerCase(), c))
                    getLocalCategories().forEach((c) => {
                        if (c && c.name && c.name.trim()) {
                            uniqueCatsMap.set(c.name.trim().toLowerCase(), c)
                        }
                    })

                    fetchedProds.forEach((p) => {
                        if (
                            p.categoryName &&
                            p.categoryName.trim() !== "" &&
                            !["general", "all products", "all", "cat-all", "cat-general"].includes(
                                p.categoryName.toLowerCase().trim()
                            )
                        ) {
                            const trimmedName = p.categoryName.trim()
                            const normKey = trimmedName.toLowerCase()
                            if (!uniqueCatsMap.has(normKey)) {
                                const cId = "cat-" + normKey.replace(/[^a-z0-9]/g, "-")
                                uniqueCatsMap.set(normKey, {
                                    id: cId,
                                    name: trimmedName
                                })
                            }
                        }
                    })

                    const derivedCats = Array.from(uniqueCatsMap.values())
                    setCategories(derivedCats)
                    saveLocalCategories(derivedCats)

                    setIsLoadingProducts(false)
                },
                (err) => {
                    console.warn("Products read error:", err)
                    if (isMounted) {
                        setProducts(getLocalProducts())
                        setIsLoadingProducts(false)
                    }
                }
            )
        } catch (e) {
            console.warn("Firestore error:", e)
            if (isMounted) setIsLoadingProducts(false)
        }

        return () => {
            isMounted = false
            if (unsubProds) unsubProds()
        }
    }, [])

    // ── Opening Hours Handlers ──
    const handleToggleStatus = (id: string) => {
        setOpeningHours((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newStatus = item.status === "open" ? "closed" : "open"
                    return {
                        ...item,
                        status: newStatus,
                        from: newStatus === "open" ? (item.from !== "--" ? item.from : "09:00") : "--",
                        to: newStatus === "open" ? (item.to !== "--" ? item.to : "20:00") : "--"
                    }
                }
                return item
            })
        )
    }

    const handleChangeTime = (id: string, field: "from" | "to", value: string) => {
        setOpeningHours((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        )
    }

    const handleDeleteOpeningHour = (id: string) => {
        setOpeningHours((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, status: "closed", from: "--", to: "--" }
                }
                return item
            })
        )
    }

    const handleAddOpeningHourSlot = () => {
        const newSlotId = "slot-" + Date.now()
        const newSlot: OpeningHourItem = {
            id: newSlotId,
            day: "Special Slot / Shift",
            status: "open",
            from: "12:00",
            to: "16:00"
        }
        setOpeningHours((prev) => [...prev, newSlot])
        toast.info("New opening hours row added")
    }

    // ── Save / Update Shop Profile to Firestore "business-shop-profile" ──
    const handleSaveBusinessInfo = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!businessName.trim()) {
            toast.error("Please enter Business Name")
            return
        }
        if (!businessAddress.trim()) {
            toast.error("Please enter Street & House Number")
            return
        }
        if (!postalCode.trim()) {
            toast.error("Please enter Postal Code")
            return
        }
        if (!city.trim()) {
            toast.error("Please enter City")
            return
        }
        if (!businessPhone.trim()) {
            toast.error("Please enter Business Phone Number")
            return
        }
        if (!businessEmail.trim()) {
            toast.error("Please enter Business Email")
            return
        }

        setIsSavingProfile(true)
        const currentUserId = user?.uid || getOrCreateGuestUserId()
        const currentUserEmail = user?.email || businessEmail.trim()
        const now = new Date().toISOString()

        // 14-Day Free Trial Timestamps
        const trialStartTimestamp = shopProfile?.trialStartDate
            ? Timestamp.fromDate(new Date(formatFirestoreTimestamp(shopProfile.trialStartDate)))
            : Timestamp.now()

        const trialEndTimestamp = shopProfile?.trialEndsAt
            ? Timestamp.fromDate(new Date(formatFirestoreTimestamp(shopProfile.trialEndsAt)))
            : Timestamp.fromDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))

        const plan = shopProfile?.plan || "free_trial"
        const subscriptionStatus = shopProfile?.subscriptionStatus || "trial"

        const profilePayload = {
            businessName: businessName.trim(),
            businessAddress: businessAddress.trim(),
            postalCode: postalCode.trim(),
            city: city.trim(),
            country: country.trim() || "India",
            businessPhone: businessPhone.trim(),
            landlineNo: landlineNo.trim(),
            businessEmail: businessEmail.trim(),
            socialMedia: socialMedia,
            websiteUrl: websiteUrl.trim(),
            openingHoursList: openingHours,
            status: "approved",
            plan: plan,
            subscriptionStatus: subscriptionStatus,
            trialStartDate: trialStartTimestamp,
            trialEndsAt: trialEndTimestamp,
            image: image,
            userId: currentUserId,
            userEmail: currentUserEmail,
            updatedAt: serverTimestamp(),
            ...(shopProfile?.createdAt ? { createdAt: shopProfile.createdAt } : { createdAt: serverTimestamp() })
        }

        const localProfilePayload: ShopProfile = {
            businessName: businessName.trim(),
            businessAddress: businessAddress.trim(),
            postalCode: postalCode.trim(),
            city: city.trim(),
            country: country.trim() || "India",
            businessPhone: businessPhone.trim(),
            landlineNo: landlineNo.trim(),
            businessEmail: businessEmail.trim(),
            socialMedia: socialMedia,
            websiteUrl: websiteUrl.trim(),
            openingHoursList: openingHours,
            status: "approved",
            plan: plan,
            subscriptionStatus: subscriptionStatus,
            trialStartDate: formatFirestoreTimestamp(trialStartTimestamp),
            trialEndsAt: formatFirestoreTimestamp(trialEndTimestamp),
            image: image,
            userId: currentUserId,
            userEmail: currentUserEmail,
            createdAt: formatFirestoreTimestamp(shopProfile?.createdAt) || now,
            updatedAt: now
        }

        try {
            if (shopProfile?.id && !shopProfile.id.startsWith("local-")) {
                try {
                    await setDoc(doc(db, "business-shop-profile", shopProfile.id), profilePayload, { merge: true })
                    const updated: ShopProfile = { id: shopProfile.id, ...localProfilePayload }
                    setShopProfile(updated)
                    saveLocalShopProfile(updated)
                    toast.success("Business Profile updated!")
                } catch (err) {
                    console.warn("Firestore update fallback to local:", err)
                    const updated: ShopProfile = { id: shopProfile.id, ...localProfilePayload }
                    setShopProfile(updated)
                    saveLocalShopProfile(updated)
                    toast.success("Business Profile saved!")
                }
            } else {
                try {
                    const docRef = await addDoc(collection(db, "business-shop-profile"), profilePayload)
                    const newProfile: ShopProfile = { id: docRef.id, ...localProfilePayload }
                    setShopProfile(newProfile)
                    saveLocalShopProfile(newProfile)
                    toast.success("Business Profile saved!")
                } catch (err) {
                    console.warn("Firestore addDoc fallback to local:", err)
                    const localProfile: ShopProfile = { id: "local-" + Date.now(), ...localProfilePayload }
                    setShopProfile(localProfile)
                    saveLocalShopProfile(localProfile)
                    toast.success("Business Profile saved!")
                }
            }

            setViewMode("catalog")
        } catch (error: any) {
            console.error("Failed to save shop profile:", error)
            toast.error("Failed to save profile: " + (error?.message || "Unknown error"))
        } finally {
            setIsSavingProfile(false)
        }
    }

    // ── Store / Business Images Upload Handler ──
    const handleStoreImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        const compressedList: string[] = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            try {
                const compressed = await compressImageFile(file, 1000, 1000, 0.8)
                compressedList.push(compressed)
            } catch (err) {
                const reader = new FileReader()
                const dataUrl = await new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string)
                    reader.readAsDataURL(file)
                })
                compressedList.push(dataUrl)
            }
        }

        if (compressedList.length > 0) {
            setImage((prev) => [...prev, ...compressedList])
            toast.success(`${compressedList.length} image(s) uploaded successfully`)
        }
    }

    const handleRemoveStoreImage = (index: number) => {
        setImage((prev) => prev.filter((_, i) => i !== index))
    }

    // ── Image Upload Handlers (Supports array of images) ──
    const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        const compressedList: string[] = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            try {
                const compressed = await compressImageFile(file, 800, 800, 0.75)
                compressedList.push(compressed)
            } catch (err) {
                const reader = new FileReader()
                const dataUrl = await new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string)
                    reader.readAsDataURL(file)
                })
                compressedList.push(dataUrl)
            }
        }

        if (compressedList.length > 0) {
            setCategoryFormData((prev) => {
                const currentImages = prev.images || []
                const updated = [...currentImages, ...compressedList]
                return {
                    ...prev,
                    images: updated
                }
            })
        }
    }

    const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        const compressedList: string[] = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            try {
                const compressed = await compressImageFile(file, 800, 800, 0.75)
                compressedList.push(compressed)
            } catch (err) {
                const reader = new FileReader()
                const dataUrl = await new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string)
                    reader.readAsDataURL(file)
                })
                compressedList.push(dataUrl)
            }
        }

        if (compressedList.length > 0) {
            setProductFormData((prev) => {
                const currentImages = prev.images || []
                const updated = [...currentImages, ...compressedList]
                return {
                    ...prev,
                    images: updated
                }
            })
        }
    }

    // ── Save New Category & Initial Product directly into Firestore "products" collection ──
    const handleSaveCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!categoryFormData.categoryName.trim()) {
            toast.error("Please enter a category name")
            return
        }
        if (!categoryFormData.productName.trim()) {
            toast.error("Please enter a product name")
            return
        }

        setIsSavingCategory(true)
        const currentUserId = user?.uid || getOrCreateGuestUserId()
        const currentUserEmail = user?.email || ""
        const now = new Date().toISOString()
        const catName = categoryFormData.categoryName.trim()
        const prodName = categoryFormData.productName.trim()
        const prodPrice = categoryFormData.price.trim() || "€0.00"
        const prodQuantity = categoryFormData.quantity.trim() || ""

        const prodImages: string[] =
            categoryFormData.images && categoryFormData.images.length > 0
                ? categoryFormData.images
                : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"]

        const normCatName = catName.toLowerCase().replace(/[^a-z0-9]/g, "-")
        const catId = "cat-" + normCatName

        const newCat: ProductCategory = {
            id: catId,
            name: catName,
            createdAt: now
        }
        setCategories((prev) => {
            const uniqueMap = new Map<string, ProductCategory>()
            prev.forEach((c) => {
                if (c && c.name && c.name.trim()) {
                    uniqueMap.set(c.name.trim().toLowerCase(), c)
                }
            })
            uniqueMap.set(catName.toLowerCase(), newCat)
            const updated = Array.from(uniqueMap.values())
            saveLocalCategories(updated)
            return updated
        })

        // Save Product directly into Firestore collection "products" with timestamp
        const productPayload = {
            name: prodName,
            price: prodPrice,
            quantity: prodQuantity,
            images: prodImages,
            categoryName: catName,
            userId: currentUserId,
            userEmail: currentUserEmail,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }

        const localProductPayload: ProductItem = {
            id: "",
            name: prodName,
            price: prodPrice,
            quantity: prodQuantity,
            images: prodImages,
            categoryName: catName,
            userId: currentUserId,
            userEmail: currentUserEmail,
            createdAt: now,
            updatedAt: now
        }

        try {
            const prodDocRef = await addDoc(collection(db, "shop-products"), productPayload)
            const newProductItem: ProductItem = {
                ...localProductPayload,
                id: prodDocRef.id
            }
            setProducts((prev) => {
                const updated = [newProductItem, ...prev.filter((p) => p.id !== prodDocRef.id)]
                saveLocalProducts(updated)
                return updated
            })

            toast.success(`Category "${catName}" and product "${prodName}" saved to products collection!`)
            setCategoryFormData({
                categoryName: "",
                productName: "",
                price: "",
                quantity: "",
                images: []
            })
            setShowCategoryModal(false)
        } catch (prodErr: any) {
            console.warn("Firestore addDoc fallback for product:", prodErr)
            const localProdId = "prod-" + Date.now()
            const newLocalProduct: ProductItem = {
                ...localProductPayload,
                id: localProdId
            }
            setProducts((prev) => {
                const updated = [newLocalProduct, ...prev]
                saveLocalProducts(updated)
                return updated
            })
            toast.success(`Category "${catName}" and product saved locally!`)
            setCategoryFormData({
                categoryName: "",
                productName: "",
                price: "",
                quantity: "",
                images: []
            })
            setShowCategoryModal(false)
        } finally {
            setIsSavingCategory(false)
        }
    }

    // ── Delete Category ──
    const handleDeleteCategory = async (catId: string, catName: string) => {
        if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return
        try {
            const normName = catName.trim().toLowerCase()
            setCategories((prev) => {
                const updated = prev.filter(
                    (c) => c.id !== catId && c.name?.trim().toLowerCase() !== normName
                )
                saveLocalCategories(updated)
                return updated
            })
            if (
                activeCategoryTab === catId ||
                activeCategoryTab.toLowerCase() === normName ||
                activeCategoryTab === `cat-${normName.replace(/[^a-z0-9]/g, "-")}`
            ) {
                setActiveCategoryTab("all")
            }
            toast.success(`Category "${catName}" deleted`)
        } catch (err: any) {
            toast.error("Failed to delete category")
        }
    }

    // ── Open Add Product Modal ──
    const openAddProductModal = (preselectedCategoryName?: string) => {
        setEditingProduct(null)

        let defaultCatName = preselectedCategoryName || ""

        if (!defaultCatName && activeCategoryTab !== "all" && activeCategoryTab !== "cat-all") {
            const currentCat = categories.find((c) => c.id === activeCategoryTab || c.name === activeCategoryTab)
            if (currentCat) {
                defaultCatName = currentCat.name
            }
        }

        setProductFormData({
            categoryName: defaultCatName,
            name: "",
            price: "",
            quantity: "",
            images: []
        })
        setShowProductModal(true)
    }

    // ── Open Edit Product Modal ──
    const openEditProductModal = (product: ProductItem) => {
        setEditingProduct(product)
        const currentImages = product.images || []

        setProductFormData({
            categoryName: product.categoryName || "",
            name: product.name,
            price: product.price,
            quantity: product.quantity || "",
            images: currentImages
        })
        setShowProductModal(true)
    }

    // ── Save Product to Firestore collection "products" ──
    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!productFormData.name.trim()) {
            toast.error("Please enter a product name")
            return
        }

        setIsSavingProduct(true)
        const currentUserId = user?.uid || getOrCreateGuestUserId()
        const currentUserEmail = user?.email || ""
        const now = new Date().toISOString()

        let matchedCatName = productFormData.categoryName

        const prodImages: string[] =
            productFormData.images && productFormData.images.length > 0
                ? productFormData.images
                : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"]

        const productPayload = {
            name: productFormData.name.trim(),
            price: productFormData.price.trim() || "€0.00",
            quantity: productFormData.quantity.trim() || "",
            images: prodImages,
            categoryName: matchedCatName || "",
            userId: currentUserId,
            userEmail: currentUserEmail,
            updatedAt: serverTimestamp()
        }

        const localProductPayload: ProductItem = {
            id: editingProduct?.id || "",
            name: productFormData.name.trim(),
            price: productFormData.price.trim() || "€0.00",
            quantity: productFormData.quantity.trim() || "",
            images: prodImages,
            categoryName: matchedCatName || "",
            userId: currentUserId,
            userEmail: currentUserEmail,
            createdAt: formatFirestoreTimestamp(editingProduct?.createdAt) || now,
            updatedAt: now
        }

        try {
            if (editingProduct && editingProduct.id && !editingProduct.id.startsWith("prod-")) {
                try {
                    await setDoc(doc(db, "shop-products", editingProduct.id), productPayload, { merge: true })
                    toast.success("Product updated successfully in Kiosk database!")
                } catch (err: any) {
                    console.warn("Firestore update fallback to local:", err)
                    setProducts((prev) => {
                        const updated = prev.map((p) =>
                            p.id === editingProduct.id ? { ...p, ...localProductPayload } : p
                        )
                        saveLocalProducts(updated)
                        return updated
                    })
                    toast.success("Product updated locally")
                }
            } else if (editingProduct && editingProduct.id && editingProduct.id.startsWith("prod-")) {
                setProducts((prev) => {
                    const updated = prev.map((p) =>
                        p.id === editingProduct.id ? { ...p, ...localProductPayload } : p
                    )
                    saveLocalProducts(updated)
                    return updated
                })
                toast.success("Product updated successfully!")
            } else {
                try {
                    const docRef = await addDoc(collection(db, "shop-products"), {
                        ...productPayload,
                        createdAt: serverTimestamp()
                    })

                    const newProductItem: ProductItem = {
                        ...localProductPayload,
                        id: docRef.id,
                        createdAt: now
                    }

                    setProducts((prev) => {
                        const updated = [newProductItem, ...prev.filter((p) => p.id !== docRef.id)]
                        saveLocalProducts(updated)
                        return updated
                    })

                    toast.success("Product saved to Kiosk products collection!")
                } catch (firestoreErr: any) {
                    console.warn("Firestore addDoc fallback to local:", firestoreErr)
                    const localId = "prod-" + Date.now()
                    const newProd: ProductItem = {
                        ...localProductPayload,
                        id: localId,
                        createdAt: now
                    }
                    setProducts((prev) => {
                        const updated = [newProd, ...prev]
                        saveLocalProducts(updated)
                        return updated
                    })
                    toast.success("Product saved locally to Kiosk!")
                }
            }

            setShowProductModal(false)
        } catch (error: any) {
            console.error("Error saving product:", error)
            toast.error("Failed to save product: " + (error?.message || "Unknown error"))
        } finally {
            setIsSavingProduct(false)
        }
    }

    // ── Delete Product ──
    const handleDeleteProduct = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}" from Kiosk?`)) return

        try {
            if (!id.startsWith("prod-")) {
                try {
                    await deleteDoc(doc(db, "shop-products", id))
                    toast.success("Product deleted successfully")
                } catch (err: any) {
                    console.warn("Firestore delete fallback to local:", err)
                    setProducts((prev) => {
                        const updated = prev.filter((p) => p.id !== id)
                        saveLocalProducts(updated)
                        return updated
                    })
                    toast.success("Product removed locally")
                }
            } else {
                setProducts((prev) => {
                    const updated = prev.filter((p) => p.id !== id)
                    saveLocalProducts(updated)
                    return updated
                })
                toast.success("Product removed")
            }
        } catch (error: any) {
            console.error("Error deleting product:", error)
            toast.error("Failed to delete product")
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">


            <main className="flex-1 pt-14 sm:pt-20 pb-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-20">
                {/* ── VIEW 0: WELCOME SCREEN ── */}
                {viewMode === "welcome" && (
                    <WelcomeScreen t={t} onStart={() => setViewMode("create-profile")} />
                )}

                {/* ── VIEW 1: CREATE / EDIT BUSINESS INFORMATION FORM ── */}
                {viewMode === "create-profile" && (
                    <ContactInfoForm
                        shopProfile={shopProfile}
                        t={t}
                        onBack={() => setViewMode(shopProfile ? "catalog" : "welcome")}
                        businessName={businessName}
                        setBusinessName={setBusinessName}
                        businessAddress={businessAddress}
                        setBusinessAddress={setBusinessAddress}
                        postalCode={postalCode}
                        setPostalCode={setPostalCode}
                        city={city}
                        setCity={setCity}
                        country={country}
                        setCountry={setCountry}
                        businessPhone={businessPhone}
                        setBusinessPhone={setBusinessPhone}
                        businessEmail={businessEmail}
                        setBusinessEmail={setBusinessEmail}
                        websiteUrl={websiteUrl}
                        setWebsiteUrl={setWebsiteUrl}
                        socialMedia={socialMedia}
                        setSocialMedia={setSocialMedia}
                        activeSocialTab={activeSocialTab}
                        setActiveSocialTab={setActiveSocialTab}
                        openingHours={openingHours}
                        handleToggleStatus={handleToggleStatus}
                        handleChangeTime={handleChangeTime}
                        handleDeleteOpeningHour={handleDeleteOpeningHour}
                        handleAddOpeningHourSlot={handleAddOpeningHourSlot}
                        handleSaveBusinessInfo={handleSaveBusinessInfo}
                        isSavingProfile={isSavingProfile}
                        image={image}
                        handleStoreImageUpload={handleStoreImageUpload}
                        handleRemoveStoreImage={handleRemoveStoreImage}
                    />
                )}

                {/* ── VIEW 2: PRODUCT CATEGORIES & CATALOG ── */}
                {viewMode === "catalog" && (
                    <ProductCatalogView
                        shopProfile={shopProfile}
                        businessName={businessName}
                        businessAddress={businessAddress}
                        postalCode={postalCode}
                        city={city}
                        country={country}
                        openingHours={openingHours}
                        onEditInfo={() => setViewMode("create-profile")}
                        categories={categories}
                        activeCategoryTab={activeCategoryTab}
                        setActiveCategoryTab={setActiveCategoryTab}
                        products={products}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        isLoadingProducts={isLoadingProducts}
                        handleDeleteCategory={handleDeleteCategory}
                        handleDeleteProduct={handleDeleteProduct}
                        showCategoryModal={showCategoryModal}
                        setShowCategoryModal={setShowCategoryModal}
                        categoryFormData={categoryFormData}
                        setCategoryFormData={setCategoryFormData}
                        handleCategoryImageUpload={handleCategoryImageUpload}
                        isSavingCategory={isSavingCategory}
                        handleSaveCategory={handleSaveCategory}
                        showProductModal={showProductModal}
                        setShowProductModal={setShowProductModal}
                        editingProduct={editingProduct}
                        openAddProductModal={openAddProductModal}
                        openEditProductModal={openEditProductModal}
                        productFormData={productFormData}
                        setProductFormData={setProductFormData}
                        handleProductImageUpload={handleProductImageUpload}
                        handleSaveProduct={handleSaveProduct}
                        isSavingProduct={isSavingProduct}
                        showUpgradeModal={showUpgradeModal}
                        setShowUpgradeModal={setShowUpgradeModal}
                    />
                )}
            </main>

        </div>
    )
}