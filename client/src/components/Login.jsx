import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { X } from 'lucide-react';

const Login = () => {
  const { showUserLogin, setShowUserLogin, setUser } = useAppContext();   // ← Important: get showUserLogin

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If modal is not open, don't render anything
  if (!showUserLogin) return null;

  const closeModal = () => {
    setShowUserLogin(false);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const safeName = name.trim() || "User";
      const safeEmail = email.trim();

      if (!safeEmail || !safeEmail.includes("@")) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      setUser({
        name: safeName,
        email: safeEmail,
      });

      closeModal();   // Close after login
      setLoading(false);
    }, 800);
  };

  return (
    <div 
      onClick={closeModal} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-10 text-white relative">
          <button
            onClick={closeModal}
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/20 transition-colors"
            type="button"
          >
            <X size={28} strokeWidth={3} />
          </button>

          <h2 className="text-3xl font-bold text-center">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h2>
        </div>

        <form onSubmit={onSubmitHandler} className="p-8 space-y-6">
          {error && (
            <p className="text-red-600 text-sm bg-red-50 py-3 px-4 rounded-2xl text-center">
              {error}
            </p>
          )}

          {state === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-emerald-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-emerald-500 outline-none"
              required
            />
          </div>

          <p className="text-center text-sm text-gray-600">
            {state === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => {
                setState(state === "login" ? "register" : "login");
                setError("");
              }}
              className="text-emerald-600 font-semibold cursor-pointer hover:underline"
            >
              {state === "register" ? "Login here" : "Sign up"}
            </span>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold rounded-2xl transition-all"
          >
            {loading ? "Processing..." : state === "register" ? "Create Account" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;