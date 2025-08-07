import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage("❌ " + error.message);
    } else {
      setMessage(
        isSignUp
          ? "✅ Sign up successful! Please check your email."
          : "✅ Logged in!",
      );
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-center text-2xl font-bold">
        {isSignUp
          ? "Create your SpaceGen AI Account"
          : "Sign In to SpaceGen AI"}
      </h2>

      <form onSubmit={handleAuth} className="space-y-4">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border p-3 text-gray-800"
        />
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border p-3 text-gray-800" // 👈 Add this class
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          {isSignUp ? "Create Account" : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-blue-600 hover:underline"
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
      </div>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}
