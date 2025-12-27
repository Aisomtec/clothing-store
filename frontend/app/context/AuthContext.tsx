"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";

/* ------------------------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------------------------ */

type AuthContextType = {
  user: User | null;
  loading: boolean;

  loginWithGoogle: (redirect?: string) => Promise<void>;

  sendOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (code: string, redirect?: string) => Promise<boolean>;

  logout: () => Promise<void>;
};

/* ------------------------------------------------------------------ */
/* CONTEXT */
/* ------------------------------------------------------------------ */

const AuthContext = createContext<AuthContextType | null>(null);

const googleProvider = new GoogleAuthProvider();

/* ------------------------------------------------------------------ */
/* PROVIDER */
/* ------------------------------------------------------------------ */

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [confirmation, setConfirmation] =
    useState<ConfirmationResult | null>(null);

  /* ---------------- AUTH STATE LISTENER ---------------- */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("AUTH USER:", currentUser);
    });

    return () => unsubscribe();
  }, []);

  /* ---------------- GOOGLE LOGIN ---------------- */

  const loginWithGoogle = async (redirect?: string) => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (redirect) router.push(redirect);
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  /* ---------------- PHONE OTP ---------------- */

  const sendOTP = async (phone: string): Promise<boolean> => {
    try {
      if (typeof window === "undefined") return false;

      // Prevent multiple instances
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        (window as any).recaptchaVerifier
      );

      setConfirmation(confirmationResult);
      return true;
    } catch (err) {
      console.error("Send OTP failed:", err);
      return false;
    }
  };

  const verifyOTP = async (
    code: string,
    redirect?: string
  ): Promise<boolean> => {
    try {
      if (!confirmation) return false;

      await confirmation.confirm(code);
      setConfirmation(null);

      if (redirect) router.push(redirect);
      return true;
    } catch (err) {
      console.error("Verify OTP failed:", err);
      return false;
    }
  };

  /* ---------------- LOGOUT ---------------- */

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  /* ---------------- PROVIDER ---------------- */

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        sendOTP,
        verifyOTP,
        logout,
      }}
    >
      {children}

      {/* Required for Firebase Phone Auth */}
      <div id="recaptcha-container" />
    </AuthContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* HOOK */
/* ------------------------------------------------------------------ */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
