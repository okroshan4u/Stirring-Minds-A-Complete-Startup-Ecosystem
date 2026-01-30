'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ClaimedDeal, User } from '@/types';
import { api, formatDate, getStatusColor, getCategoryColor } from '@/lib/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

export default function DashboardPage() {
    const [claimedDeals, setClaimedDeals] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    // Load user + token
    useEffect(() => {
        const user = localStorage.getItem("sb_user")
        const token = localStorage.getItem("sb_token")

        if (!user || !token) {
            router.push("/auth/login")
            return
        }

        setUser(JSON.parse(user))
    }, [])

    // Fetch claims
    const fetchData = async () => {
        try {
            const res = await api.getMyClaims()
            setClaimedDeals(res)
        } catch (err) {
            console.error("Dashboard error", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) fetchData()
    }, [user])

    // Loading state
    if (!user || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    // ✅ Derived values AFTER loading
    const filteredDeals =
        selectedStatus === "all"
            ? claimedDeals
            : claimedDeals.filter(d => d.status === selectedStatus)

    const stats = {
        total: claimedDeals.length,
        approved: claimedDeals.filter(d => d.status === "approved").length,
        pending: claimedDeals.filter(d => d.status === "pending").length,
        rejected: claimedDeals.filter(d => d.status === "rejected").length,
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 bg-gradient-to-br from-neutral-50 via-purple-50/20 to-pink-50/20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4">
                        Dashboard
                    </h1>
                    <p className="text-xl text-neutral-600">
                        Welcome back, {user.name}! 👋
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
                >
                    {[
                        { label: 'Total Claims', value: stats.total, color: 'primary' },
                        { label: 'Approved', value: stats.approved, color: 'green' },
                        { label: 'Pending', value: stats.pending, color: 'yellow' },
                        { label: 'Rejected', value: stats.rejected, color: 'red' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                        >
                            <Card className="p-6">
                                <div className="text-sm text-neutral-600 mb-2">
                                    {stat.label}
                                </div>
                                <div
                                    className={`text-4xl font-bold ${stat.color === 'primary'
                                        ? 'text-primary-600'
                                        : stat.color === 'green'
                                            ? 'text-green-600'
                                            : stat.color === 'yellow'
                                                ? 'text-yellow-600'
                                                : 'text-red-600'
                                        }`}
                                >
                                    {stat.value}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap gap-3">
                        {[
                            { value: 'all', label: 'All Claims' },
                            { value: 'approved', label: 'Approved' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'rejected', label: 'Rejected' },
                        ].map((filter) => (
                            <motion.button
                                key={filter.value}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedStatus(filter.value)}
                                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${selectedStatus === filter.value
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary-300'
                                    }`}
                            >
                                {filter.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Claimed Deals List */}
                <AnimatePresence mode="wait">
                    {filteredDeals.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <Card className="p-12 text-center">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                                    No deals claimed yet
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    Start claiming deals to see them here
                                </p>
                                <Link href="/deals">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium"
                                    >
                                        Browse Deals
                                    </motion.button>
                                </Link>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            {filteredDeals.map((claimedDeal, index) => (
                                <motion.div
                                    key={claimedDeal.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    layout
                                >
                                    <Card hoverable className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Logo */}
                                            <div className="flex-shrink-0">
                                                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-neutral-200 bg-neutral-50">
                                                    {/* <img
                                                        src={claimedDeal.deal.partner.logo}
                                                        alt={claimedDeal.deal.partner.name}
                                                        className="w-full h-full object-cover"
                                                    /> */}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                                            {claimedDeal.deal.title}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Badge
                                                                className={getCategoryColor(
                                                                    claimedDeal.deal.category
                                                                )}
                                                            >
                                                                {claimedDeal.deal.category}
                                                            </Badge>
                                                            <Badge
                                                                className={getStatusColor(claimedDeal.status)}
                                                            >
                                                                {claimedDeal.status.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-primary-600 mb-1">
                                                            {claimedDeal.deal.value}
                                                        </div>
                                                        <div className="text-sm text-neutral-600">
                                                            {claimedDeal.deal.savings}
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-neutral-600 mb-4 line-clamp-2">
                                                    {claimedDeal.deal.description}
                                                </p>

                                                {/* Status message */}
                                                {claimedDeal.statusMessage && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className={`mb-4 p-4 rounded-xl ${claimedDeal.status === 'approved'
                                                            ? 'bg-green-50 text-green-800'
                                                            : claimedDeal.status === 'pending'
                                                                ? 'bg-yellow-50 text-yellow-800'
                                                                : 'bg-red-50 text-red-800'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {claimedDeal.status === 'approved' && (
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            )}
                                                            {claimedDeal.status === 'pending' && (
                                                                <svg
                                                                    className="w-5 h-5 animate-spin"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                    />
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                    />
                                                                </svg>
                                                            )}
                                                            {claimedDeal.status === 'rejected' && (
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            )}
                                                            <span className="text-sm font-medium">
                                                                {claimedDeal.statusMessage}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {/* Footer */}
                                                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-600">
                                                    <div className="flex items-center gap-4">
                                                        <span>
                                                            Claimed {formatDate(claimedDeal.claimedAt)}
                                                        </span>
                                                        {claimedDeal.expiresAt && (
                                                            <span>
                                                                Expires {formatDate(claimedDeal.expiresAt)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Link href={`/deals/${claimedDeal.deal._id}`}>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                                                        >
                                                            View Details
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 5l7 7-7 7"
                                                                />
                                                            </svg>
                                                        </motion.button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}