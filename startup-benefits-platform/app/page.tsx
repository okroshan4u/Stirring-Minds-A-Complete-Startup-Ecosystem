'use client';

import Hero from '@/components/features/Hero';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const features = [
    {
      icon: '💰',
      title: 'Massive Savings',
      description:
        'Access over $500,000 in combined benefits from industry-leading SaaS companies.',
    },
    {
      icon: '🚀',
      title: 'Launch Faster',
      description:
        'Get the tools you need without the hefty price tag. Focus on building, not budgets.',
    },
    {
      icon: '🔒',
      title: 'Exclusive Access',
      description:
        'Premium deals reserved for funded startups and accelerator participants.',
    },
    {
      icon: '⚡',
      title: 'Instant Approval',
      description:
        'Most deals are approved within 24 hours. Start using benefits immediately.',
    },
  ];

  const categories = [
    { name: 'Infrastructure', count: 15, color: 'from-blue-500 to-blue-600' },
    { name: 'Analytics', count: 8, color: 'from-green-500 to-green-600' },
    { name: 'Marketing', count: 12, color: 'from-pink-500 to-pink-600' },
    { name: 'Development', count: 10, color: 'from-purple-500 to-purple-600' },
    { name: 'Design', count: 6, color: 'from-indigo-500 to-indigo-600' },
    { name: 'Security', count: 5, color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="page-transition">
      <Hero />

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
              Why Choose StartupBenefits?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              We've partnered with the best to bring you unbeatable value
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Find the perfect tools for every aspect of your startup
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/deals?category=${category.name.toLowerCase()}`}>
                  <div className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all cursor-pointer">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} mb-4 flex items-center justify-center text-white text-xl font-bold`}
                    >
                      {category.count}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {category.count} deals available
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to unlock your benefits?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of startups saving millions on essential tools
            </p>
            <Link href="/deals">
              <Button
                size="lg"
                variant="secondary"
                className="bg-green text-black hover:bg-neutral-50 hover:text-white"
              >
                Browse All Deals
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}