'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { api } from "@/lib/api"

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const newErrors: Record<string, string> = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const data = await api.login(formData.email, formData.password)

            if (!data.token) {
                setErrors({ password: "Invalid email or password" })
                setIsLoading(false)
                return
            }

            localStorage.setItem("sb_token", data.token)
            localStorage.setItem("sb_user", JSON.stringify(data.user))
            window.dispatchEvent(new Event("authChanged"))

            router.push("/dashboard")
        } catch (err) {
            setErrors({ password: "Login failed. Try again." })
        } finally {
            setIsLoading(false)
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }



    return (
        <div className="min-h-screen flex">
         
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
               
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 mb-8"
                        >
                        </motion.div>
                    </Link>

                 
                    <div className="mb-8">
                        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
                            Welcome back
                        </h1>
                        <p className="text-neutral-600">
                            Sign in to access your benefits dashboard
                        </p>
                    </div>

                
                    <div className="space-y-3 mb-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-3 border-2 border-neutral-200 rounded-xl flex items-center justify-center gap-3 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span className="font-medium text-neutral-700">
                                Continue with Google
                            </span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-3 border-2 border-neutral-200 rounded-xl flex items-center justify-center gap-3 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="font-medium text-neutral-700">
                                Continue with GitHub
                            </span>
                        </motion.button>
                    </div>

             
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-neutral-500">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            name="email"
                            label="Email address"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            autoComplete="email"
                        />

                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            autoComplete="current-password"
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm text-neutral-600">Remember me</span>
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm font-medium text-primary-600 hover:text-primary-700"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Sign in
                        </Button>
                    </form>

              
                    <p className="mt-6 text-center text-sm text-neutral-600">
                        Don't have an account?{' '}
                        <Link
                            href="/auth/signup"
                            className="font-medium text-primary-600 hover:text-primary-700"
                        >
                            Sign up for free
                        </Link>
                    </p>
                </motion.div>
            </div>

           
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 items-center justify-center p-12 relative overflow-hidden">
        
                <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative z-10 text-white max-w-lg"
                >
                    <div className="mb-8">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-6xl mb-4"
                        >
                            🚀
                        </motion.div>
                        <h2 className="text-4xl font-display font-bold mb-4">
                            Unlock $500,000+ in Benefits
                        </h2>
                        <p className="text-xl text-white/90">
                            Join thousands of startups saving millions on essential tools
                        </p>
                    </div>

              
                    <div className="grid grid-cols-3 gap-6">
                        {[
                            { label: 'Active Deals', value: '50+' },
                            { label: 'Total Value', value: '$10M+' },
                            { label: 'Startups', value: '2,500+' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                            >
                                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm text-white/80">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

               
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    >
                        <p className="text-white/90 mb-4 italic">
                            "StartupBenefits saved us over $200,000 in our first year. The
                            platform is a game-changer for early-stage startups."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">
                                👤
                            </div>
                            <div>
                                <div className="font-semibold">Sarah Chen</div>
                                <div className="text-sm text-white/70">CEO, TechVenture</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}