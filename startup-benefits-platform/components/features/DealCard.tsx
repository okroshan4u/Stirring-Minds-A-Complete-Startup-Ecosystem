'use client'

import { Deal } from '@/types'
import { motion } from 'framer-motion'
import { getCategoryColor, cn } from '@/lib/api'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

interface DealCardProps {
  deal: Deal
  index?: number
}

export default function DealCard({ deal, index = 0 }: DealCardProps) {
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('sb_user') || 'null')
      : null

  const isLocked =
    deal.isLocked ||
    (deal.requiresVerified && !user?.isVerified) ||
    (deal.requiresPremium && !user?.isPremium)

  const lockLabel = deal.requiresPremium
    ? 'Premium'
    : deal.requiresVerified
      ? 'Verified'
      : 'Locked'

  const Wrapper = isLocked ? 'div' : Link
  const wrapperProps = isLocked
    ? {}
    : { href: `/deals/${deal._id}` }

  const Card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={!isLocked ? { y: -8 } : undefined}
      className="group relative"
    >
      <div
        className={cn(
          'relative bg-white rounded-2xl border overflow-hidden transition-all duration-300',
          'hover:shadow-2xl hover:shadow-primary-500/10',
          isLocked
            ? 'border-neutral-300 opacity-90 cursor-not-allowed'
            : 'border-neutral-200'
        )}
      >
        
        {deal.features && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="warning">⭐ Featured</Badge>
          </div>
        )}

       
        {isLocked && (
          <div className="absolute top-4 left-4 z-10">
            <Badge>🔒 {lockLabel}</Badge>
          </div>
        )}

        <div className="p-6 space-y-4">
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border bg-neutral-50">
              
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 mb-1">
                {deal.title}
              </h3>
              <p className="text-sm text-neutral-600 line-clamp-2">
                {deal.description}
              </p>
            </div>
          </div>

         
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium border',
                getCategoryColor(deal.category)
              )}
            >
              {deal.category}
            </span>

            {deal.value && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                💰 {deal.value}
              </span>
            )}
          </div>

          
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <span className="text-sm text-neutral-600">
              {deal.claimedCount || 0} claimed
            </span>

            <span className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-sm">
              {isLocked ? 'Locked' : 'View Deal'}
            </span>
          </div>
        </div>

        {isLocked && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
        )}
      </div>
    </motion.div>
  )
  return isLocked ? (
    Card
  ) : (
    <Link href={`/deals/${deal._id}`}>
      {Card}
    </Link>
  )

}



