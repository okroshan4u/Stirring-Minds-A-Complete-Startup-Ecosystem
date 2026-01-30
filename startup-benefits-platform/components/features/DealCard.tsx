// 'use client';

// import { Deal } from '@/types';
// import { motion } from 'framer-motion';
// import { getCategoryColor, cn } from '@/lib/api';
// import Badge from '@/components/ui/Badge';
// import Link from 'next/link';

// interface DealCardProps {
//   deal: Deal;
//   index?: number;
// }



// export default function DealCard({ deal, index = 0 }: DealCardProps) {

//   const user =
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("sb_user") || "null")
//       : null

//   const isLocked =
//     deal.isLocked ||
//     (deal.requiresVerified && !user?.isVerified) ||
//     (deal.requiresPremium && !user?.isPremium)



//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.4 }}
//       whileHover={{ y: -8 }}
//       className="group relative"
//     >
//       <Link href={`/deals/${deal._id}`}>
//         <div
//           className={cn(
//             'relative bg-white rounded-2xl border overflow-hidden transition-all duration-300',
//             'hover:shadow-2xl hover:shadow-primary-500/10',
//             isLocked || isPremium
//               ? 'border-neutral-300 opacity-90'
//               : 'border-neutral-200'
//           )}
//         >
//           {/* Gradient border glow on hover */}
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
//             style={{ zIndex: -1 }}
//           />

//           {/* Featured badge */}
//           {deal.featured && (
//             <div className="absolute top-4 right-4 z-10">
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.3, type: 'spring' }}
//               >
//                 <Badge variant="warning" className="font-semibold">
//                   ⭐ Featured
//                 </Badge>
//               </motion.div>
//             </div>
//           )}

//           {/* Lock indicator */}
//           {isLocked && (
//             <div className="absolute top-4 left-4 z-10">
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{ type: 'spring', stiffness: 200 }}
//                 className="bg-neutral-900/90 backdrop-blur-sm p-2 rounded-xl"
//               >
//                 <svg
//                   className="w-4 h-4 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                   />
//                 </svg>
//               </motion.div>
//             </div>
//           )}

//           <div className="p-6 space-y-4">
//             {/* Header with logo and title */}
//             <div className="flex items-start gap-4">
//               <motion.div
//                 whileHover={{ rotate: [0, -10, 10, -10, 0] }}
//                 transition={{ duration: 0.5 }}
//                 className="flex-shrink-0"
//               >
//                 <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-neutral-200 bg-neutral-50">
//                   <img
//                     src={deal.partner.logo}
//                     alt={deal.partner.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </motion.div>

//               <div className="flex-1 min-w-0">
//                 <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
//                   {deal.title}
//                 </h3>
//                 <p className="text-sm text-neutral-600 line-clamp-2">
//                   {deal.description}
//                 </p>
//               </div>
//             </div>

//             {/* Category and value badges */}
//             <div className="flex flex-wrap gap-2">
//               <span
//                 className={cn(
//                   'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
//                   getCategoryColor(deal.category)
//                 )}
//               >
//                 {deal.category}
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 border border-primary-200">
//                 💰 {deal.value}
//               </span>
//             </div>

//             {/* Stats and CTA */}
//             <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
//               <div className="flex items-center gap-4 text-sm text-neutral-600">
//                 <span className="flex items-center gap-1">
//                   <svg
//                     className="w-4 h-4"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//                   </svg>
//                   {deal.claimedCount.toLocaleString()}
//                 </span>
//                 {deal.savings && (
//                   <span className="font-semibold text-primary-600">
//                     {deal.savings}
//                   </span>
//                 )}
//               </div>

//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <span className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-xl group-hover:bg-primary-600 transition-colors">
//                   View Deal
//                   <svg
//                     className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </span>
//               </motion.div>
//             </div>
//           </div>

//           {/* Hover glow effect */}
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
//             initial={false}
//           />
//         </div>
//       </Link>
//     </motion.div>
//   );
// }


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
        {/* Featured */}
        {deal.features && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="warning">⭐ Featured</Badge>
          </div>
        )}

        {/* Lock badge */}
        {isLocked && (
          <div className="absolute top-4 left-4 z-10">
            <Badge>🔒 {lockLabel}</Badge>
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border bg-neutral-50">
              {/* <img
                src={deal.partner.logo}
                alt={deal.partner.name}
                className="w-full h-full object-cover"
              /> */}
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

          {/* Badges */}
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

          {/* Footer */}
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



