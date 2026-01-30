'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Deal } from '@/types';
import { api } from '@/lib/api';
import DealCard from '@/components/features/DealCard';
import Input from '@/components/ui/Input';
import { SkeletonDealCard } from '@/components/ui/Skeleton';

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAccessLevel, setSelectedAccessLevel] = useState('all');

  useEffect(() => {
    fetchDeals();
  }, [selectedCategory, selectedAccessLevel, searchQuery]);

  const fetchDeals = async () => {
    setLoading(true)
    try {
      const data = await api.getDeals()
      setDeals(data)
    } catch (error) {
      console.error("Error fetching deals:", error)
    } finally {
      setLoading(false)
    }
  }


  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'development', label: 'Development' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'security', label: 'Security' },
    { value: 'design', label: 'Design' },
    { value: 'communication', label: 'Communication' },
  ];

  const accessLevels = [
    { value: 'all', label: 'All Access' },
    { value: 'public', label: 'Public' },
    { value: 'premium', label: 'Premium' },
    { value: 'locked', label: 'Locked' },
  ];

  const filteredDeals = deals.filter(deal => {
    if (selectedCategory !== "all" && deal.category !== selectedCategory)
      return false

    if (selectedAccessLevel === "public" && deal.isLocked)
      return false

    if (selectedAccessLevel === "locked" && !deal.isLocked)
      return false

    if (searchQuery && !deal.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false

    return true
  })


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
            Explore Deals
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl">
            Browse through {filteredDeals.length} exclusive deals from top SaaS companies
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search deals by name, company, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === category.value
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary-300'
                      }`}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Access Level Filter */}
            <div className="md:w-64">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Access Level
              </label>
              <div className="flex flex-col gap-2">
                {accessLevels.map((level) => (
                  <motion.button
                    key={level.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAccessLevel(level.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${selectedAccessLevel === level.value
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary-300'
                      }`}
                  >
                    {level.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <SkeletonDealCard key={i} />
              ))}
            </div>
          ) : deals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                No deals found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your filters or search query
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDeals.map((deal, index) => (
                <DealCard key={deal._id} deal={deal} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}