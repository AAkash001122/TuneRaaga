import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react"; // Loading icon ke liye

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check karo ki user already login hai ya nahi
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();

    // Real-time listener: Agar user kisi aur tab mein logout kare, toh yahan bhi logout ho jaye
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 1. Agar check ho raha hai to Loading dikhao
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  // 2. Agar Session Nahi hai to Login page par bhej do (Forcefully)
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 3. Agar Session hai to Dashboard (Children) dikhao
  return children;
};

export default ProtectedRoute;