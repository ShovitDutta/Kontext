"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="min-h-screen"
            >
                {children}

                {/* Page transition effect */}
                <motion.div
                    className="fixed top-0 left-0 w-full h-1 bg-blue-500"
                    initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0, transformOrigin: "100% 50%" }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
