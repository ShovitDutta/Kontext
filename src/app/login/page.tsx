'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // In a real application, this would involve an authentication process.
    // For now, we'll just simulate a login and redirect to the homepage.
    alert('Login functionality is not implemented yet. Redirecting to homepage.');
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-gray-800/40 border border-gray-700/50 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-white">Login</h1>
        <p className="text-center text-gray-400">
          This is a mock login page. In a real application, this would be a fully functional login form.
        </p>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-md transition-colors"
        >
          Login and Redirect
        </button>
      </motion.div>
    </div>
  );
}