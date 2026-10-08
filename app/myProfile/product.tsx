
"use client"

import React, { useMemo, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    MapPin,
    Clock,
    Edit3,
    Layers,
    Search,
    Plus,
    X,
    Trash2,
    ShoppingBag,
    Tag,
    DollarSign,
    Upload,
    Loader2,
    FolderPlus,
    Sparkles,
    CheckCircle2,
    Scale,
    Image as ImageIcon,
    QrCode,
    AlertTriangle,
    ShieldCheck,
    Eye
} from "lucide-react"
import {
    OpeningHourItem,
    ProductCategory,
    ProductItem,
    ShopProfile,
    CategoryFormData,
    ProductFormData,
    checkTrialStatus
} from "./types"
import { DownloadScanner } from "./download-scanner"
import { UpgradeFormModal } from "./upgrad-form"

export interface ProductCatalogViewProps {
    shopProfile: ShopProfile | null
    businessName: string
    businessAddress: string
    postalCode: string
    city: string
    country: string
    openingHours: OpeningHourItem[]
    onEditInfo: () => void
    categories: ProductCategory[]
    activeCategoryTab: string
    setActiveCategoryTab: (tab: string) => void
    products: ProductItem[]
    searchQuery: string
    setSearchQuery: (q: string) => void
    isLoadingProducts: boolean
    handleDeleteCategory: (id: string, name: string) => void
    handleDeleteProduct: (id: string, name: string) => void
    showCategoryModal: boolean
    setShowCategoryModal: (show: boolean) => void
    categoryFormData: CategoryFormData
    setCategoryFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>
    handleCategoryImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    isSavingCategory: boolean
    handleSaveCategory: (e: React.FormEvent) => Promise<void>
    showProductModal: boolean
    setShowProductModal: (show: boolean) => void
    editingProduct: ProductItem | null
    openAddProductModal: (preselectedCategoryName?: string) => void
    openEditProductModal: (product: ProductItem) => void
    productFormData: ProductFormData
    setProductFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
    handleProductImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    handleSaveProduct: (e: React.FormEvent) => Promise<void>
    isSavingProduct: boolean
    showUpgradeModal: boolean
    setShowUpgradeModal: (show: boolean) => void
}

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
    shopProfile,
    businessName,
    businessAddress,
    postalCode,
    city,
    country,
    openingHours,
    onEditInfo,
    categories,
    activeCategoryTab,
    setActiveCategoryTab,
    products,
    searchQuery,
    setSearchQuery,
    isLoadingProducts,
    handleDeleteCategory,
    handleDeleteProduct,
    showCategoryModal,
    setShowCategoryModal,
    categoryFormData,
    setCategoryFormData,
    handleCategoryImageUpload,
    isSavingCategory,
    handleSaveCategory,
    showProductModal,
    setShowProductModal,
    editingProduct,
    openAddProductModal,
    openEditProductModal,
    productFormData,
    setProductFormData,
    handleProductImageUpload,
    handleSaveProduct,
    isSavingProduct,
    showUpgradeModal,
    setShowUpgradeModal
}) => {
    const [mounted, setMounted] = useState(false)
    const [showScannerDropdown, setShowScannerDropdown] = useState(false)
    const [viewingProduct, setViewingProduct] = useState<ProductItem | null>(null)
    const [activeViewImageIndex, setActiveViewImageIndex] = useState(0)

    useEffect(() => {
        setMounted(true)
    }, [])

    const customCategories = useMemo(() => {
        const uniqueMap = new Map<string, ProductCategory>()
        categories
            .filter(
                (c) =>
                    c &&
                    c.id !== "cat-all" &&
                    c.id !== "all" &&
                    c.name &&
                    !["all products", "all"].includes(c.name.trim().toLowerCase())
            )
            .forEach((c) => {
                const norm = c.name.trim().toLowerCase()
                if (!uniqueMap.has(norm)) {
                    uniqueMap.set(norm, {
                        ...c,
                        id: "cat-" + norm.replace(/[^a-z0-9]/g, "-"),
                        name: c.name.trim()
                    })
                }
            })
        return Array.from(uniqueMap.values())
    }, [categories])

    // Filtered Products
    const filteredProducts = useMemo(() => {
        const uniqueMap = new Map<string, ProductItem>()
        products.forEach((p) => {
            if (p && p.id && !uniqueMap.has(p.id)) {
                uniqueMap.set(p.id, p)
            }
        })
        const uniqueList = Array.from(uniqueMap.values())

        return uniqueList.filter((p) => {
            const matchesSearch =
                !searchQuery ||
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.quantity && p.quantity.toLowerCase().includes(searchQuery.toLowerCase()))

            if (!matchesSearch) return false

            if (activeCategoryTab === "all" || activeCategoryTab === "cat-all") return true
            const activeLower = activeCategoryTab.toLowerCase().trim()
            const selectedCat = customCategories.find(
                (c) => c.id.toLowerCase() === activeLower || c.name.toLowerCase().trim() === activeLower
            )
            const targetName = selectedCat ? selectedCat.name.toLowerCase().trim() : activeLower.replace(/^cat-/, "")
            const prodCatName = (p.categoryName || "").toLowerCase().trim()

            return prodCatName === targetName || prodCatName === activeLower || (p.categoryName && `cat-${prodCatName.replace(/[^a-z0-9]/g, "-")}` === activeCategoryTab)
        })
    }, [products, searchQuery, activeCategoryTab, customCategories])

    const trial = checkTrialStatus(shopProfile)

    return (
        <div className="space-y-6">
            {/* ── 14-DAY TRIAL EXPIRATION ALERT BANNER ── */}
            {trial.isExpired ? (
                <div className="bg-gradient-to-r from-rose-500/10 via-rose-50 to-orange-50 border-2 border-rose-400 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base font-black text-rose-900">
                                14-Day Free Trial Expired — QR Scanner Inactive
                            </h3>
                            <p className="text-xs text-rose-700 font-medium mt-0.5">
                                Your free trial period has ended. Customers scanning your QR code cannot view your products. Upgrade to Pro to reactivate your scanner.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowUpgradeModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-rose-500/20 cursor-pointer active:scale-95"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Upgrade to Pro ➔</span>
                    </button>
                </div>
            ) : trial.isTrial && trial.daysLeft <= 3 ? (
                <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="text-xs font-bold text-amber-900">
                            Free Trial Ending Soon: <span className="underline">{trial.daysLeft} {trial.daysLeft === 1 ? "day" : "days"} remaining</span>. Upgrade now to prevent scanner disruption.
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowUpgradeModal(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                        <span>Upgrade</span>
                    </button>
                </div>
            ) : null}

            {/* ── STORE PROFILE SUMMARY CARD ── */}
            {(shopProfile || businessName) && (
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                        <div className="flex items-start gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-lg sm:text-xl font-black text-[#0A2540]">
                                        {businessName || shopProfile?.businessName}
                                    </h2>
                                    {trial.isExpired ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-black">
                                            <AlertTriangle className="w-3 h-3" />
                                            <span>Trial Expired</span>
                                        </span>
                                    ) : trial.isTrial ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-black">
                                            <Clock className="w-3 h-3" />
                                            <span>Trial: {trial.daysLeft}d left</span>
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black">
                                            <ShieldCheck className="w-3 h-3" />
                                            <span>Pro Verified</span>
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                                    <MapPin className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                                    <span>
                                        {businessAddress || shopProfile?.businessAddress}, {postalCode || shopProfile?.postalCode}{" "}
                                        {city || shopProfile?.city}, {country || shopProfile?.country || "India"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                    <span>
                                        Hours:{" "}
                                        {openingHours.find((h) => h.status === "open")
                                            ? `${openingHours.filter((h) => h.status === "open").length} Days Open (from 09:00 - 20:00)`
                                            : "Mon - Sat: 09:00 - 20:00"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                            {shopProfile?.status?.toLowerCase().trim() === "approved" && (
                                <button
                                    type="button"
                                    onClick={() => setShowScannerDropdown(true)}
                                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-white text-xs font-extrabold transition-all cursor-pointer shadow-xs active:scale-95 select-none ${trial.isExpired
                                        ? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20"
                                        : "bg-[#0052FF] hover:bg-blue-600 shadow-blue-500/20"
                                        }`}
                                >
                                    <QrCode className="w-3.5 h-3.5" />
                                    <span>{trial.isExpired ? "Scanner Locked" : "View Scanner"}</span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={onEditInfo}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-extrabold transition-all cursor-pointer active:scale-95"
                            >
                                <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                                <span>Edit Info</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── PRODUCT CATEGORIES & PRODUCTS CATALOG ── */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#0A2540] flex items-center gap-2">
                            <Layers className="w-5 h-5 text-[#0052FF]" />
                            <span>Product Categories &amp; Menu</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                            Add categories and products to organize your kiosk menu.
                        </p>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all shadow-2xs"
                        />
                    </div>
                </div>

                {/* Category Filter Pills & Add Category Action */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full sm:max-w-[65%] no-scrollbar">
                        <button
                            type="button"
                            onClick={() => setActiveCategoryTab("all")}
                            className={`py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${activeCategoryTab === "all" || activeCategoryTab === "cat-all"
                                ? "bg-[#0052FF] text-white shadow-sm"
                                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            <span>All Products</span>
                            <span
                                className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeCategoryTab === "all" || activeCategoryTab === "cat-all"
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-100 text-slate-600"
                                    }`}
                            >
                                {products.length}
                            </span>
                        </button>

                        {customCategories.map((cat) => {
                            const count = products.filter(
                                (p) => p.categoryName?.trim().toLowerCase() === cat.name.trim().toLowerCase()
                            ).length
                            const isSelected = activeCategoryTab === cat.id

                            return (
                                <div key={cat.id} className="relative group shrink-0 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setActiveCategoryTab(cat.id)}
                                        className={`py-2 pl-3.5 pr-8 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${isSelected
                                            ? "bg-[#0052FF] text-white shadow-sm"
                                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                                            }`}
                                    >
                                        <span>{cat.name}</span>
                                        <span
                                            className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                                                }`}
                                        >
                                            {count}
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDeleteCategory(cat.id, cat.name)
                                        }}
                                        className={`absolute right-2 p-1 rounded-lg transition-colors cursor-pointer ${isSelected
                                            ? "text-white/80 hover:text-white hover:bg-white/20"
                                            : "text-slate-400 hover:text-rose-600"
                                            }`}
                                        title="Delete Category"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    {/* Action Dropdown Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* New Category Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowProductModal(false)
                                    setShowCategoryModal(!showCategoryModal)
                                }}
                                className={`py-2 px-3.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 select-none ${showCategoryModal
                                    ? "border-[#0052FF] bg-blue-50 text-[#0052FF] shadow-xs"
                                    : "border-dashed border-slate-300 hover:border-[#0052FF] bg-slate-50 hover:bg-blue-50/50 text-slate-700 hover:text-[#0052FF]"
                                    }`}
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>New Category</span>
                                <span className="text-[10px] text-slate-400">{showCategoryModal ? "▲" : "▼"}</span>
                            </button>

                            {/* Dropdown Menu Popup */}
                            {showCategoryModal && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => !isSavingCategory && setShowCategoryModal(false)}
                                    />
                                    <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
                                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0052FF] flex items-center justify-center">
                                                    <FolderPlus className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-black text-[#0A2540]">Add New Category</h3>
                                                    <p className="text-[11px] text-slate-500 font-medium">Create category & initial item</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                disabled={isSavingCategory}
                                                onClick={() => setShowCategoryModal(false)}
                                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <form onSubmit={handleSaveCategory} className="space-y-3">
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                    Category Name *
                                                </label>
                                                <div className="relative">
                                                    <FolderPlus className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="e.g. Main Dishes, Beverages, Desserts"
                                                        value={categoryFormData.categoryName}
                                                        onChange={(e) =>
                                                            setCategoryFormData({ ...categoryFormData, categoryName: e.target.value })
                                                        }
                                                        className="w-full pl-8 pr-3 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                    Product Name *
                                                </label>
                                                <div className="relative">
                                                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="e.g. Truffle Pasta / Artisanal Latte"
                                                        value={categoryFormData.productName}
                                                        onChange={(e) =>
                                                            setCategoryFormData({ ...categoryFormData, productName: e.target.value })
                                                        }
                                                        className="w-full pl-8 pr-3 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                        Price *
                                                    </label>
                                                    <div className="relative">
                                                        <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="e.g. €12.50"
                                                            value={categoryFormData.price}
                                                            onChange={(e) =>
                                                                setCategoryFormData({ ...categoryFormData, price: e.target.value })
                                                            }
                                                            className="w-full pl-7 pr-2.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                        Qty / Weight
                                                    </label>
                                                    <div className="relative">
                                                        <Scale className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. 250g, 1 Pc"
                                                            value={categoryFormData.quantity}
                                                            onChange={(e) =>
                                                                setCategoryFormData({ ...categoryFormData, quantity: e.target.value })
                                                            }
                                                            className="w-full pl-7 pr-2.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <label className="block text-[11px] font-bold text-slate-700">
                                                        Product Images
                                                    </label>
                                                    {categoryFormData.images && categoryFormData.images.length > 0 && (
                                                        <span className="text-[10px] font-extrabold text-[#0052FF]">
                                                            {categoryFormData.images.length} Image{categoryFormData.images.length > 1 ? "s" : ""}
                                                        </span>
                                                    )}
                                                </div>

                                                {categoryFormData.images && categoryFormData.images.length > 0 ? (
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {categoryFormData.images.map((imgUrl, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs"
                                                            >
                                                                <img
                                                                    src={imgUrl}
                                                                    alt={`Upload ${idx + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setCategoryFormData((prev) => ({
                                                                            ...prev,
                                                                            images: (prev.images || []).filter((_, i) => i !== idx)
                                                                        }))
                                                                    }}
                                                                    className="absolute top-1 right-1 p-0.5 rounded bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 cursor-pointer"
                                                                    title="Remove image"
                                                                >
                                                                    <Trash2 className="w-2.5 h-2.5" />
                                                                </button>
                                                            </div>
                                                        ))}

                                                        <label className="cursor-pointer aspect-square rounded-xl border border-dashed border-slate-300 hover:border-[#0052FF] bg-slate-50 hover:bg-blue-50/40 flex flex-col items-center justify-center transition-all group">
                                                            <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0052FF]" />
                                                            <span className="text-[9px] font-bold text-slate-500 group-hover:text-[#0052FF] mt-0.5">Add</span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                multiple
                                                                className="hidden"
                                                                onChange={handleCategoryImageUpload}
                                                            />
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <label className="cursor-pointer flex flex-col items-center justify-center w-full py-3 border border-dashed border-slate-300 hover:border-[#0052FF] bg-slate-50 hover:bg-blue-50/40 rounded-xl transition-all group">
                                                        <Upload className="w-4 h-4 text-slate-400 group-hover:text-[#0052FF] mb-1" />
                                                        <span className="text-[11px] font-bold text-slate-700 group-hover:text-[#0052FF]">
                                                            Upload Product Image(s)
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            className="hidden"
                                                            onChange={handleCategoryImageUpload}
                                                        />
                                                    </label>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                                <button
                                                    type="button"
                                                    disabled={isSavingCategory}
                                                    onClick={() => setShowCategoryModal(false)}
                                                    className="py-1.5 px-3 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSavingCategory}
                                                    className="py-1.5 px-4 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm shadow-blue-500/20 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                                                >
                                                    {isSavingCategory && <Loader2 className="w-3 h-3 animate-spin" />}
                                                    <span>Save Category</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Add / Edit Product Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCategoryModal(false)
                                    if (showProductModal) {
                                        setShowProductModal(false)
                                    } else {
                                        openAddProductModal(
                                            activeCategoryTab !== "all" && activeCategoryTab !== "cat-all"
                                                ? customCategories.find((c) => c.id === activeCategoryTab)?.name || activeCategoryTab
                                                : undefined
                                        )
                                    }
                                }}
                                className={`py-2 px-3.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 select-none ${showProductModal
                                    ? "bg-blue-700 text-white shadow-md shadow-blue-500/30"
                                    : "bg-[#0052FF] hover:bg-blue-600 text-white shadow-xs shadow-blue-500/20 active:scale-95"
                                    }`}
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>{editingProduct ? "Edit Product" : "Add Product"}</span>
                                <span className="text-[10px] text-white/80">{showProductModal ? "▲" : "▼"}</span>
                            </button>

                            {/* Dropdown Menu Popup */}
                            {showProductModal && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => !isSavingProduct && setShowProductModal(false)}
                                    />
                                    <div className="absolute top-full right-0 mt-2 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
                                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0052FF] flex items-center justify-center">
                                                    <ShoppingBag className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-black text-[#0A2540]">
                                                        {editingProduct ? "Edit Product" : "Add New Product"}
                                                    </h3>
                                                    <p className="text-[11px] text-slate-500 font-medium">
                                                        {editingProduct ? "Update product details" : "Add item to your kiosk menu"}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                disabled={isSavingProduct}
                                                onClick={() => setShowProductModal(false)}
                                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <form onSubmit={handleSaveProduct} className="space-y-3">
                                            {/* Category Selector */}
                                            {customCategories.length > 0 && (
                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                        Category
                                                    </label>
                                                    <div className="relative">
                                                        <FolderPlus className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                        <select
                                                            value={productFormData.categoryName || ""}
                                                            onChange={(e) =>
                                                                setProductFormData({ ...productFormData, categoryName: e.target.value })
                                                            }
                                                            className="w-full pl-8 pr-3 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all cursor-pointer"
                                                        >
                                                            <option value="">General / No Category</option>
                                                            {customCategories.map((c) => (
                                                                <option key={c.id} value={c.name}>
                                                                    {c.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                    Product Name *
                                                </label>
                                                <div className="relative">
                                                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="e.g. Truffle Pasta / Artisanal Latte"
                                                        value={productFormData.name}
                                                        onChange={(e) =>
                                                            setProductFormData({ ...productFormData, name: e.target.value })
                                                        }
                                                        className="w-full pl-8 pr-3 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                        Price *
                                                    </label>
                                                    <div className="relative">
                                                        <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="e.g. €12.50"
                                                            value={productFormData.price}
                                                            onChange={(e) =>
                                                                setProductFormData({ ...productFormData, price: e.target.value })
                                                            }
                                                            className="w-full pl-7 pr-2.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                                        Qty / Weight
                                                    </label>
                                                    <div className="relative">
                                                        <Scale className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. 250g, 1 Pc"
                                                            value={productFormData.quantity}
                                                            onChange={(e) =>
                                                                setProductFormData({ ...productFormData, quantity: e.target.value })
                                                            }
                                                            className="w-full pl-7 pr-2.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <label className="block text-[11px] font-bold text-slate-700">
                                                        Product Images
                                                    </label>
                                                    {productFormData.images && productFormData.images.length > 0 && (
                                                        <span className="text-[10px] font-extrabold text-[#0052FF]">
                                                            {productFormData.images.length} Image{productFormData.images.length > 1 ? "s" : ""}
                                                        </span>
                                                    )}
                                                </div>

                                                {productFormData.images && productFormData.images.length > 0 ? (
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {productFormData.images.map((imgUrl, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs"
                                                            >
                                                                <img
                                                                    src={imgUrl}
                                                                    alt={`Upload ${idx + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setProductFormData((prev) => ({
                                                                            ...prev,
                                                                            images: (prev.images || []).filter((_, i) => i !== idx)
                                                                        }))
                                                                    }}
                                                                    className="absolute top-1 right-1 p-0.5 rounded bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 cursor-pointer"
                                                                    title="Remove image"
                                                                >
                                                                    <Trash2 className="w-2.5 h-2.5" />
                                                                </button>
                                                            </div>
                                                        ))}

                                                        <label className="cursor-pointer aspect-square rounded-xl border border-dashed border-slate-300 hover:border-[#0052FF] bg-slate-50 hover:bg-blue-50/40 flex flex-col items-center justify-center transition-all group">
                                                            <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0052FF]" />
                                                            <span className="text-[9px] font-bold text-slate-500 group-hover:text-[#0052FF] mt-0.5">Add</span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                multiple
                                                                className="hidden"
                                                                onChange={handleProductImageUpload}
                                                            />
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <label className="cursor-pointer flex flex-col items-center justify-center w-full py-3 border border-dashed border-slate-300 hover:border-[#0052FF] bg-slate-50 hover:bg-blue-50/40 rounded-xl transition-all group">
                                                        <Upload className="w-4 h-4 text-slate-400 group-hover:text-[#0052FF] mb-1" />
                                                        <span className="text-[11px] font-bold text-slate-700 group-hover:text-[#0052FF]">
                                                            Upload Product Image(s)
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            className="hidden"
                                                            onChange={handleProductImageUpload}
                                                        />
                                                    </label>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                                <button
                                                    type="button"
                                                    disabled={isSavingProduct}
                                                    onClick={() => setShowProductModal(false)}
                                                    className="py-1.5 px-3 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSavingProduct}
                                                    className="py-1.5 px-4 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm shadow-blue-500/20 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                                                >
                                                    {isSavingProduct && <Loader2 className="w-3 h-3 animate-spin" />}
                                                    <span>{editingProduct ? "Save Changes" : "Save Product"}</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>



                {/* Product Grid */}
                {isLoadingProducts ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-[#0052FF] animate-spin mb-3" />
                        <p className="text-xs font-bold text-slate-500">Loading Kiosk Products...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 max-w-md mx-auto shadow-xs">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052FF] flex items-center justify-center mx-auto mb-3">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-black text-[#0A2540] mb-1">No Products Found</h3>
                        <p className="text-xs text-slate-500 mb-5">
                            {searchQuery
                                ? "No products matching your search."
                                : "Start by adding your first product to this catalog."}
                        </p>
                        <button
                            type="button"
                            onClick={() =>
                                openAddProductModal(activeCategoryTab !== "all" ? activeCategoryTab : undefined)
                            }
                            className="py-2.5 px-5 bg-[#0052FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Product</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => {
                            const displayCategoryName = product.categoryName?.trim() || ""
                            const hasCustomCategory = Boolean(
                                displayCategoryName &&
                                !["general", "all products", "all", "cat-all", "cat-general"].includes(
                                    displayCategoryName.toLowerCase()
                                )
                            )

                            return (
                                <div
                                    key={product.id}
                                    className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group relative"
                                >
                                    <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                                        <img
                                            src={
                                                (product.images && product.images.length > 0 ? product.images[0] : "") ||
                                                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                                            }
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        {/* Category Badge - Shows when added with New Category / Custom Category */}
                                        {hasCustomCategory && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-extrabold text-[11px] tracking-wide shadow-md border border-white/20 max-w-[60%] truncate">
                                                {displayCategoryName}
                                            </span>
                                        )}

                                        {/* Images count badge if multiple images */}
                                        {product.images && product.images.length > 1 && (
                                            <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1 shadow-sm border border-white/10">
                                                <ImageIcon className="w-3 h-3 text-blue-400" />
                                                <span>+{product.images.length - 1} photos</span>
                                            </span>
                                        )}

                                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={() => openEditProductModal(product)}
                                                className="p-2 bg-white/95 hover:bg-white text-slate-700 rounded-xl shadow-md transition-all cursor-pointer"
                                                title="Edit Product"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                                className="p-2 bg-rose-500/90 hover:bg-rose-600 text-white rounded-xl shadow-md transition-all cursor-pointer"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-baseline justify-between gap-3">
                                                <h3 className="text-base font-black text-[#0A2540] line-clamp-1 flex-1 min-w-0" title={product.name}>
                                                    {product.name}
                                                </h3>
                                                <span className="text-base font-black text-[#0052FF] shrink-0">
                                                    {product.price}
                                                </span>
                                            </div>
                                            {product.quantity && (
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/80 border border-blue-100 text-[#0052FF] text-xs font-bold">
                                                    <Scale className="w-3 h-3 text-[#0052FF]" />
                                                    <span>Qty / Weight: {product.quantity}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEditProductModal(product)}
                                                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setViewingProduct(product)
                                                    setActiveViewImageIndex(0)
                                                }}
                                                className="flex-1 py-2 px-3 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>View</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            <UpgradeFormModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                shopProfile={shopProfile}
            />

            {/* ── MODAL 4: VIEW PRODUCT DETAILS MODAL (PORTALED ABOVE HEADER) ── */}
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {viewingProduct && (
                            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3.5 sm:p-4 overflow-y-auto">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => setViewingProduct(null)}
                                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-0"
                                />

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    transition={{ type: "spring", damping: 28, stiffness: 350 }}
                                    className="relative bg-white border border-slate-200 rounded-3xl max-w-lg w-full shadow-2xl z-10 text-slate-900 overflow-hidden my-auto flex flex-col max-h-[92vh]"
                                >
                                    {/* Header with Close */}
                                    <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0052FF] text-[11px] font-black uppercase tracking-wider">
                                                {viewingProduct.categoryName || "General"}
                                            </span>
                                            <span className="text-xs text-slate-400 font-semibold">• Product Preview</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setViewingProduct(null)}
                                            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                                            title="Close"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                                        {/* Main Image & Carousel */}
                                        {viewingProduct.images && viewingProduct.images.length > 0 ? (
                                            <div className="space-y-2">
                                                <div className="w-full h-64 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-100 flex items-center justify-center">
                                                    <img
                                                        src={viewingProduct.images[activeViewImageIndex] || viewingProduct.images[0]}
                                                        alt={viewingProduct.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                {viewingProduct.images.length > 1 && (
                                                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                                                        {viewingProduct.images.map((img, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => setActiveViewImageIndex(idx)}
                                                                className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${activeViewImageIndex === idx ? "border-[#0052FF] shadow-sm scale-95" : "border-slate-200 opacity-70 hover:opacity-100"
                                                                    }`}
                                                            >
                                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-full h-44 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 text-xs">
                                                <ImageIcon className="w-8 h-8 mb-1.5 opacity-40" />
                                                <span>No product image</span>
                                            </div>
                                        )}

                                        {/* Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-xl font-black text-[#0A2540]">{viewingProduct.name}</h3>
                                                    {viewingProduct.quantity && (
                                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-[#0052FF] text-xs font-bold mt-1.5">
                                                            <Scale className="w-3 h-3" />
                                                            <span>Quantity / Weight: {viewingProduct.quantity}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-2xl font-black text-[#0052FF] shrink-0">
                                                    {viewingProduct.price}
                                                </span>
                                            </div>

                                            {viewingProduct.description && (
                                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                                                    <p className="font-bold text-slate-800 mb-1">Description:</p>
                                                    {viewingProduct.description}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Buttons */}
                                    <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2.5">
                                        <button
                                            type="button"
                                            onClick={() => setViewingProduct(null)}
                                            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const p = viewingProduct
                                                setViewingProduct(null)
                                                openEditProductModal(p)
                                            }}
                                            className="py-2.5 px-5 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                            <span>Edit Product</span>
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}

            {/* ── MODAL 5: VIEW / DOWNLOAD SCANNER MODAL (PORTALED ABOVE NAVBAR & HEADER) ── */}
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {showScannerDropdown && (
                            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3.5 sm:p-4 overflow-y-auto">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    onClick={() => setShowScannerDropdown(false)}
                                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-0"
                                />

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                                    transition={{ type: "spring", damping: 28, stiffness: 350 }}
                                    className="relative z-10 w-full max-w-[340px] sm:max-w-sm my-auto"
                                >
                                    <DownloadScanner
                                        isOpen={true}
                                        onClose={() => setShowScannerDropdown(false)}
                                        shopProfile={shopProfile}
                                        products={products}
                                        userId={shopProfile?.userId}
                                        userEmail={shopProfile?.userEmail}
                                        onUpgradeClick={() => {
                                            setShowScannerDropdown(false)
                                            setShowUpgradeModal(true)
                                        }}
                                    />
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}

        </div>
    )
}

