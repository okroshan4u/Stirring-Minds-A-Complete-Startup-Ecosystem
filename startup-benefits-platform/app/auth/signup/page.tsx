'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {api} from "@/lib/api"

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
   
        companyName: '',
        companyWebsite: '',
        founded: '',
        teamSize: '',
      
        funding: '',
        isIncorporated: false,
        hasAccelerator: false,
        acceleratorName: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        if (!formData.teamSize) {
            newErrors.teamSize = 'Team size is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsLoading(true)
        setErrors({})

        try {
            const data = await api.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                companyName: formData.companyName,
                companyWebsite: formData.companyWebsite,
                founded: formData.founded,
                teamSize: formData.teamSize,
                funding: formData.funding,
                isIncorporated: formData.isIncorporated,
                hasAccelerator: formData.hasAccelerator,
                acceleratorName: formData.acceleratorName,
            })

            if (!data.token) {
                setErrors({ email: data.message || "Signup failed" })
                return
            }

        
            localStorage.setItem("sb_token", data.token)
            localStorage.setItem("sb_user", JSON.stringify(data.user))

      
            window.dispatchEvent(new Event("authChanged"))

          
            router.push("/dashboard")

        } catch (err) {
            setErrors({ email: "Signup failed. Try again." })
        } finally {
            setIsLoading(false)
        }
    }


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

      
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="min-h-screen flex">
           
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 items-center justify-center p-12 relative overflow-hidden">
             
                <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative z-10 text-white max-w-lg"
                >
                 
                    <div className="mb-12">
                        <h3 className="text-sm font-semibold mb-4 text-white/70">
                            YOUR PROGRESS
                        </h3>
                        <div className="space-y-4">
                            {[
                                { num: 1, label: 'Account Details', completed: step > 1 },
                                { num: 2, label: 'Company Info', completed: step > 2 },
                                { num: 3, label: 'Eligibility', completed: false },
                            ].map((s) => (
                                <motion.div
                                    key={s.num}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: s.num * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step >= s.num
                                            ? 'bg-white text-primary-600 border-white'
                                            : 'bg-white/10 text-white border-white/30'
                                            }`}
                                    >
                                        {s.completed ? '✔' : s.num}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{s.label}</div>
                                        <div className="text-sm text-white/70">
                                            Step {s.num} of 3
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            '🎁 Access to 50+ exclusive deals',
                            '💰 Save over $500,000 in tools',
                            '⚡ Instant approval for most deals',
                            '🔒 Priority support from partners',
                        ].map((benefit, index) => (
                            <motion.div
                                key={benefit}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-center gap-3 text-white/90"
                            >
                                <svg
                                    className="w-5 h-5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {benefit}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

         
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
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
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-xl font-bold text-neutral-900">
                                StartupBenefits
                            </span>
                        </motion.div>
                    </Link>

                    
                    <div className="lg:hidden mb-8">
                        <div className="flex gap-2">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-1 flex-1 rounded-full transition-all ${step >= s ? 'bg-primary-600' : 'bg-neutral-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-neutral-600 mt-2">
                            Step {step} of 3
                        </p>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
                            {step === 1 && 'Create your account'}
                            {step === 2 && 'Tell us about your startup'}
                            {step === 3 && 'Unlock premium benefits'}
                        </h1>
                        <p className="text-neutral-600">
                            {step === 1 && 'Get started with your free account'}
                            {step === 2 && 'Help us personalize your experience'}
                            {step === 3 && 'Check your eligibility for exclusive deals'}
                        </p>
                    </div>

               
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <Input
                                type="text"
                                name="name"
                                label="Full name"
                                placeholder="Alex Chen"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                autoComplete="name"
                            />

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
                                autoComplete="new-password"
                            />

                            <Input
                                type="password"
                                name="confirmPassword"
                                label="Confirm password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                autoComplete="new-password"
                            />

                            <Button
                                type="button"
                                onClick={handleNext}
                                size="lg"
                                className="w-full mt-2"
                            >
                                Continue
                            </Button>

                            
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-neutral-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-neutral-500">
                                        Or sign up with
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-4 py-3 border-2 border-neutral-200 rounded-xl flex items-center justify-center gap-2 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
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
                                    <span className="font-medium text-neutral-700 text-sm">
                                        Google
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-4 py-3 border-2 border-neutral-200 rounded-xl flex items-center justify-center gap-2 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span className="font-medium text-neutral-700 text-sm">
                                        GitHub
                                    </span>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <Input
                                type="text"
                                name="companyName"
                                label="Company name"
                                placeholder="Acme Inc."
                                value={formData.companyName}
                                onChange={handleChange}
                                error={errors.companyName}
                            />

                            <Input
                                type="url"
                                name="companyWebsite"
                                label="Website (optional)"
                                placeholder="https://acme.com"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                            />

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    When was your company founded?
                                </label>
                                <input
                                    type="month"
                                    name="founded"
                                    value={formData.founded}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Team size
                                </label>
                                <select
                                    name="teamSize"
                                    value={formData.teamSize}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                                >
                                    <option value="">Select team size</option>
                                    <option value="1-5">1-5 people</option>
                                    <option value="6-10">6-10 people</option>
                                    <option value="11-25">11-25 people</option>
                                    <option value="26-50">26-50 people</option>
                                    <option value="50+">50+ people</option>
                                </select>
                                {errors.teamSize && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.teamSize}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    size="lg"
                                    className="flex-1"
                                >
                                    Continue
                                </Button>
                            </div>
                        </motion.div>
                    )}

                
                    {step === 3 && (
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Total funding raised (optional)
                                </label>
                                <select
                                    name="funding"
                                    value={formData.funding}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                                >
                                    <option value="">Select funding range</option>
                                    <option value="0">Pre-seed / Bootstrapped</option>
                                    <option value="100000">$100K - $500K</option>
                                    <option value="500000">$500K - $1M</option>
                                    <option value="1000000">$1M - $5M</option>
                                    <option value="5000000">$5M+</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 cursor-pointer transition-all">
                                    <input
                                        type="checkbox"
                                        name="isIncorporated"
                                        checked={formData.isIncorporated}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <div>
                                        <div className="font-medium text-neutral-900">
                                            Company is incorporated
                                        </div>
                                        <div className="text-sm text-neutral-600">
                                            Unlocks premium deals
                                        </div>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 cursor-pointer transition-all">
                                    <input
                                        type="checkbox"
                                        name="hasAccelerator"
                                        checked={formData.hasAccelerator}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <div>
                                        <div className="font-medium text-neutral-900">
                                            Part of an accelerator
                                        </div>
                                        <div className="text-sm text-neutral-600">
                                            Access to exclusive partnerships
                                        </div>
                                    </div>
                                </label>

                                {formData.hasAccelerator && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                    >
                                        <Input
                                            type="text"
                                            name="acceleratorName"
                                            label="Accelerator name"
                                            placeholder="Y Combinator, Techstars, etc."
                                            value={formData.acceleratorName}
                                            onChange={handleChange}
                                        />
                                    </motion.div>
                                )}
                            </div>

                            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mt-6">
                                <div className="flex gap-3">
                                    <span className="text-2xl">🎉</span>
                                    <div>
                                        <div className="font-semibold text-primary-900 mb-1">
                                            You're eligible for {formData.isIncorporated ? '45' : '38'}{' '}
                                            deals!
                                        </div>
                                        <div className="text-sm text-primary-700">
                                            Total value: $
                                            {formData.isIncorporated ? '450,000' : '320,000'}+
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex-1"
                                    isLoading={isLoading}
                                >
                                    Create Account
                                </Button>
                            </div>

                            <p className="text-xs text-neutral-500 text-center mt-4">
                                By creating an account, you agree to our{' '}
                                <Link href="/terms" className="text-primary-600 hover:underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-primary-600 hover:underline">
                                    Privacy Policy
                                </Link>
                            </p>
                        </motion.form>
                    )}

             
                    <p className="mt-6 text-center text-sm text-neutral-600">
                        Already have an account?{' '}
                        <Link
                            href="/auth/login"
                            className="font-medium text-primary-600 hover:text-primary-700"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}