'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
export default function LoginPage() {
    const [otp, setOtp] = useState('');
    return (
        <div className="min-h-screen bg-[#282828] text-[#ebdbb2] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 space-y-8 bg-[#3c3836] rounded-xl shadow-md"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Enter Your One-Time Password</h1>
                    <p className="text-[#bdae93]">Check your email for the 6-digit code.</p>
                </div>
                <div className="flex justify-center">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <Button
                    className="w-full"
                    disabled={otp.length !== 6}
                >
                    Login
                </Button>
            </motion.div>
        </div>
    );
}
