import { useState } from "react";
import api from "../lib/axios";
import { Button } from "@/components/ui/button";

export default function RegisterPage({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) return;
    setLoading(true);
    try {
      await api.post("/auth/register", { username, password });
      setSuccess("Account created. You can now sign in.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");
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

        <h1 className="text-2xl font-bold text-foreground mb-1">Create account</h1>
        <p className="text-muted-foreground text-sm mb-8">Join the messageboard</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 mb-6">
            <p className="text-emerald-400 text-sm">{success}</p>
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
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </div>

        <p className="text-muted-foreground text-sm mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={onSwitch}
            className="text-foreground cursor-pointer hover:text-foreground transition-colors"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
