import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function BoardPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handlePost = async () => {
    if (!text.trim()) return;
    setPosting(true);
    try {
      await api.post("/messages", { text });
      setText("");
      setError("");
      fetchMessages();
    } catch (err) {
      setError("Failed to post message");
    } finally {
      setPosting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handlePost();
    }
  };

  const getInitial = (username) => username.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <div className="border-b border-border bg-background sticky top-0 z-10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <h1 className="text-sm font-semibold tracking-tight">MessageBoard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              {getInitial(user?.username)}
            </div>
            <span className="text-muted-foreground text-sm">{user?.username}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            Sign out
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Post composer */}
        <div className="bg-card border border-border rounded-xl p-4 mb-8 focus-within:border-muted transition-colors">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
              {getInitial(user?.username)}
            </div>
            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What's on your mind?"
                className="w-full bg-transparent text-foreground placeholder-muted-foreground resize-none focus:outline-none text-sm leading-relaxed"
                rows={3}
              />
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                <span className="text-muted-foreground text-xs">
                  Ctrl + Enter to post
                </span>
                <div className="flex items-center gap-2">
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <Button
                    size="sm"
                    onClick={handlePost}
                    disabled={posting || !text.trim()}
                    className="text-xs"
                  >
                    {posting ? "Posting..." : "Post"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages feed */}
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">No messages yet.</p>
              <p className="text-muted-foreground text-xs mt-1">Be the first to post.</p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-muted transition-colors"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                  {getInitial(msg.user.username)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {msg.user.username}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed break-words">
                    {msg.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
