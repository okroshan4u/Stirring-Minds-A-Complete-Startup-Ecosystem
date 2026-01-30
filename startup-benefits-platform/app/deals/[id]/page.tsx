'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Deal } from '@/types';
import { api } from '@/lib/api';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchDeal();
  }, [params.id]);

  const fetchDeal = async () => {
    setLoading(true);
    try {
      const response = await api.getDeal(params.id as string);
      setDeal(response.data);
    } catch (error) {
      console.error('Error fetching deal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!deal || claiming) return;

    setClaiming(true);
    try {
      await api.claimDeal(deal._id);
      setClaimed(true);
      setShowSuccess(true);


      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error claiming deal:', error);
    } finally {
      setClaiming(false);
    }
  };

  if (loading || !deal) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const isLocked = deal.isLocked || deal.requiresVerified || deal.requiresPremium
  const user = JSON.parse(localStorage.getItem("sb_user") || "{}")
  const canClaim = !deal.requiresVerified || user.isVerified




  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-gradient-to-br from-neutral-50 via-purple-50/20 to-pink-50/20">
      <div className="max-w-5xl mx-auto">

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to deals
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-12">

            <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-neutral-200">
              <motion.div
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-neutral-200 bg-neutral-50">

                </div>
              </motion.div>

              <div className="flex-1">
                <div className="flex gap-2 mb-4">
                  <Badge>{deal.category}</Badge>
                  {isLocked && <Badge variant="default">🔒 Locked</Badge>}
                </div>


                <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
                  {deal.title}
                </h1>

                <p className="text-xl text-neutral-600 mb-6">
                  {deal.description}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>Available for verified startups</span>
                  </div>
                </div>
              </div>


              <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-sm text-primary-700 font-medium mb-1">
                      Deal Value
                    </div>
                    <div className="text-4xl font-bold text-primary-900">
                      {deal.value}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-primary-700 font-medium mb-1">
                      You Save
                    </div>
                    <div className="text-4xl font-bold text-primary-900">
                      {deal.savings}
                    </div>
                  </div>
                </div>
              </div>

              {deal.eligibility && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Eligibility
                  </h2>
                  <div className="bg-neutral-50 rounded-xl p-6">
                    {deal.eligibility && (
                      <div className="bg-neutral-50 rounded-xl p-6 space-y-3">
                        {deal.eligibility.minFunding !== undefined && (
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">💰</span>
                            <span className="text-neutral-700">
                              Minimum funding: ${deal.eligibility.minFunding.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {deal.eligibility.maxAge !== undefined && (
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📅</span>
                            <span className="text-neutral-700">
                              Company age: less than {deal.eligibility.maxAge} months
                            </span>
                          </div>
                        )}

                        {deal.eligibility.requirements?.map((req, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <span className="text-2xl">✓</span>
                            <span className="text-neutral-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>

            <div className="mb-8 p-6 bg-neutral-50 rounded-xl">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                About {deal.partner.name}
              </h3>
              <p className="text-neutral-600">
                Partner: {deal.partner.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleClaim}
                disabled={!canClaim || claiming || claimed}
                isLoading={claiming}
                size="lg"
                className="flex-1"
              >
                {claimed
                  ? '✓ Claimed Successfully'
                  : isLocked && !user.isVerified
                    ? "🔒 Verification Required"
                    : "Claim This Deal"
                }
              </Button>

            </div>
          </Card>
        </motion.div>


        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setShowSuccess(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Deal Claimed!
                </h3>
                <p className="text-neutral-600 mb-6">
                  We'll review your claim and get back to you within 24 hours.
                  Check your dashboard for updates.
                </p>
                <Button onClick={() => router.push('/dashboard')} size="lg">
                  Go to Dashboard
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}