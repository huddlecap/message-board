import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";
import { Button } from "@/components/ui/button";

export default function LoginPage({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token, res.data.username);
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-semibold text-foreground">MessageBoard</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
        <p className="text-muted-foreground text-sm mb-8">Sign in to your account</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-foreground text-sm focus:outline-none focus:border-muted transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-foreground text-sm focus:outline-none focus:border-muted transition-colors"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-2"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <p className="text-muted-foreground text-sm mt-6 text-center">
          Don't have an account?{" "}
          <span
            onClick={onSwitch}
            className="text-foreground cursor-pointer hover:text-foreground transition-colors"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
