import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";

export default function App() {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (user) return <BoardPage />;

  if (showRegister)
    return <RegisterPage onSwitch={() => setShowRegister(false)} />;

  return <LoginPage onSwitch={() => setShowRegister(true)} />;
}