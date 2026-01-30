'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/api';

export default function Navigation() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const loadUser = () => {
            const u = localStorage.getItem("sb_user")
            setUser(u ? JSON.parse(u) : null)
        }

        loadUser()

        window.addEventListener("authChanged", loadUser)
        return () => window.removeEventListener("authChanged", loadUser)
    }, [])




    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/deals', label: 'Deals' },
        { href: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white/80 backdrop-blur-lg shadow-lg'
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-xl font-bold text-neutral-900">
                                StartupBenefits
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className={cn(
                                        'relative text-sm font-medium transition-colors',
                                        pathname === link.href
                                            ? 'text-primary-600'
                                            : 'text-neutral-600 hover:text-neutral-900'
                                    )}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="font-medium text-neutral-900">
                                    {user.name}
                                </span>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem("sb_user")
                                        window.dispatchEvent(new Event("authChanged"))
                                        window.location.href = "/"
                                    }}
                                    className="text-sm text-red-500 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <button className="px-5 py-2.5 text-sm font-medium">
                                        Sign in
                                    </button>
                                </Link>

                                <Link href="/auth/signup">
                                    <button className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl">
                                        Get Started
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>



                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-neutral-200"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href}>
                                    <motion.div
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            'block py-2 text-base font-medium transition-colors',
                                            pathname === link.href
                                                ? 'text-primary-600'
                                                : 'text-neutral-600'
                                        )}
                                    >
                                        {link.label}
                                    </motion.div>
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-neutral-200 space-y-3">
                                {user ? (
                                    <>
                                        <div className="px-6 py-3 font-medium text-neutral-800">
                                            {user.name}
                                        </div>

                                        <button
                                            onClick={() => {
                                                localStorage.removeItem("sb_user")
                                                window.location.href = "/"
                                            }}
                                            className="w-full px-6 py-3 text-left text-red-500 hover:bg-neutral-50 rounded-xl"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/auth/login">
                                            <motion.button className="w-full px-6 py-3 text-neutral-700 text-left rounded-xl hover:bg-neutral-50">
                                                Sign in
                                            </motion.button>
                                        </Link>

                                        <Link href="/auth/signup">
                                            <motion.button className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl">
                                                Get Started
                                            </motion.button>
                                        </Link>
                                    </>
                                )}
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}